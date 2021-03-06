"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var ChangeCase = _interopRequireWildcard(require("change-case"));

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  pascalCase: PascalCase
} = ChangeCase;

class Plugin {
  static createPlugin(visitorClass) {
    // console.log(`Plugin.createPlugin(${visitorClass.name})`)
    return _util.default.deprecate(function (babel) {
      // console.log(`Plugin.createPlugin(${visitorClass.name})(babel)`)
      let visitorInstance = new visitorClass(babel);
      let pluginObject = {};

      pluginObject.pre = function (state) {
        visitorInstance.onBeforeNode(state);
      };

      pluginObject.post = function (state) {
        visitorInstance.onAfterNode(state);
      };

      let nodeType = visitorInstance.nodeType;
      let visitorObject = {};
      nodeType.forEach(nodeType => {
        visitorObject[nodeType] = function (path, state) {
          visitorInstance[`on${PascalCase(nodeType)}Node`](path, state, this);
        };
      });
      pluginObject.visitor = visitorObject;
      return pluginObject;
    }, 'The package \'@virtualpatterns/mablung-babel-plugin-replace\' has been deprecated.  Use the \'@virtualpatterns/mablung-babel-plugin-replace-identifier\' package instead ... it offers the same functionality and options.');
  }

}

exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map