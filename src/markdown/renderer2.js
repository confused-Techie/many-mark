const MarkdownIt = require("markdown-it");
const frontMatter = require("yaml-front-matter");

function build(opts) {
  let mdItOpts = {
    html: true,
    breaks: false
  };

  let md = new MarkdownIt(mdItOpts);

  return md;
}

function render(text, opts, renderer) {
  let textContent;

  if (opts.settings.frontMatter) {
    const { __content, vars } = frontMatter.loadFront(text);

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
        markdownRows.map(row => "| " + row.join(" | ") + " |").join("\n") + "\n"
      );
    };

    textContent = renderYamlTable(vars) + __content;
  } else {
    textContent = text;
  }

  let rendered = renderer.render(textContent);

  return rendered;
}

module.exports = {
  build,
  render,
};
