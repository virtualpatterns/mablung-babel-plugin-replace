import * as Babel from '@babel/core'
import Test from 'ava'

import { ReplaceVisitorInvalidImportTypeError } from '../../../library/replace/error/replace-visitor-invalid-import-type-error.js'

Test.beforeEach((test) => {

  test.context.codeIn = 'console.log(__require.resolve(\'./index.js\'))'
  test.context.option = { 
    'plugins': [ 
      [
        require.resolve('../../../index.js'),
        {
          'rule': [
            {
              'searchFor': '__require',
              'replaceWith': '...',
              'parserOption': { 
                'plugins': [ 'importMeta' ], 
                'sourceType': 'module' 
              },
              'addImport': []
            }
          ]
        }      
      ]
    ]
  }
  
})

Test('rule.replaceWith = \'createRequire(import.meta.url)\'', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = 'createRequire(import.meta.url)'

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'console.log(createRequire(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('addImport.type: \'default\'', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'module',
    'option': {
      'nameHint': 'createRequire'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import _createRequire from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('addImport.type: \'named\'', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('addImport.type: \'namespace\'', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'namespace',
    'source': 'module',
    'option': {
      'nameHint': 'createRequire'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import * as _createRequire from "module";\nconsole.log(_createRequire(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('addImport.type: \'sideEffect\'', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'sideEffect',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import "module";\nconsole.log(__importIdentifier(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('addImport.type: invalid', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': '_sideEffect',
    'source': 'module'
  })

  let promise = Babel.transformAsync(test.context.codeIn, test.context.option)

  await test.throwsAsync(promise, { 'instanceOf': ReplaceVisitorInvalidImportTypeError })

})

