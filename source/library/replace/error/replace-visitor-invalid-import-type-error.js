import { ReplaceVisitorError } from './replace-visitor-error.js'

class ReplaceVisitorInvalidImportTypeError extends ReplaceVisitorError {

  constructor(type) {
    super(`Invalid import type '${type}'.`)
  }

}

export { ReplaceVisitorInvalidImportTypeError }
