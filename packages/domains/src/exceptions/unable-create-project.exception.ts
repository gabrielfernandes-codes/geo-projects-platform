export class UnableCreateProjectException extends Error {
  public static message = 'Unable to create project'

  constructor() {
    super(UnableCreateProjectException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
