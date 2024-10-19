const MarkdownIt = require("markdown-it");

// Helper Markdown Components
const mdComponents = {
  deps: {
    markdownItEmoji: null,
    markdownItGithubHeadings: null,
    markdownItTaskCheckbox: null,
    yamlFrontMatter: null,
    dompurify: null,
  }
};

function build(opts) {
  // Lets first build our MarkdownIT opts
  let mdItOpts = {};

  if (opts.settings.html) { mdItOpts.html = opts.settings.html; }
  if (opts.settings.breaks) { mdItOpts.breaks = opts.settings.breaks; }
  if (opts.settings.xhtmlOut) { mdItOpts.xhtmlOut = opts.settings.xhtmlOut; }

  let md = new MarkdownIt(markdownItOpts);

  if (opts.settings.emojis) {
    mdComponents.deps.markdownItEmoji ??= require("markdown-it-emoji");
    if (typeof opts.settings.emojis === "object") {
      // Pass thru settings for feature if present
      md.use(mdComponents.deps.markdownItEmoji, opts.settings.emojis);
    } else {
      md.use(mdComponents.deps.markdownItEmoji);
    }
  }

  if (opts.settings.githubHeadings) {
    mdComponents.deps.markdownItGithubHeadings ??= require("markdown-it-github-headings");
    if (typeof opts.settings.githubHeadings === "object") {
      // Pass thru settings for feature if present
      md.use(mdComponents.deps.markdownItGithubHeadings, opts.settings.githubHeadings);
    } else {
      md.use(mdComponents.deps.markdownItGithubHeadings);
    }
  }

  if (opts.settings.githubTaskList) {
    mdComponents.deps.markdownItTaskCheckbox ??= require("markdown-it-task-checkbox");
    if (typeof opts.settings.githubTaskList === "object") {
      // Pass thru settings for feature if present
      md.use(mdComponents.deps.markdownItTaskCheckbox, opts.settings.githubTaskList);
    } else {
      md.use(mdComponents.deps.markdownItTaskCheckbox);
    }
  }

  return md;
}

function render(text, opts, renderer) {
  let textContent;

  if (opts.settings.frontMatter) {
    mdComponents.deps.yamlFrontMatter ??= require("yaml-front-matter");
    const { __content, vars } = mdComponents.deps.yamlFrontMatter.loadFront(text);

    const renderYamlTable = (variables) => {
      if (typeof variables === "undefined") { return ""; }

      const entries = Object.entries(variables);

      if (!entries.length) { return ""; }

      const markdownRows = [
        entries.map(entry => entry[0]),
        entries.map(entry => "--"),
        entries.map((entry) => {
          if (typeof entry[1] === "object" && !Array.isArray(entry[1])) {
            // Remove all newlines, or they ruin formatting of parent table
            return renderer.render(renderYamlTable(entry[1])).replace(/\n/g, "");
          } else {
            return entry[1];
          }
        })
      ];

      return (
        markdownRows.map(row => "| " + row.join(" | ") + " |").join("\n") + "\n";
      );
    };

    textContent = renderYamlTable(vars) + __content;

  } else {
    textContent = text;
  }

  let rendered = renderer.render(textContent);

  if (opts.settings.sanitize) {
    mdComponents.deps.dompurify ??= require("dompurify");
    if (typeof opts.settings.sanitize === "object") {
      rendered = mdComponents.deps.dompurify.sanitize(rendered, opts.settings.sanitize);
    } else {
      rendered = mdComponents.deps.dompurify.sanitize(rendered);
    }
  }

  return rendered;
}

module.exports = {
  build,
  render,
};
