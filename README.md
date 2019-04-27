# eslint-plugin-pathname

Enforces full path, folder and file names to match desired case style

* Quick example:
```
// Errors for rule: kebabCase
myFileFolder/my-file-name.js // file path

// Ok for rule: kebabCase
my-file-folder/my-file-name.js // file path

```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-pathname`:

```
$ npm install eslint-plugin-pathname --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-pathname` globally.

## Usage

Add `pathname` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "pathname"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "pathname/rule-name": [{"case": "kebabCase"}]
  }
}
```


## Supported Rules

* Supported case options are: `kebabCase`, `camelCase` and `snakeCase`.

## Roadmap

* auto fix by renaming the file path to match desired rule
* maybe Typescript





