const _ = require('lodash');
const path = require('path');

/**
 * @fileoverview enforces folder and file names to match desired case style. Options are: kebabCase, camelCase, snakeCase
 * @author path-case
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
        },
      },
    ],
  },

  create(context) {
    const filenameWithExt = context.getFilename();
    const extension = path.extname(filenameWithExt);
    // const filename = path.basename(filenameWithExt, extension);
    const caseValue = _.get(context, 'options[0].case');

    const caseTable = {
      kebabCase: _.kebabCase,
      camelCase: _.camelCase,
      snakeCase: _.snakeCase,
    };

    const caseFn = caseTable[caseValue];

    const fullPathWithoutExt = _.replace(filenameWithExt, extension, '');
    const formattedFilename = _(fullPathWithoutExt)
      .split('/')
      .map(caseFn)
      .join('/');
    const formattedFilenameWithExt = formattedFilename + extension;

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
