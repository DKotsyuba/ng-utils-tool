import {ApplicationRef, Inject, Injectable} from '@angular/core';
import {Action, initTool} from "../../../../shared/actions";
import {TAB_ID} from "../providers/tab-id.provider";
import {DATA_HANDLERS} from "../providers/data-handlers";
import {DataHandler} from "../models/data-handler";
import {deserialize, serialize} from "../../../../shared/data";
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  private port: chrome.runtime.Port;

  private isScheduleTik = false;
  constructor(private appRef: ApplicationRef,
              @Inject(TAB_ID) private tabId: number,
              @Inject(DATA_HANDLERS) private dataHandlers: DataHandler[]) {
  }

  init() {
    this.connect()
  }

  send<I, R>(action: Action<I>): Observable<Action<R>> {
    return new Observable<Action<R>>(subscriber => {
      const handler = (respAction: Action<R>) => {
        if (respAction.type === action.type && respAction.id === action.id) {
          const deserializeAction = deserialize(respAction)
          subscriber.next(deserializeAction)
          subscriber.complete()
          this.port.onMessage.removeListener(handler)
        }
      }
      this.port.onMessage.addListener(handler)
      this.port.postMessage(serialize(action))
    });
  }

  protected connect() {
    this.port = chrome.runtime.connect(chrome.runtime.id, { name: 'tool' })
    this.port.onMessage.addListener(action => {
      const deserializeAction = deserialize(action)
      this.next(deserializeAction)
      this.tick()
    })
    this.port.postMessage(initTool(this.tabId))
  }

  private next(action: Action<any>): void {
    this.dataHandlers.forEach(handler => handler.next(action))
  }

  private tick() {
    if (this.isScheduleTik) return
    requestAnimationFrame(() => {
      this.isScheduleTik = false
      this.appRef.tick()
    })
    this.isScheduleTik = true
  }
}
