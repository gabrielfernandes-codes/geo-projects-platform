export class UnableRetrieveProjectPlateausException extends Error {
  public static message = 'Unable to retrieve project plateaus'

  constructor() {
    super(UnableRetrieveProjectPlateausException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
