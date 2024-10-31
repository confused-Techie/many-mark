module.exports = ({ node }) => `<p>${node.getContent()}</p>`;

/*
  @see {@link https://github.com/asciidoctor/asciidoctor/blob/main/lib/asciidoctor/converter/html5.rb#L783}
*/
