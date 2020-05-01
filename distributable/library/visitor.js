"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = void 0;

class Visitor {
  constructor(babel) {
    // console.log('Visitor(babel)')
    this._babel = babel;
  }

  get nodeType() {
    return ['Identifier'];
  }

  onBeforeNode()
  /* state */
  {// console.log('Visitor.onBeforeNode(state)')
  }

  onIdentifierNode()
  /* path, state */
  {// console.log(`Visitor.onIdentifierNode('${path.node.name}', state)`)
  }

  onAfterNode()
  /* state */
  {// console.log('Visitor.onAfterNode(state)')
  }

}

exports.Visitor = Visitor;
//# sourceMappingURL=visitor.js.map