import * as Babel from '@babel/core'
import Test from 'ava'

Test.beforeEach((test) => {

  test.context.codeIn = 'const FilePath = __filePath\nconst Require = __require'
  test.context.option = { 
    'plugins': [ 
      [
        require.resolve('../../../index.js'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': '__importIdentifier.fileURLToPath(import.meta.url)',
              'parserOption': { 
                'plugins': [ 'importMeta' ], 
                'sourceType': 'module' 
              },
              'addImport': [
                {
                  'type': 'default',
                  'source': 'url',
                  'option': {
                    'nameHint': 'URL'
                  }
                }
              ]
            },
            {
              'searchFor': '__require',
              'replaceWith': '__importIdentifier(import.meta.url)',
              'parserOption': { 
                'plugins': [ 'importMeta' ], 
                'sourceType': 'module' 
              },
              'addImport': [
                {
                  'type': 'named',
                  'name': 'createRequire',
                  'source': 'module'
                }
              ]
            }
          ]
        }      
      ]
    ]
  }
  
})

Test('rule.replaceWith = \'__importIdentifier.fileURLToPath(import.meta.url)\' and \'__importIdentifier(import.meta.url)\'', async (test) => {

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\nimport _URL from "url";\n\nconst FilePath = _URL.fileURLToPath(import.meta.url);\n\nconst Require = _createRequire(import.meta.url);'

  test.is(actualCodeOut, expectedCodeOut)

})
