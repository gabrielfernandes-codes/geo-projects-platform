export class UnableUpdateProjectLimitException extends Error {
  public static message = 'Unable to update project limit'

  constructor() {
    super(UnableUpdateProjectLimitException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
