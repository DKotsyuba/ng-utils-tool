import {Action} from "./actions";

export function deserialize(action: Action<any>): Action<any> {
    return {
        ...action,
        payload: JSON.parse(action.payload ?? null)
    }
}

export function serialize(action: Action<any>): Action<any> {
    return {
        ...action,
        payload: JSON.stringify(action.payload, (_, value) => {
            if (typeof value === "bigint") return value.toString() + 'n';
            return value
        })
    }
}
