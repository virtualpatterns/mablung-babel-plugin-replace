"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplaceVisitor = void 0;

var _helperModuleImports = require("@babel/helper-module-imports");

var _is = _interopRequireDefault(require("@pwn/is"));

var Parser = _interopRequireWildcard(require("@babel/parser"));

var _visitor = require("../visitor.js");

var _replaceVisitorInvalidImportTypeError = require("./error/replace-visitor-invalid-import-type-error.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReplaceVisitor extends _visitor.Visitor {
  constructor(babel) {
    super(babel);
    this._programPath = null;
    this._importIdentifier = null;
  }

  get nodeType() {
    return ['Program', ...super.nodeType];
  }

  onProgramNode(path) {
    this._programPath = path;
    this._importIdentifier = null;
  }

  onIdentifierNode(path, state) {
    // console.log(`ReplaceVisitor.onIdentifierNode('${path.node.name}', state)`)
    let option = state.opts;
    let rule = option.rule;
    rule.forEach(rule => {
      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : _is.default.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi');
      rule.parserOption = rule.parserOption ? rule.parserOption : {};

      if (rule.searchForPattern.test(path.node.name)) {
        // console.log(`Replacing '${path.node.name}' with '${rule.replaceWith}'`)
        // if (rule.parserOption) {
        //   console.dir(rule.parserOption)
        // }
        if (_is.default.null(this._importIdentifier)) {
          rule.addImport = rule.addImport ? rule.addImport : [];
          rule.addImport.forEach(addImport => {
            switch (addImport.type) {
              case 'default':
                this._importIdentifier = (0, _helperModuleImports.addDefault)(this._programPath, addImport.source, addImport.option);
                break;

              case 'named':
                this._importIdentifier = (0, _helperModuleImports.addNamed)(this._programPath, addImport.name, addImport.source, addImport.option);
                break;

              case 'namespace':
                this._importIdentifier = (0, _helperModuleImports.addNamespace)(this._programPath, addImport.source, addImport.option);
                break;

              case 'sideEffect':
                (0, _helperModuleImports.addSideEffect)(this._programPath, addImport.source);
                break;

              default:
                throw new _replaceVisitorInvalidImportTypeError.ReplaceVisitorInvalidImportTypeError(addImport.type);
            }
          });
          rule.replaceWith = _is.default.null(this._importIdentifier) ? rule.replaceWith : rule.replaceWith.replace(/__importIdentifier/gi, this._importIdentifier.name);
          rule.replaceWithNode = rule.replaceWithNode ? rule.replaceWithNode : Parser.parseExpression(rule.replaceWith, rule.parserOption);
        }

        path.replaceWith(rule.replaceWithNode);
      }
    });
    super.onIdentifierNode(path, state);
  }

} // {
//   "searchFor": "__resolve",
//   "replaceWith": "import { createRequire } from 'module'",
//   "parserOption": { 
//     "sourceType": "module" 
//   }
// },


exports.ReplaceVisitor = ReplaceVisitor;
//# sourceMappingURL=replace-visitor.js.map