import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './NamesListing.module.css'

interface Props {
    userNames: string[] | null
    onUserSelection: (name: string) => void
}

const NamesListing = ({ userNames, onUserSelection }: Props) => {
    const { t } = useTranslation()
    const handleChooseUser = (
        _: React.MouseEvent<HTMLElement>,
        name: string
    ) => {
        onUserSelection(name)
    }
    return (
        <div className={styles.namesListContainer}>
            {userNames !== null ? (
                <ul className={styles.namesList}>
                    {userNames.length ? (
                        userNames.map((name, index) => (
                            <li key={index}>
                                <button
                                    className={styles.userButton}
                                    onClick={(event) =>
                                        handleChooseUser(event, name)
                                    }
                                >
                                    <span className={styles.name}>{name}</span>
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>{t('No users yet')}</p>
                    )}
                </ul>
            ) : (
                <p>{t('Waiting...')}</p>
            )}
        </div>
    )
}

export default NamesListing
