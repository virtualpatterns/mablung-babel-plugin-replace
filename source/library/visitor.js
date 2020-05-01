class Visitor {

  constructor(babel) {
    // console.log('Visitor(babel)')
    this._babel = babel
  }

  get nodeType() {
    return [ 'Identifier' ]
  }
  
  onBeforeNode( /* state */ ) {
    // console.log('Visitor.onBeforeNode(state)')
  }

  onIdentifierNode( /* path, state */ ) {
    // console.log(`Visitor.onIdentifierNode('${path.node.name}', state)`)
  }
  
  onAfterNode( /* state */ ) {
    // console.log('Visitor.onAfterNode(state)')
  }

}

export { Visitor }