const { describe, it } = require("node:test");
const assert = require("node:assert");

const manyMark = require("../src/index.js");

describe("Markdown Tests", () => {
  it("Parses simple Markdown with language provided", async () => {
    const str = "# Hello World!\nI am **confused-Techie**!";

    const html = await manyMark(str, { language: "markdown" });

    assert.strictEqual(
      "<h1>Hello World!</h1>\n<p>I am <strong>confused-Techie</strong>!</p>\n",
      html.text
    );
  });

  it("Parses simple Markdown with Filename provided", async () => {
    const str = "# Hello World!\nI am **confused-Techie**!";

    const html = await manyMark(str, { filename: "README.md" });

    assert.strictEqual(
      "<h1>Hello World!</h1>\n<p>I am <strong>confused-Techie</strong>!</p>\n",
      html.text
    );
  });
});
