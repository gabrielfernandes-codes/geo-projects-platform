export class UnableRetrieveProjectException extends Error {
  public static message = 'Unable to retrieve project'

  constructor() {
    super(UnableRetrieveProjectException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
