const path = require("path");

function determine(filename) {
  const ext = path.parse(filename).ext;

  switch(ext) {
    case ".markdown":
    case ".mdown":
    case ".mkdn":
    case ".md":
      return "markdown";
    case ".textile":
      // NOT CURRENTLY SUPPORTED
    case ".rdoc":
      // NOT CURRENTLY SUPPORTED
    case ".org":
      // NOT CURRENTLY SUPPORTED
    case ".creole":
      // NOT CURRENTLY SUPPORTED
    case ".mediawiki":
    case ".wiki":
      // NOT CURRENTLY SUPPORTED
    case ".rst":
      // NOT CURRENTLY SUPPORTED
    case ".asciidoc":
    case ".adoc":
    case ".asc":
      // NOT CURRENTLY SUPPORTED
    case ".pod":
      // NOT CURRENTLY SUPPORTED
    default:
      return `Extension: '${ext}'`;
  }
}

module.exports = {
  determine,
  default: "markdown",
  supported: [
    "markdown"
  ],
  parsers: {
    markdown: require("./markdown/index.js")
  }
};
