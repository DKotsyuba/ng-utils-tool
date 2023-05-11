import {DataHandler} from "../models/data-handler";
import {Action, CallData, reset, subscribe, subscribeUpdate} from "../../../../shared/actions";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {debounceTime, map, shareReplay} from "rxjs/operators";

@Injectable()
export class SubscriptionDataHandlerService implements DataHandler {
  private readonly subsStorage: Map<string, CallData[]> = new Map()
  private readonly innerData$: Subject<void> = new Subject()

  readonly data$ = this.innerData$.pipe(
    debounceTime(0),
    map(() => Array.from(this.subsStorage.entries())),
    shareReplay({ bufferSize: 1, refCount: true })
  )

  next(action: Action<any>): void {
    this.actionHandler(action)
  }

  private actionHandler(action: Action<any>) {
    switch (action.type) {
      case subscribe.type: return this.saveToStorage(action)
      case subscribeUpdate.type: return this.updateStorage(action)
      case reset.type: return this.resetStorage()
    }
  }

  private saveToStorage(action: Action<CallData>) {
    const name = this.getNameByCallData(action.payload)
    if (!this.subsStorage.has(name)) this.subsStorage.set(name, [])
    const storage = [...this.subsStorage.get(name)]
    storage.push(action.payload)
    this.subsStorage.set(name, storage)
    this.innerData$.next()
  }

  private updateStorage(action: Action<CallData>): void {
    const name = this.getNameByCallData(action.payload)
    if (!this.subsStorage.has(name)) return this.saveToStorage(action);
    const storage = [...this.subsStorage.get(name)]
    const newData = action.payload
    const newStorage = storage.map(data => data.timestamp === newData.timestamp ? newData : data)
    this.subsStorage.set(name, newStorage)
    this.innerData$.next()
  }

  private resetStorage() {
    this.subsStorage.clear()
    this.innerData$.next()
  }

  private getNameByCallData(data: CallData) {
    return [data.spaceName, data.errorText].join('|')
  }

}
