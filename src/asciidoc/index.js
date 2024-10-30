const asciidoctor = require("asciidoctor");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports =
async function parser(text, givenOpts) {
  const Asciidoctor = asciidoctor();

  const renderedText = Asciidoctor.convert(text);

  const normalizedText = normalize(renderedText);

  return { text: normalizedText, opts: givenOpts };
}


// Because our ultimate goal is manipulation of HTML parsed like it's Markdown
// and AsciiDoc outputs quite different HTML. We first will normalize the output
// so it more closely matches what we expect from `markdown-it`
function normalize(text) {
  const frag = JSDOM.fragment(text);

  // Remove all IDs from the document
  let nodeIds = frag.querySelectorAll("[id]");

  for (let i = 0; i < nodeIds.length; i++) {
    nodeIds[i].removeAttribute("id");
  }

  // Remove all classes from the document
  let nodeClasses = frag.querySelectorAll("[class]");

  for (let i = 0; i < nodeClasses.length; i++) {
    nodeClasses[i].removeAttribute("class");
  }

  // Remove all divs from the document
  // let hasDivs = frag.querySelectorAll("div");
  //
  // while(hasDivs) {
  //   // Set our current divNode to the last possible div
  //   let divNode = hasDivs[hasDivs.length - 1];
  //   if (divNode.parentElement) {
  //     // If this node has a parent (since we are in a fragment)
  //     // Append the node's inner content to the parent, escaping the "div"
  //
  //     // divNode.parentElement.append(divNode.firstChild.cloneNode());
  //     // divNode.remove();
  //     divNode.parentNode.appendChild(divNode.firstChild);
  //   }
  //
  //   // Update "hasDivs"
  //   hasDivs = false;
  // }

  // Move all paragraphs within a div up the tree
  let divInP = frag.querySelectorAll("div p");

  for (let i = 0; i < divInP.length; i++) {
    let divNode = divInP[i].parentNode;
    divNode.parentNode.appendChild(divInP[i]);
  }

  return frag.firstChild.outerHTML;
}
