import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BackendUser, Game, User } from '../types'

const url = 'http://127.0.0.1:5000'

const getUsersApi = url + '/users'
const addUserApi = url + '/users/add'
const updateUsersApi = url + '/users/update'

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
        axios
            .get(getUsersApi)
            .then((response) => {
                const fetchedUsers = response.data as BackendUser[]
                const usersMap = new Map<string, User>()
                for (const fetchedUser of fetchedUsers) {
                    const user: User = { ...fetchedUser, recentGamesPlayed: [] }
                    usersMap.set(user.name, user)
                }
                setUsersMap(usersMap)
            })
            .catch((error) => console.error('Error fetching users:', error))
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
    const commitUser = (newName: string) => {
        if (!newName.trim()) {
            return
        }
        axios
            .post(addUserApi, { name: newName })
            .then(() => {
                const newMap = new Map(usersMap)
                newMap.set(newName, {
                    name: newName,
                    score: 0,
                    recentGamesPlayed: [],
                })
                setUsersMap(newMap)
            })
            .catch((error) => {
                const errData = error.response?.data
                if (errData !== null && 'err_code' in errData) {
                    setCreateUserErr(
                        getMessageFromErrCode(errData.err_code, newName)
                    )
                } else {
                    setCreateUserErr(getMessageFromErrCode(null, newName))
                    console.error(error)
                }
            })
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
        axios.post(updateUsersApi, {
            users: toBackendUsers(newUsersMap),
        })
    }
    return {
        usersMap,
        commitUser,
        createUserErr,
        addGame,
    }
}

const toBackendUsers = (
    usersMap: ReadonlyMap<string, User>
): ReadonlyArray<BackendUser> => {
    return Array.from(usersMap.values()).map((user) => ({
        name: user.name,
        score: user.score,
    }))
}

export default useUsers
