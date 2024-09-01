import { BackendUser } from './types'

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number'
}

const isString = (value: unknown): value is string => {
    return typeof value === 'string'
}
const isObject = (value: unknown): value is NonNullable<object> => {
    return Boolean(value) && typeof value === 'object'
}

const isBackendUser = (maybeUser: unknown): maybeUser is BackendUser => {
    return (
        isObject(maybeUser) &&
        'name' in maybeUser &&
        'score' in maybeUser &&
        isString(maybeUser.name) &&
        isNumber(maybeUser.score)
    )
}
const areBackendUsers = (maybeUsers: unknown): maybeUsers is BackendUser[] => {
    if (!Array.isArray(maybeUsers)) {
        return false
    }
    return maybeUsers.every(isBackendUser)
}
export { areBackendUsers }
