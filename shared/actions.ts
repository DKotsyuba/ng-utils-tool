export interface Action<P> {
    type: string
    isNgUtilsTool: true
    payload?: P
}

export interface ActionFactory<P> {
    type: string
    (payload?: P): Action<P>
}

export function buildAction<P>(type: string): ActionFactory<P> {
    const factory = function (payload) {
        return { payload, type, isNgUtilsTool: true }
    }
    factory.type = type
    return factory as any
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
