# eslint-plugin-nada

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

Next, install `eslint-plugin-nada`:

```
$ npm install eslint-plugin-nada --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-nada` globally.

## Usage

Add `nada` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "nada"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "nada/path-case": [{"case": "kebabCase"}]
  }
}
```


## Supported Rules

### path-case

Enforces full path, folder and file names to match desired case style.

#### Options

* **case**: Supported case options are: `kebabCase`, `camelCase` and `snakeCase`.

Example:
```json
{
  "rules": {
    "nada/path-case": [{"case": "kebabCase"}]
  }
}
```

* **ignoreParts**: Array of strings to be ignored. Useful if you use file names like `my-file.spec.js` or `my-file.test.js`.

Example:
```json
{
  "rules": {
    "nada/path-case": [
      {
        "case": "kebabCase",
        "ignoreParts": [".test", ".spec"]},
    ]
  }
}
```

## Contributing

* Be respectful
* This project uses [semantic-release](https://github.com/semantic-release/semantic-release).
Please follow commit message convention: `feat: your new feature summary` or `fix: annoying bug that was killing me`.
Here are further commit examples: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
* Open an issue to request a feature or send a PR.


## Roadmap

* auto fix by renaming the file path to match desired rule
* maybe Typescript

