const deepmerge = require("deepmerge");
const languages = require("./languages.js");

const DEFAULT_OPTS = {
  language: "",
  flavour: "",
  filename: "",
  rules: {},  // rules relate to modifications to make to content
  settings: {}  // settings relate to how to convert content
};

module.exports =
async function render(text, givenOpts = {}) {
  // Assign our options
  const opts = deepmerge(DEFAULT_OPTS, givenOpts);

  // Firstly, lets validate our most important values
  if (typeof opts.language !== "string") { opts.language = ""; }
  if (typeof opts.flavour !== "string") { opts.flavour = ""; }
  if (typeof opts.filename !== "string") { opts.filename = ""; }

  // Attempt to determine the language if not provided
  if (opts.language.length === 0) {
    // Since no language is provided, we will need to rely on the filename
    // extension to determine how to render the text.
    if (opts.filename.length !== 0) {
      // We have a valid filename to work with, and attempt to determine what
      // parser to use
      opts.language = languages.determine(opts.filename);
    } else {
      // No language or filename has been provided. We will default to markdown
      opts.language = languages.default;
    }
  }

  // After doing our preliminary check, we want to error out here, if our earlier
  // work failed to add a valid language, or the provided language isn't supported.
  if (!languages.supported.includes(opts.language)) {
    // This means either the provided language isn't supported, or our attempts
    // to determine a language based on filename failed to find anything we support.
    throw `The language '${opts.language}' is not supported.`;
  }

  const parser = languages.parsers[opts.language];

  const result = await parser(text, opts);

  return result; // Object containing `text` with rendered text and `opts` the
    // final full options
}
