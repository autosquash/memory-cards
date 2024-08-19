import useNames from '../hooks/useNames'
import './WelcomeScreen.css'

const WelcomeScreen = () => {
    const { userNames, newUserName, commitUser, setNewUserName } = useNames()

    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        commitUser(newUserName)
    }
    return (
        <div>
            <h3>Who are you?</h3>
            <div>
                {userNames !== null ? (
                    <ul>
                        {userNames.map((name, index) => (
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
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Add a new user..."
                />
                <button type="submit">Add new user</button>
            </form>
        </div>
    )
}

export default WelcomeScreen
