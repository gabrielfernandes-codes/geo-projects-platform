export class ProjectNotFoundException extends Error {
  public static message = 'Project not found'

  constructor() {
    super(ProjectNotFoundException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
