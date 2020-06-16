"use strict";

var Babel = _interopRequireWildcard(require("@babel/core"));

var _ava = _interopRequireDefault(require("ava"));

var _replaceVisitorInvalidImportTypeError = require("../../../library/replace/error/replace-visitor-invalid-import-type-error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_ava.default.beforeEach(test => {
  test.context.codeIn = 'console.log(__require.resolve(\'./index.js\'))';
  test.context.option = {
    'plugins': [[require.resolve('../../../index.js'), {
      'rule': [{
        'searchFor': '__require',
        'replaceWith': '...',
        'parserOption': {
          'plugins': ['importMeta'],
          'sourceType': 'module'
        },
        'addImport': []
      }]
    }]]
  };
});

(0, _ava.default)('rule.replaceWith = \'createRequire(import.meta.url)\'', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = 'createRequire(import.meta.url)';
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'console.log(createRequire(import.meta.url).resolve(\'./index.js\'));';
  test.is(actualCodeOut, expectedCodeOut);
});
(0, _ava.default)('addImport.type: \'default\'', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)';
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'module',
    'option': {
      'nameHint': 'createRequire'
    }
  });
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'import _createRequire from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));';
  test.is(actualCodeOut, expectedCodeOut);
});
(0, _ava.default)('addImport.type: \'named\'', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)';
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  });
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));';
  test.is(actualCodeOut, expectedCodeOut);
});
(0, _ava.default)('addImport.type: \'namespace\'', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)';
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'namespace',
    'source': 'module',
    'option': {
      'nameHint': 'createRequire'
    }
  });
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'import * as _createRequire from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));';
  test.is(actualCodeOut, expectedCodeOut);
});
(0, _ava.default)('addImport.type: \'sideEffect\'', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)';
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'sideEffect',
    'source': 'module'
  });
  let {
    code: actualCodeOut
  } = await Babel.transformAsync(test.context.codeIn, test.context.option);
  let expectedCodeOut = 'import "module";\nconsole.log(__importIdentifier(import.meta.url).resolve(\'./index.js\'));';
  test.is(actualCodeOut, expectedCodeOut);
});
(0, _ava.default)('addImport.type: invalid', async test => {
  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)';
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': '_sideEffect',
    'source': 'module'
  });
  let promise = Babel.transformAsync(test.context.codeIn, test.context.option);
  await test.throwsAsync(promise, {
    'instanceOf': _replaceVisitorInvalidImportTypeError.ReplaceVisitorInvalidImportTypeError
  });
});
//# sourceMappingURL=replace-visitor-single.test.js.map