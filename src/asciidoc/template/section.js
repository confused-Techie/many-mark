module.exports = ({ node }) => {
  const lvl = node.getLevel();

  return `<h${lvl}>${node.getTitle()}</h${lvl}>\n${node.getContent()}`;
};

/*
  @see {@link https://github.com/asciidoctor/asciidoctor/blob/main/lib/asciidoctor/converter/html5.rb#L382}
*/
