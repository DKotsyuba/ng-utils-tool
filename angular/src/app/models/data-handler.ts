import {Action} from "../../../../shared/actions";

export interface DataHandler {
  next(action: Action<any>): void
}
