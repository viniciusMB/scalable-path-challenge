export class CustomValidationException extends Error {
  constructor(public validationErrors: string[]) {
    super('Validation failed');
  }
}
