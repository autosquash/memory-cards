import { useEffect, useState } from 'react'
import backendService from '../backendService'
import i18n from '../i18n'
import { Game, User } from '../types'

const ERR_USERNAME_NOT_VALID = 'ERR_USERNAME_NOT_VALID'
const ERR_USER_ALREADY_EXISTS = 'ERR_USER_ALREADY_EXISTS'

const useUsers = () => {
    const [usersMap, setUsersMap] = useState<null | ReadonlyMap<string, User>>(
        null
    )
    const [createUserErr, setCreateUserErr] = useState<string | null>(null)

    useEffect(() => {
        const loadUsersFromBackend = async () => {
            const newUsersMap = await backendService.getUsers()
            if (newUsersMap) {
                setUsersMap(newUsersMap)
            }
        }
        loadUsersFromBackend()
    }, [])
    useEffect(() => {
        if (usersMap === null) {
            return
        }
        backendService.updateUsers(usersMap)
    }, [usersMap])
    useEffect(() => {
        if (createUserErr !== null) {
            const timeoutId = window.setTimeout(
                () => setCreateUserErr(null),
                3000
            )
            return () => clearTimeout(timeoutId)
        }
        return
    }, [createUserErr])
    const commitUser = async (newName: string) => {
        if (!newName.trim()) {
            return
        }
        const result = await backendService.addUser(newName)
        if (result.ok) {
            const newMap = new Map(usersMap)
            newMap.set(newName, createNewUser(newName))
            setUsersMap(newMap)
        } else {
            const errCode = result.error.err_code || null
            setCreateUserErr(getMessageFromErrCode(errCode, newName))
        }
    }
    const addGame = (
        userName: string,
        game: Game,
        numberOfCardsToRemember: number
    ) => {
        setUsersMap((usersMap) => {
            if (!usersMap) {
                throw new Error("Can't add game if there are no users")
            }
            const user = usersMap!.get(userName)!
            return new Map(usersMap).set(
                user.name,
                getUserWithAddedGame(user, game, numberOfCardsToRemember)
            )
        })
    }
    return {
        usersMap,
        commitUser,
        createUserErr,
        addGame,
    }
}
const createNewUser = (name: string) => {
    return {
        name: name,
        score: 0,
        gamesPlayed: [],
    }
}

const getUserWithAddedGame = (
    user: User,
    game: Game,
    numberOfCardsToRemember: number
): User => {
    return {
        ...user,
        score: user.score + (game.isWin ? numberOfCardsToRemember : 0),
        gamesPlayed: [...user.gamesPlayed, game],
    }
}

const getMessageFromErrCode = (
    errCode: string | null,
    newName: string
): string => {
    switch (errCode) {
        case ERR_USERNAME_NOT_VALID:
            return i18n.t('user name not valid', { name: newName })
        case ERR_USER_ALREADY_EXISTS:
            return i18n.t('user already exists', { user: newName })
        default:
            return i18n.t('unknown error')
    }
}

export default useUsers
