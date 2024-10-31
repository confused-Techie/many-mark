const asciidoctor = require("asciidoctor");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports =
async function parser(text, givenOpts) {
  const Asciidoctor = asciidoctor();

  const renderedText = Asciidoctor.convert(text, { template_dir: "./src/asciidoc/template" });

  return { text: renderedText, opts: givenOpts };
}
