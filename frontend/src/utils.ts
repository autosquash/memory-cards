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

export const repr = JSON.stringify
