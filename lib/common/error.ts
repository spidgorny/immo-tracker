export class ErrorWithDetails extends Error {
  details: any;
  constructor(msg, details) {
    super(msg);
    this.details = details;
  }
}

export class Warning extends Error {
  statusCode: number;
  constructor(message, code = 400) {
    super(message);
    this.statusCode = code;
  }
}

// does not include words "Invariant failed"
export function myInvariant(check, message) {
  if (!check) {
    throw new Error(message);
  }
}
