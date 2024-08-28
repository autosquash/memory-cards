import React from 'react'
import { useTranslation } from 'react-i18next'
import './NamesListing.css'

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
        <div className="NamesListing_names-list-container">
            {userNames !== null ? (
                <ul className="NamesListing_names-list">
                    {userNames.length ? (
                        userNames.map((name, index) => (
                            <li key={index}>
                                <button
                                    className="NamesListing_user-button"
                                    onClick={(event) =>
                                        handleChooseUser(event, name)
                                    }
                                >
                                    <span className="NamesListing_name">
                                        {name}
                                    </span>
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
