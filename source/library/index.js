import { Plugin } from './plugin.js'
import Source from 'source-map-support'
import { Visitor } from './visitor.js'

Source.install({ 'environment': 'node', 'handleUncaughtExceptions': false, 'hookRequire': false })

export default Plugin.createPlugin(Visitor)

// export default function({ 'types': type }) {
//   return {
//     visitor: {
//       Identifier(path) {
//         const name = path.node.name;
//         // reverse the name: JavaScript -> tpircSavaJ
//         path.node.name = name
//           .split("")
//           .reverse()
//           .join("");
//       },
//     },
//   };
// }
