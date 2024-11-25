export class InvalidProjectLimitsGeometriesException extends Error {
  public static message = 'Invalid project limits geometries'

  constructor() {
    super(InvalidProjectLimitsGeometriesException.message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
