import * as Sentry from "@sentry/browser";

export function safeContext(fn) {
  try {
    fn()
  } catch (e) {
    Sentry.captureException(e);
  }
}
