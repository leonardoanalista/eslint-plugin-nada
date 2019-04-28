/**
 * @fileoverview enforces folder and file names to match desired case style
 * @author path-case
 */

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/path-case');

const type = 'Program';
const ruleTester = new RuleTester();

ruleTester.run('path-case', rule, {
  valid: [
    {
      filename: 'my-file-folder/my-file-name.js',
      code: 'my-file-folder/my-file-name.js // rule: kebabCase',
      options: [{ case: 'kebabCase' }],
    },
    {
      filename: 'myFileFolder/myFileName.js',
      code: 'myFileFolder/myFileName.js // rule: camelCase',
      options: [{ case: 'camelCase' }],
    },
    {
      filename: 'my_file_folder/my_file_name.js',
      code: 'my_file_folder/my_file_name.js // rule: snakeCase',
      options: [{ case: 'snakeCase' }],
    },
    {
      filename: 'root.test/my-file-folder.test/my-file-name.spec.js',
      code: 'root.test/my-file-folder.test/my-file-name.spec.js // rule: kebabCase',
      options: [{ case: 'kebabCase', ignoreParts: ['.spec', '.test'] }],
    },
  ],

  invalid: [
    // kebabCase
    {
      filename: 'myFileFolder/my-file-name.js',
      code: 'myFileFolder/my-file-name.js // rule: kebabCase',
      options: [{ case: 'kebabCase' }],
      errors: [
        {
          message:
            "Path filename 'myFileFolder/my-file-name.js' does not match the naming convention 'kebabCase'. Correct is 'my-file-folder/my-file-name.js'",
          type,
        },
      ],
    },
    {
      filename: 'my-file-folder/myFileName.js',
      code: 'my-file-folder/myFileName.js // rule: kebabCase',
      options: [{ case: 'kebabCase' }],
      errors: [
        {
          message:
            "Path filename 'my-file-folder/myFileName.js' does not match the naming convention 'kebabCase'. Correct is 'my-file-folder/my-file-name.js'",
          type,
        },
      ],
    },

    // camelCase
    {
      filename: 'my-file-folder/my-file-name.js',
      code: 'my-file-folder/my-file-name.js // rule: camelCase',
      options: [{ case: 'camelCase' }],
      errors: [
        {
          message:
            "Path filename 'my-file-folder/my-file-name.js' does not match the naming convention 'camelCase'. Correct is 'myFileFolder/myFileName.js'",
          type,
        },
      ],
    },

    // snakeCase
    {
      filename: 'my-file-folder/my-file-name.js',
      code: 'my-file-folder/my-file-name.js // rule: snakeCase',
      options: [{ case: 'snakeCase' }],
      errors: [
        {
          message:
            "Path filename 'my-file-folder/my-file-name.js' does not match the naming convention 'snakeCase'. Correct is 'my_file_folder/my_file_name.js'",
          type,
        },
      ],
    },
    {
      filename: 'my-File-Folder/my-File-Name.js',
      code: 'my-File-Folder/my-File-Name.js // rule: snakeCase',
      options: [{ case: 'snakeCase' }],
      errors: [
        {
          message:
            "Path filename 'my-File-Folder/my-File-Name.js' does not match the naming convention 'snakeCase'. Correct is 'my_file_folder/my_file_name.js'",
          type,
        },
      ],
    },
  ],
});
