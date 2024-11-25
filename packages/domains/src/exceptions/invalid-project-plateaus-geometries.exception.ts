export class InvalidProjectPlateausGeometriesException extends Error {
  public static message = 'Invalid project plateaus geometries'

  constructor() {
    super(InvalidProjectPlateausGeometriesException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
