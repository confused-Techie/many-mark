const { describe, it } = require("node:test");
const assert = require("node:assert");

const manyMark = require("../src/index.js");

describe("AsciiDoc Tests", () => {
  it("Parses simple AsciiDoc with language provided", async () => {
    const str = "== Hello World!\nI am *confused-Techie*!";

    const html = await manyMark(str, { language: "asciidoc" });

    console.log(html);

    assert.strictEqual(
      "<h1>Hello World!</h1>\n<p>I am <strong>confused-Techie</strong>!</p>\n",
      html.text
    );
  });
});
