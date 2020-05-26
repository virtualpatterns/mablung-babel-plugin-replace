import Source from 'source-map-support'

import { Plugin } from '../plugin.js'
import { ReplaceVisitor } from './replace-visitor.js'

Source.install({ 'environment': 'node', 'handleUncaughtExceptions': false, 'hookRequire': false })

export default Plugin.createPlugin(ReplaceVisitor)
