import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BackendUser, Game, User } from '../types'

const url = 'http://127.0.0.1:5000'
const getUsersApi = url + '/users'
const addUserApi = url + '/users/add'

const ERR_USERNAME_NOT_VALID = 'ERR_USERNAME_NOT_VALID'
const ERR_USER_ALREADY_EXISTS = 'ERR_USER_ALREADY_EXISTS'

const useUsers = () => {
    const { t } = useTranslation()
    const [usersMap, setUsersMap] = useState<null | ReadonlyMap<string, User>>(
        null
    )
    const [newUserName, setNewUserName] = useState<string>('')
    const [createUserErr, setCreateUserErr] = useState<string | null>(null)
    const getMessageFromErrCode = (errCode: string | null): string => {
        switch (errCode) {
            case ERR_USERNAME_NOT_VALID:
                return t('user name not valid', { name: newUserName })
            case ERR_USER_ALREADY_EXISTS:
                return t('user already exists', { user: newUserName })
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
            setNewUserName('')
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
                setNewUserName('')
            })
            .catch((error) => {
                const errData = error.response?.data
                if (errData !== null && 'err_code' in errData) {
                    setCreateUserErr(getMessageFromErrCode(errData.err_code))
                } else {
                    setCreateUserErr(getMessageFromErrCode(null))
                    console.error(error)
                }
            })
    }
    const addGame = (
        userName: string,
        game: Game,
        numberOfCardsToRemember: number
    ) => {
        const user = usersMap!.get(userName)!
        const modifiedUser: User = {
            ...user,
            score: user.score + (game.isWin ? numberOfCardsToRemember : 0),
            recentGamesPlayed: [...user.recentGamesPlayed, game],
        }
        const newUsersMap = new Map(usersMap)
        newUsersMap.set(user.name, modifiedUser)
        setUsersMap(newUsersMap)
    }
    return {
        usersMap,
        newUserName,
        commitUser,
        setNewUserName,
        createUserErr,
        addGame,
    }
}

export default useUsers
