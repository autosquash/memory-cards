import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const url = 'http://127.0.0.1:5000'
const userNamesApi = url + '/names'
const ERR_USERNAME_NOT_VALID = 'ERR_USERNAME_NOT_VALID'
const ERR_USER_ALREADY_EXISTS = 'ERR_USER_ALREADY_EXISTS'

const useNames = () => {
    const { t } = useTranslation()
    const [userNames, setUserNames] = useState<null | string[]>(null)
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
            .get(userNamesApi)
            .then((response) => setUserNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
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
            .post(userNamesApi, { name: newName })
            .then(() => {
                setUserNames([...(userNames || []), newName])
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
    return {
        userNames,
        newUserName,
        commitUser,
        setNewUserName,
        createUserErr,
    }
}

export default useNames
