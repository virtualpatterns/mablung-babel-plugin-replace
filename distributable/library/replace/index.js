"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sourceMapSupport = _interopRequireDefault(require("source-map-support"));

var _plugin = require("../plugin.js");

var _replaceVisitor = require("./replace-visitor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport.default.install({
  'environment': 'node',
  'handleUncaughtExceptions': false,
  'hookRequire': false
});

var _default = _plugin.Plugin.createPlugin(_replaceVisitor.ReplaceVisitor);

exports.default = _default;
//# sourceMappingURL=index.js.map