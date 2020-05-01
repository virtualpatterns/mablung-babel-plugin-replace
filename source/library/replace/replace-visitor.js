import { 
  addDefault as AddDefaultImport,
  addNamed as AddNamedImport,
  addNamespace as AddNamespaceImport,
  addSideEffect as AddSideEffectImport
} from '@babel/helper-module-imports'

import Is from '@pwn/is'
import * as Parser from '@babel/parser'

import { Visitor } from '../visitor.js'

import { ReplaceVisitorInvalidImportTypeError } from './error/replace-visitor-invalid-import-type-error.js'

class ReplaceVisitor extends Visitor {

  constructor(babel) {
    super(babel)

    this._programPath = null
    this._importIdentifier = null

  }

  get nodeType() {
    return [ 'Program', ...super.nodeType ]
  }

  onProgramNode(path) {
    this._programPath = path
    this._importIdentifier = null
  }

  onIdentifierNode(path, state) {
    // console.log(`ReplaceVisitor.onIdentifierNode('${path.node.name}', state)`)

    let option = state.opts
    let rule = option.rule

    rule.forEach((rule) => {

      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : Is.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi')
      rule.parserOption = rule.parserOption ? rule.parserOption : {}

      if (rule.searchForPattern.test(path.node.name)) {

        // console.log(`Replacing '${path.node.name}' with '${rule.replaceWith}'`)

        // if (rule.parserOption) {
        //   console.dir(rule.parserOption)
        // }

        if(Is.null(this._importIdentifier)) {

          rule.addImport = rule.addImport ? rule.addImport : []
          rule.addImport.forEach((addImport) => {

            switch (addImport.type) {
              case 'default':
                this._importIdentifier = AddDefaultImport(this._programPath, addImport.source, addImport.option)
                break
              case 'named':
                this._importIdentifier = AddNamedImport(this._programPath, addImport.name, addImport.source, addImport.option)
                break
              case 'namespace':
                this._importIdentifier = AddNamespaceImport(this._programPath, addImport.source, addImport.option)
                break
              case 'sideEffect':
                AddSideEffectImport(this._programPath, addImport.source)
                break
              default:
                throw new ReplaceVisitorInvalidImportTypeError(addImport.type)
            }
            
          })

          rule.replaceWith = Is.null(this._importIdentifier) ? rule.replaceWith : rule.replaceWith.replace(/__importIdentifier/gi, this._importIdentifier.name)
          rule.replaceWithNode = rule.replaceWithNode ?  rule.replaceWithNode : Parser.parseExpression(rule.replaceWith, rule.parserOption)
  
        }

        path.replaceWith(rule.replaceWithNode)

      }

    })

    super.onIdentifierNode(path, state)

  }

}

export { ReplaceVisitor }

// {
//   "searchFor": "__resolve",
//   "replaceWith": "import { createRequire } from 'module'",
//   "parserOption": { 
//     "sourceType": "module" 
//   }
// },
