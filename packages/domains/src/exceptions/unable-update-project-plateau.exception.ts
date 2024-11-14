export class UnableUpdateProjectPlateauException extends Error {
  public static message = 'Unable to update project plateau'

  constructor() {
    super(UnableUpdateProjectPlateauException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
