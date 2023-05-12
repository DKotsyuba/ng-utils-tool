export interface Action<P> {
    type: string
    isNgUtilsTool: true
    id: string
    response: boolean
    payload?: P
}

export interface ActionFactory<P> {
    type: string
    (payload?: P): Action<P>
}

let id = 0

function getActionId() {
    return [Date.now(), id++].join(':')
}

export function buildAction<P>(type: string): ActionFactory<P> {
    const factory = function (payload) {
        return { payload, type, isNgUtilsTool: true, response: true, id: getActionId() }
    }
    factory.type = type
    return factory as any
}

export function buildResponseAction<I, R>(action: Action<I>, newPayload: R): Action<R> {
    return { ...action, payload: newPayload, response: false }
}

export type CallData = {
    errorText: string
    isComplete: boolean
    spaceName: string
    timestamp: number
    callStack: string[][]
    complexity: number
    next?: any
    error?: any
}

export const initLib = buildAction<number>('initLib')
export const initTool = buildAction<number>('initTool')
export const reset = buildAction<void>('reset')
export const subscribe = buildAction<CallData>('subscribe')
export const subscribeUpdate = buildAction<CallData>('subscribeUpdate')
export const destroySpace = buildAction<string>('destroySpace')

export const loadSourceMap = buildAction<[string, number]>('loadSourceMap')
