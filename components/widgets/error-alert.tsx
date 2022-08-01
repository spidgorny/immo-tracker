import { Alert } from "react-bootstrap";
import * as React from "react";
import util from "util";

export function ErrorDanger({
  error,
  className,
}: {
  error: Error;
  className?: string;
}) {
  if (!error) {
    return null;
  }
  return (
    <Alert variant={"danger"} className={className}>
      {String(error?.message ?? error)}
    </Alert>
  );
}

export default function ErrorAlert({ error, className, children, debug }) {
  return error || children ? (
    <div className={"alert alert-warning " + className}>
      <div className="fw-bold">
        {error?.name && <>[{error.name ?? "Error"}]</>}{" "}
        {error?.message ?? error}
        {debug && error ? util.format(error) : null} {children}
      </div>
      {debug && <pre>{error.stack}</pre>}
    </div>
  ) : null;
}

export function TinyErrorAlert({ error, className, children }) {
  return error || children ? (
    <div className={"alert py-0 alert-danger " + className}>
      <div className="fw-bold">{error?.message && <>{error.message}</>}</div>
    </div>
  ) : null;
}
