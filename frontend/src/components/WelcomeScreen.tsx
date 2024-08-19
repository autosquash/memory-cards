import useNames from '../hooks/useNames'
import './WelcomeScreen.css'

const WelcomeScreen = () => {
    const { names, newName, addName, setNewName } = useNames()

    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        addName(newName)
    }
    return (
        <div>
            <h3>Who are you?</h3>
            <div>
                {names !== null ? (
                    <ul>
                        {names.map((name, index) => (
                            <li key={index}>
                                <button className="user-button">
                                    <span className="name">{name}</span>
                                </button>
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
