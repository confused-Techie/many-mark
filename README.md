# many-mark

The objective of `many-mark` is to provide the simplest interface of processing different markup languages as possible.

This is a WIP, and details will be added throughout development.

## Usage

```js
const mark = require("many-mark");

const output = mark(text, opts);
// The 'output' object contains:
//  - text: The rendered text content
//  - opts: The final format of options used to render the text
```

The `opts` object is monumentally important to how your text will be rendered.
The topmost keys are:
* `language`: This is the language you are provided to be rendered. It should be defined
              unless you provide an appropriate `filename`. Supported values:
                - `markdown`
* `flavour`: This is the flavour of whatever language you are using. Since many
             markup languages have slight variations on platform and version,
             flavour allows you to specify exactly how this content should be
             handled.
* `filename`: A generally optional value, is mostly only used to define `language`
              based on it's file extension, if a `language` isn't provided.
* `rules`: This optional object relates to modifications that will be made to the content.
* `settings`: This optional object relates to how to render the content.

Based on the broad intended support, as you might imagine the `rules` and `settings`
that are available will depend largely on what `language` is in use.

But all options are completely optional, if `language` and `filename` aren't defined
then `markdown` will be the default `language`.

Oftentimes a rule or setting can accept additional arguments itself. When defining
a rule you can just use `ruleName: true` to enable it and allow it to use it's default
settings, or instead provide an object of it's options to have deeper control.

## Markdown

If `flavour` isn't defined GitHub's `linguist` will be used as default.

Keep in mind depending on the `flavour` selected, different defaults will be
loaded for `rules` and `settings`. This helps ensure that all markdown processing
is handled faithfully to it's proper flavour. Of course if you provide any `rules`
or `settings` those will be used instead.

### Markdown `settings`

* `html`: Enable HTML tags in content.
* `breaks`: Convert `\n` newlines in paragraphs into `<br>` elements.
* `xhtmlOut`: Use `/` to close single tags (`<br />`).
* `emojis`: Use [`markdown-it-emoji`](https://www.npmjs.com/package/markdown-it-emoji) for emoji & emoticon syntax support. Any options are passed directly to this module.
* `githubHeadings`: Use [`markdown-it-github-headings`](https://www.npmjs.com/package/markdown-it-github-headings) to add GitHub style anchor tags to headers. Any options are passed directly to module.
* `githubTaskList`: Use [`markdown-it-task-checkbox`](https://www.npmjs.com/package/markdown-it-task-checkbox) to add GitHub task list and checkbox support. Any options are passed directly to module.

### Markdown `rules`
