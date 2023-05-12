import {Action, buildResponseAction, loadSourceMap} from "../../shared/actions";
import {sourceMapHandler} from "./bg-handlers/source-map.handler";

export async function handle(action: Action<any>): Promise<Action<any>> {
  const type = action.type
  const handler = handlersMap[type]
  if (!handler) {
    console.warn(`No handler for action type ${type}`)
    return buildResponseAction(action, null)
  }
  try {
    const newPayload = await handler(action.payload)
    return buildResponseAction(action, newPayload)
  } catch (e) {
    console.error(e)
    return buildResponseAction(action, null)
  }
}

const handlersMap = {
  [loadSourceMap.type]: sourceMapHandler,
}
