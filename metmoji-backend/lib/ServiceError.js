export default class ServiceError {
  constructor(message, statusCode=500) {
    this.message = message
    this.statusCode = statusCode
  }
}
