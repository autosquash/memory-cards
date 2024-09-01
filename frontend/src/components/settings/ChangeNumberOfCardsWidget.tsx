import i18n from '../../i18n'

type SelectOption = '2' | '3'

const initialNumberOfCardsValue = 2

interface Props {
    automaticMode: boolean
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    setAutomaticMode: (value: boolean) => void
}

const ChangeNumberOfCardsWidget = ({
    automaticMode,
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
    setAutomaticMode,
}: Props) => {
    return (
        <div>
            <h3>{i18n.t('NumberOfCards')}</h3>
            <select
                value={automaticMode ? 'automatic' : numberOfCardsToRemember}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const shouldBeAutomatic = e.target.value === 'automatic'
                    const numberOfCards = shouldBeAutomatic
                        ? initialNumberOfCardsValue
                        : parseInt(e.target.value as SelectOption)
                    setAutomaticMode(shouldBeAutomatic)
                    setNumberOfCardsToRemember(numberOfCards)
                }}
            >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="automatic">{i18n.t('Automatic')}</option>
            </select>
        </div>
    )
}
export default ChangeNumberOfCardsWidget
