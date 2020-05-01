"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplaceVisitorInvalidImportTypeError = void 0;

var _replaceVisitorError = require("./replace-visitor-error.js");

class ReplaceVisitorInvalidImportTypeError extends _replaceVisitorError.ReplaceVisitorError {
  constructor(type) {
    super(`Invalid import type '${type}'.`);
  }

}

exports.ReplaceVisitorInvalidImportTypeError = ReplaceVisitorInvalidImportTypeError;
//# sourceMappingURL=replace-visitor-invalid-import-type-error.js.map