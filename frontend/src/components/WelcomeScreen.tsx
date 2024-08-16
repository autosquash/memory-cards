import axios from 'axios'
import { useEffect, useState } from 'react'
import './WelcomeScreen.css'

const url = 'http://127.0.0.1:5000'
const WelcomeScreen = () => {
    const [names, setNames] = useState<null | string[]>(null)
    const [newName, setNewName] = useState<string>('')
    useEffect(() => {
        axios
            .get(url + '/names')
            .then((response) => setNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
    }, [])
    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!newName.trim()) {
            return
        }
        axios
            .post(url + '/names', { name: newName })
            .then(() => {
                setNames([...(names || []), newName])
                setNewName('')
            })
            .catch((error) => console.error('Error adding name:', error))
    }
    return (
        <div>
            <h3>Names:</h3>
            <div>
                {names !== null ? (
                    <ul>
                        {names.map((name, index) => (
                            <li key={index}>
                                <span className="name">{name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Waiting...</p>
                )}
            </div>
            <form onSubmit={handleAddName}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Add a new user..."
                />
                <button type="submit">Add new user</button>
            </form>
        </div>
    )
}

export default WelcomeScreen
