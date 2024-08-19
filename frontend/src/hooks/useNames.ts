import axios from 'axios'
import { useEffect, useState } from 'react'

const url = 'http://127.0.0.1:5000'
const userNamesApi = url + '/names'
const useNames = () => {
    const [userNames, setUserNames] = useState<null | string[]>(null)
    const [newUserName, setNewUserName] = useState<string>('')
    useEffect(() => {
        axios
            .get(userNamesApi)
            .then((response) => setUserNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
    }, [])
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
            .catch((error) => console.error('Error adding name:', error))
    }
    return {
        userNames,
        newUserName,
        commitUser,
        setNewUserName,
    }
}

export default useNames
