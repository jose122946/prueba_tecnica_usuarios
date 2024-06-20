export class ValidationError extends Error {
    constructor(zodResponse, message, statusCode) {
      super(message);
      this.zodResponse = zodResponse;
      this.statusCode = statusCode;
    }
  }
