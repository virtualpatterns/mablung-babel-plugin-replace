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

  onIdentifierNode( /* path, state, context */ ) {
    // console.log('Visitor.onIdentifierNode(path, state, context)')
  }
  
  onAfterNode( /* state */ ) {
    // console.log('Visitor.onAfterNode(state)')
  }

}

export { Visitor }