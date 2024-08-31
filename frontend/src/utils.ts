export function check(
    value: unknown,
    msg: (() => string) | string = ''
): asserts value {
    // Asserts value is truthy and validate it at type checking level
    if (value) {
        return
    }
    if (msg instanceof Function) {
        msg = msg()
    }
    throw new Error(msg || 'assertion error')
}

export const repr = (obj: unknown): string => {
    // Only works for maps if there are the top level item
    // For example, an object containing a Map as property
    // is going to default to JSON.stringify()
    if (obj instanceof Map) return strMapToObj(obj)
    return JSON.stringify(obj)
}

function strMapToObj(strMap: Map<string, unknown>) {
    const obj = Object.create(null)
    for (const [k, v] of strMap) {
        obj[k] = v
    }
    return obj
}

export function arrayEquals(a: unknown[], b: unknown[]) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error('Both arguments should be arrays')
    }
    return a.length === b.length && a.every((val, index) => val === b[index])
}
