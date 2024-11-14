export class UnableRetrieveProjectPlateauException extends Error {
  public static message = 'Unable to retrieve project plateau'

  constructor() {
    super(UnableRetrieveProjectPlateauException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
