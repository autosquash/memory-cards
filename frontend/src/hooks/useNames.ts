import axios from 'axios'
import { useEffect, useState } from 'react'

const url = 'http://127.0.0.1:5000'
const names_api = url + '/names'
const useNames = () => {
    const [names, setNames] = useState<null | string[]>(null)
    const [newName, setNewName] = useState<string>('')
    useEffect(() => {
        axios
            .get(names_api)
            .then((response) => setNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
    }, [])
    const addName = (newName: string) => {
        if (!newName.trim()) {
            return
        }
        axios
            .post(names_api, { name: newName })
            .then(() => {
                setNames([...(names || []), newName])
                setNewName('')
            })
            .catch((error) => console.error('Error adding name:', error))
    }
    return { names, newName, addName, setNewName }
}

export default useNames
