import { useTranslation } from 'react-i18next'
import styles from './AddUserForm.module.css'

interface Props {
    newUserName: string
    commitUser: (newName: string) => void
    setNewUserName: (newName: string) => void
}

function AddUserForm({ commitUser, newUserName, setNewUserName }: Props) {
    const { t } = useTranslation()
    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        commitUser(newUserName)
    }
    return (
        <>
            <p>{t('call to register')}</p>
            <form className={styles.name} onSubmit={handleAddName}>
                <input
                    type="text"
                    name="user-name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={t('Your name')}
                />
                <button
                    type="submit"
                    className={styles.addMeButton}
                    disabled={!newUserName.trim()}
                >
                    {t('Add me')}{' '}
                </button>
            </form>
        </>
    )
}

export default AddUserForm
