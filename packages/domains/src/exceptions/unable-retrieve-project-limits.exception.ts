export class UnableRetrieveProjectLimitsException extends Error {
  public static message = 'Unable to retrieve project limits'

  constructor() {
    super(UnableRetrieveProjectLimitsException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
