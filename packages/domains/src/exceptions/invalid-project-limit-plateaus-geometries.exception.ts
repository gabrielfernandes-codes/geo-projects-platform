export class InvalidProjectLimitPlateausGeometriesException extends Error {
  public static message = 'Invalid project limit plateaus geometries'

  constructor() {
    super(InvalidProjectLimitPlateausGeometriesException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
