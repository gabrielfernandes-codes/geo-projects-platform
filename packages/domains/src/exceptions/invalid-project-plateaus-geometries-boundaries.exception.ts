export class InvalidProjectPlateausGeometriesBoundariesException extends Error {
  public static message = 'Invalid project plateaus geometries boundaries'

  constructor() {
    super(InvalidProjectPlateausGeometriesBoundariesException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
