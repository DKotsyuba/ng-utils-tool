import {Action, initTool} from "../../shared/actions";

const portsToolMap: Map<number, chrome.runtime.Port> = new Map()
const actionsMap: Map<number, Action<any>[]> = new Map()
function handleMessageFromLib(tabId: number, action: Action<any>) {
    if (portsToolMap.has(tabId)) {
        const port = portsToolMap.get(tabId)
        port.postMessage(action)
        return
    }
    actionsMap.get(tabId).push(action)
}

function sendAll(tabId: number) {
    const actions = actionsMap.get(tabId)
    if (!actions) return
    const port = portsToolMap.get(tabId)
    if (!port) return
    actions.forEach(action => port.postMessage(action))
    actionsMap.delete(tabId)
}

function handleConnect(port: chrome.runtime.Port) {
    const tabId = port.sender?.tab?.id
    if (port.name === 'lib') {
        actionsMap.set(tabId, [])
        port.onMessage.addListener(action => handleMessageFromLib(tabId, action))
        port.onDisconnect.addListener(() => actionsMap.delete(tabId))
    }
    if (port.name === 'tool') {
        port.onMessage.addListener(action => {
            if (action.type === initTool.type) {
                const tabId = action.payload
                portsToolMap.set(tabId, port)
                sendAll(tabId)
                port.onDisconnect.addListener(() => portsToolMap.delete(tabId))
            }
        })
    }
}

chrome.runtime.onConnect.addListener(handleConnect)
