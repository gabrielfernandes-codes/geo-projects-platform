export class UnableUpdateProjectLimitPlateausException extends Error {
  public static message = 'Unable to update project limit plateaus'

  constructor() {
    super(UnableUpdateProjectLimitPlateausException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
