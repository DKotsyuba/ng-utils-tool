import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://d0803163fac14c80b1a4751fec897dab@o401649.ingest.sentry.io/4505171212304384",
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

export function safeContext(fn) {
  try {
    fn()
  } catch (e) {
    Sentry.captureException(e);
  }
}
