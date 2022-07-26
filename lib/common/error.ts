export class ErrorWithDetails extends Error {
  details: any;
  constructor(msg, details) {
    super(msg);
    this.details = details;
  }
}
