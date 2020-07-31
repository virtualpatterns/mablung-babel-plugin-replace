import * as ChangeCase from 'change-case'
import Utility from 'util'

const { pascalCase: PascalCase } = ChangeCase

class Plugin {

  static createPlugin(visitorClass) {
    // console.log(`Plugin.createPlugin(${visitorClass.name})`)

    return Utility.deprecate(function (babel) {
      // console.log(`Plugin.createPlugin(${visitorClass.name})(babel)`)

      let visitorInstance = new visitorClass(babel)

      let pluginObject = {}

      pluginObject.pre = function(state) { visitorInstance.onBeforeNode(state) }
      pluginObject.post = function(state) { visitorInstance.onAfterNode(state) }

      let nodeType = visitorInstance.nodeType
      let visitorObject = {}

      nodeType.forEach((nodeType) => {
        visitorObject[nodeType] = function(path, state) { visitorInstance[`on${PascalCase(nodeType)}Node`](path, state, this) }
      })

      pluginObject.visitor = visitorObject

      return pluginObject

    }, 'The package \'@virtualpatterns/mablung-babel-plugin-replace\' has been deprecated.  Use the \'@virtualpatterns/mablung-babel-plugin-replace-identifier\' package instead ... it offers the same functionality and options.')

  }

}

export { Plugin }
