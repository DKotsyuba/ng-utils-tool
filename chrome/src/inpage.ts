import {CallData, destroySpace, subscribe, subscribeUpdate} from "../../shared/actions";

class Provider {

    constructor() {
    }
    subscribe(callData: CallData) {
        window.postMessage(subscribe(callData), '*')
    }

    subscribeUpdate(callData: CallData) {
        window.postMessage(subscribeUpdate(callData), '*')
    }

    destroySpace(spaceName: string) {
        window.postMessage(destroySpace(spaceName), '*')
    }
}

(window as any).__subscription_provider__ = new Provider();
