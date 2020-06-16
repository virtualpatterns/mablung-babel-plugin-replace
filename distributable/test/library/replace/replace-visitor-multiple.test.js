"use strict";

var Babel = _interopRequireWildcard(require("@babel/core"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_ava.default.beforeEach(test => {
  test.context.codeIn = 'const FilePath = __filePath\nconst Require = __require';
  test.context.option = {
    'plugins': [[require.resolve('../../../index.js'), {
      'rule': [{
        'searchFor': '__filePath',
        'replaceWith': '__importIdentifier.fileURLToPath(import.meta.url)',
        'parserOption': {
          'plugins': ['importMeta'],
          'sourceType': 'module'
        },
        'addImport': [{
          'type': 'default',
          'source': 'url',
          'option': {
            'nameHint': 'URL'
          }
        }]
      }, {
        'searchFor': '__require',
        'replaceWith': '__importIdentifier(import.meta.url)',
        'parserOption': {
          'plugins': ['importMeta'],
          'sourceType': 'module'
        },
        'addImport': [{
          'type': 'named',
          'name': 'createRequire',
          'source': 'module'
        }]
      }]
    }]]
  };
});

(0, _ava.default)('rule.replaceWith = \'__importIdentifier.fileURLToPath(import.meta.url)\' and \'__importIdentifier(import.meta.url)\'', async test => {
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\nimport _URL from "url";\n\nconst FilePath = _URL.fileURLToPath(import.meta.url);\n\nconst Require = _createRequire(import.meta.url);';
  test.is(actualCodeOut, expectedCodeOut);
});
//# sourceMappingURL=replace-visitor-multiple.test.js.map