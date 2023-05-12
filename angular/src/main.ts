import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TAB_ID } from './app/providers/tab-id.provider';
import * as Sentry from "@sentry/angular-ivy";

Sentry.init({
  dsn: "https://d82ba3fff18b4f019766897e7c358ea6@o401649.ingest.sentry.io/4505171149651968",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  try {
    if (environment.production) {
      enableProdMode();
    }

    const { id: tabId } = tabs[0];

    // provides the current Tab ID so you can send messages to the content page
    platformBrowserDynamic([{ provide: TAB_ID, useValue: tabId }])
      .bootstrapModule(AppModule)
      .catch(error => console.error(error));
  } catch (err) {
  }
});
