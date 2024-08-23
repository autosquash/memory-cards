import React from 'react'
import { useTranslation } from 'react-i18next'

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
        <div className="names-list-container">
            {userNames !== null ? (
                <ul className="names-list">
                    {userNames.length ? (
                        userNames.map((name, index) => (
                            <li key={index}>
                                <button
                                    className="user-button"
                                    onClick={(event) =>
                                        handleChooseUser(event, name)
                                    }
                                >
                                    <span className="name">{name}</span>
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
