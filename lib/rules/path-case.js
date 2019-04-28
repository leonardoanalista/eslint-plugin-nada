const _ = require('lodash');
const path = require('path');

/**
 * @fileoverview enforces folder and file names to match desired case style. Options are: kebabCase, camelCase, snakeCase
 * @author path-case
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const placeholderSuffix = 'zzzzzzzzzz'; // really anything other tha n @@@, numbers. Ohtherwise lodash applies the case split.

const indexToLetter = index => String.fromCharCode(97 + index);

const applyPlaceHolderForIgnoreParts = (value, ignoreParts) => {
  if (_.isEmpty(ignoreParts)) {
    return value;
  }

  let result = value;
  _.forEach(ignoreParts, (part, index) => {
    result = _.replace(result, new RegExp(part, 'g'), `${indexToLetter(index)}${placeholderSuffix}`);
  });

  return result;
};

const removePlaceHolderForIgnoreParts = (value, ignoreParts) => {
  if (_.isEmpty(ignoreParts)) {
    return value;
  }

  let result = value;

  _.forEach(ignoreParts, (part, index) => {
    const expr = `${indexToLetter(index)}${placeholderSuffix}`;
    result = _.replace(result, new RegExp(expr, 'g'), part);
  });

  return result;
};

module.exports = {
  meta: {
    docs: {
      description: 'enforces folder and file names to match desired case style',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          case: {
            enum: ['camelCase', 'snakeCase', 'kebabCase'],
          },
          ignoreParts: {
            type: 'array',
          },
        },
      },
    ],
  },

  create(context) {
    const filenameWithExt = context.getFilename();
    const extension = path.extname(filenameWithExt);
    // const filename = path.basename(filenameWithExt, extension);
    const caseValue = _.get(context, 'options[0].case');
    const ignoreParts = _.get(context, 'options[0].ignoreParts');

    const caseTable = {
      kebabCase: _.kebabCase,
      camelCase: _.camelCase,
      snakeCase: _.snakeCase,
    };

    const caseFn = caseTable[caseValue];
    const fullPathWithoutExt = _.replace(applyPlaceHolderForIgnoreParts(filenameWithExt, ignoreParts), extension, '');

    const formattedFilename = _(fullPathWithoutExt)
      .split('/')
      .map(caseFn)
      .join('/');

    const formattedFilenameWithExt = removePlaceHolderForIgnoreParts(formattedFilename, ignoreParts) + extension;

    return {
      Program(node) {
        if (formattedFilenameWithExt !== filenameWithExt) {
          context.report(
            node,
            "Path filename '{{name}}' does not match the naming convention '{{caseValue}}'. Correct is '{{formattedFilenameWithExt}}'",
            {
              name: filenameWithExt,
              caseValue,
              formattedFilenameWithExt,
            }
          );
        }
      },
    };
  },
};
