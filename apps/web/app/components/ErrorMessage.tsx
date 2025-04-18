import * as React from "react";

import { Alert } from "@repo/ui";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export function ErrorMessage({
  error,
  title,
  className,
}: {
  error?: string | unknown;
  title?: string;
  className?: string;
}) {
  return (
    <Alert palette="danger" variant="tint" title={title} className={className}>
      {error ? <div className="space-y-3">{getErrorMessage(error)}</div> : null}
    </Alert>
  );
}
