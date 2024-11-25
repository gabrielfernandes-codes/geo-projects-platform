export class UnableUpdateProjectLimitsException extends Error {
  public static message = 'Unable to update project limits'

  constructor() {
    super(UnableUpdateProjectLimitsException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
