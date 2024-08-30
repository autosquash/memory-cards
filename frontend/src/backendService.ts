import axios from 'axios'
import { getApiUrl } from './envVars'
import { BackendUser, User } from './types'

const getUsersApi = '/users'
const addUserApi = '/users/add'
const updateUsersApi = '/users/update'

const getUsers = async (): Promise<Map<string, User> | null> => {
    let usersMap: Map<string, User> | null = null
    await axios
        .get(getApiUrl() + getUsersApi)
        .then((response) => {
            const fetchedUsers = response.data as BackendUser[]
            usersMap = new Map<string, User>()
            for (const fetchedUser of fetchedUsers) {
                const user: User = { ...fetchedUser, recentGamesPlayed: [] }
                usersMap.set(user.name, user)
            }
        })
        .catch((error) => console.error('Error fetching users:', error))
    return usersMap
}

const addUser = async (
    newName: string
): Promise<
    | { ok: true; error: null }
    | { ok: false; error: { err_code: string | null } }
> => {
    await axios
        .post(getApiUrl() + addUserApi, { name: newName })
        .catch((error) => {
            const errData: { err_code: string } | null = error.response?.data
            if (errData !== null && 'err_code' in errData) {
                return { ok: false, error: { err_code: errData.err_code } }
            } else {
                return { ok: false, error: { err_code: null } }
            }
        })
    return { ok: true, error: null }
}
const updateUsers = async (usersMap: ReadonlyMap<string, User>) => {
    axios.post(getApiUrl() + updateUsersApi, {
        users: toBackendUsers(usersMap),
    })
}

const toBackendUsers = (
    usersMap: ReadonlyMap<string, User>
): ReadonlyArray<BackendUser> => {
    return Array.from(usersMap.values()).map((user) => ({
        name: user.name,
        score: user.score,
    }))
}
export default { getUsers, addUser, updateUsers }
