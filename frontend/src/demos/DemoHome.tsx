import { useTranslation } from 'react-i18next'

const DemoHome = () => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>Demos</h2>
            <p>
                {t('From here explore demos')}
                <br />({t('just use dropdown')})
            </p>
        </div>
    )
}

export default DemoHome
