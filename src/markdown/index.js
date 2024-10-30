const deepmerge = require("deepmerge");
const renderer = require("./renderer2.js");

const DEFAULT_OPTS = {
  linguist: {
    flavour: "linguist",
    settings: {
      html: true,
      breaks: false,
      emojis: {
        shortcuts: {} // Passing an empty shortcut option disables all shortcuts (emoticons)
        // While still leaving support for standard emoji syntax
      },
      githubHeadings: true,
      githubTaskList: true,
      frontMatter: true,
      sanitize: true,
    }
  },
  commonmark: {
    flavour: "commonmark",
    settings: {
      html: false,
      xhtmlOut: false,
      breaks: false
    }
  }
};

module.exports =
async function parser(text, givenOpts) {
  // Due to the highly opinionated nature of Markdown, before we can do anything
  // else we **must** determine which flavour we are expected to operate in.

  let opts;

  if (givenOpts.flavour.length === 0) {
    // No flavour has been given. We will default to GitHub's Linguist
    opts = deepmerge(DEFAULT_OPTS["linguist"], givenOpts);
  }

  if (DEFAULT_OPTS[givenOpts.flavour]) {
    opts = deepmerge(DEFAULT_OPTS[givenOpts.flavour], givenOpts);
  }

  if (!opts) {
    // A dirty way to determine if we've been given a supported flavour.
    // Since we will have default opts for every supported flavour, if the above
    // merge failed, we know we've been given a flavour we don't recognize.
    // And since we've already provided our default when nothing is given, we
    // know the user has selected an unsupported flavour, and can error.
    throw `The flavour '${givenOpts.flavour}' is not supported.`;
  }

  const render = renderer.build(opts);
  const renderedText = renderer.render(text, opts, render);

  return { text: renderedText, opts: opts };
}
