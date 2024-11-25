export class InvalidProjectLimitPlateausGeometriesBoundariesException extends Error {
  public static message = 'Invalid project limit plateaus geometries boundaries'

  constructor() {
    super(InvalidProjectLimitPlateausGeometriesBoundariesException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
