const { describe, it } = require("node:test");
const assert = require("node:assert");

const manyMark = require("../src/index.js");

describe("AsciiDoc Tests", () => {
  it("Parses simple AsciiDoc with language provided", async () => {
    const str = "== Hello World!\nI am *confused-Techie*!";

    const html = await manyMark(str, { language: "asciidoc" });

    assert.strictEqual(
      html.text,
      "<h1>Hello World!</h1>\n<p>I am <strong>confused-Techie</strong>!</p>"
    );
  });
  it("Parses simple AsciiDoc with Filename provided", async () => {
    const str = "== Hello World!\nI am **confused-Techie**!";

    const html = await manyMark(str, { filename: "README.adoc" });

    assert.strictEqual(
      html.text,
      "<h1>Hello World!</h1>\n<p>I am <strong>confused-Techie</strong>!</p>"
    );
  });
});
