import { VisitorError } from '../../error/visitor-error.js'

class ReplaceVisitorError extends VisitorError {

  constructor(message) {
    super(message)
  }

}

export { ReplaceVisitorError }
