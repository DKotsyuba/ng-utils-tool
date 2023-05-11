import {Action, reset} from "../../shared/actions";
import {serialize} from "../../shared/data";

let isConnected = false
let bg: chrome.runtime.Port

function injectScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
}

function handlerMessage(event: MessageEvent) {
    const data = event.data as Action<any>
    if (!data.isNgUtilsTool) return
    send(data)
}

function connect() {
    if (isConnected) return
    const name = 'lib'
    try {
        bg = chrome.runtime.connect(chrome.runtime.id, { name })
        bg.onDisconnect.addListener(() => isConnected = false)
    } catch (e) {
    } finally {
        isConnected = true
        send(reset())
    }
}

function send(action: Action<any>) {
    if (!isConnected) connect()
    const serializeAction = serialize(action)
    try {
        bg?.postMessage(serializeAction)
    } catch (e) {
        if (e.message.includes('context invalidated')) return;
        console.error(e);
    }
}

(function () {
    window.addEventListener('message', handlerMessage, false)
    injectScript(chrome.runtime.getURL('/inpage.js'))
})()
