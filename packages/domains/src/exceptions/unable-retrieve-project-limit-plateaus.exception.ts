export class UnableRetrieveProjectLimitPlateausException extends Error {
  public static message = 'Unable to retrieve project limit plateaus'

  constructor() {
    super(UnableRetrieveProjectLimitPlateausException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
