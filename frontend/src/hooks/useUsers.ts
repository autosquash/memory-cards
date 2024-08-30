import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import backendService from '../backendService'
import { Game, User } from '../types'

const ERR_USERNAME_NOT_VALID = 'ERR_USERNAME_NOT_VALID'
const ERR_USER_ALREADY_EXISTS = 'ERR_USER_ALREADY_EXISTS'

const useUsers = () => {
    const { t } = useTranslation()
    const [usersMap, setUsersMap] = useState<null | ReadonlyMap<string, User>>(
        null
    )

    const [createUserErr, setCreateUserErr] = useState<string | null>(null)
    const getMessageFromErrCode = (
        errCode: string | null,
        newName: string
    ): string => {
        switch (errCode) {
            case ERR_USERNAME_NOT_VALID:
                return t('user name not valid', { name: newName })
            case ERR_USER_ALREADY_EXISTS:
                return t('user already exists', { user: newName })
            default:
                return t('unknown error')
        }
    }
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
            newMap.set(newName, {
                name: newName,
                score: 0,
                recentGamesPlayed: [],
            })
            setUsersMap(newMap)
        } else {
            const error = result.error!
            if (error.err_code) {
                setCreateUserErr(getMessageFromErrCode(error.err_code, newName))
            } else {
                setCreateUserErr(getMessageFromErrCode(null, newName))
                console.error(error)
            }
        }
    }
    const addGame = (
        userName: string,
        game: Game,
        numberOfCardsToRemember: number
    ) => {
        if (!usersMap) {
            throw new Error("Can't add game if there are no users")
        }
        const user = usersMap!.get(userName)!
        const modifiedUser: User = {
            ...user,
            score: user.score + (game.isWin ? numberOfCardsToRemember : 0),
            recentGamesPlayed: [...user.recentGamesPlayed, game],
        }
        const newUsersMap = new Map(usersMap)
        newUsersMap.set(user.name, modifiedUser)
        setUsersMap(newUsersMap)
        backendService.updateUsers(newUsersMap)
    }
    return {
        usersMap,
        commitUser,
        createUserErr,
        addGame,
    }
}

export default useUsers
