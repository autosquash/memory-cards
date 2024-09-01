import { BackendUser, Game } from './types'

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number'
}

const isBoolean = (value: unknown): value is boolean => {
    return typeof value === 'boolean'
}

const isString = (value: unknown): value is string => {
    return typeof value === 'string'
}
const isObject = (value: unknown): value is NonNullable<object> => {
    return Boolean(value) && typeof value === 'object'
}

const isGame = (maybeGame: unknown): maybeGame is Game => {
    return (
        isObject(maybeGame) &&
        'gameIndex' in maybeGame &&
        'isWin' in maybeGame &&
        'numberOfCards' in maybeGame &&
        isNumber(maybeGame.gameIndex) &&
        isBoolean(maybeGame.isWin) &&
        isNumber(maybeGame.numberOfCards)
    )
}
const isBackendUser = (maybeUser: unknown): maybeUser is BackendUser => {
    return (
        isObject(maybeUser) &&
        'name' in maybeUser &&
        'score' in maybeUser &&
        'recentGamesPlayed' in maybeUser &&
        isString(maybeUser.name) &&
        isNumber(maybeUser.score) &&
        Array.isArray(maybeUser.recentGamesPlayed) &&
        maybeUser.recentGamesPlayed.every(isGame)
    )
}
const areBackendUsers = (maybeUsers: unknown): maybeUsers is BackendUser[] => {
    if (!Array.isArray(maybeUsers)) {
        return false
    }
    return maybeUsers.every(isBackendUser)
}
export { areBackendUsers }
