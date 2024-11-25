export class UnableUpdateProjectPlateausException extends Error {
  public static message = 'Unable to update project plateaus'

  constructor() {
    super(UnableUpdateProjectPlateausException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
