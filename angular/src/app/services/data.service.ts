import {ApplicationRef, Inject, Injectable} from '@angular/core';
import {Action, initTool} from "../../../../shared/actions";
import {TAB_ID} from "../providers/tab-id.provider";
import {DATA_HANDLERS} from "../providers/data-handlers";
import {DataHandler} from "../models/data-handler";
import {deserialize} from "../../../../shared/data";

@Injectable()
export class DataService {

  private isScheduleTik = false;
  constructor(private appRef: ApplicationRef,
              @Inject(TAB_ID) private tabId: number,
              @Inject(DATA_HANDLERS) private dataHandlers: DataHandler[]) {
  }

  init() {
    this.connect()
  }

  protected connect() {
    const bg = chrome.runtime.connect(chrome.runtime.id, { name: 'tool' })
    bg.onMessage.addListener(action => {
      const deserializeAction = deserialize(action)
      this.next(deserializeAction)
      this.tick()
    })
    bg.postMessage(initTool(this.tabId))
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
