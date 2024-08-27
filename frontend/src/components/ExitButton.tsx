import { useTranslation } from 'react-i18next'
import { SetNavState } from '../types'

interface Props {
    setNavState: SetNavState
}

const ExitButton = ({ setNavState }: Props) => {
    const { t } = useTranslation()
    return (
        <button className="exit-button" onClick={() => setNavState('home')}>
            {t('Exit')}
        </button>
    )
}

export default ExitButton
