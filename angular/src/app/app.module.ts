import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SubscriptionDataHandlerService} from "./services/subscription-data-handler.service";
import {DATA_HANDLERS} from "./providers/data-handlers";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as Sentry from "@sentry/angular-ivy";
import {Router} from "@angular/router";


const dataHandlers = [
  SubscriptionDataHandlerService
]
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    dataHandlers,
    dataHandlers.map(type => ({ provide: DATA_HANDLERS, useExisting: type, multi: true })),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ]
})
export class AppModule {}
