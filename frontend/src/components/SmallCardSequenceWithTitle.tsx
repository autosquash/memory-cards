import { CardData } from '../types'
import CardSequence from './CardSequence'
import styles from './SmallCardSequenceWithTitle.module.css'

const SmallCardSequenceWithTitle = ({
    title,
    sequence,
}: {
    title: string
    sequence: ReadonlyArray<CardData>
}) => {
    return (
        <>
            <p>{title}</p>
            <div className={styles.cardSequence}>
                <CardSequence sequence={sequence} scale={0.4} />
            </div>
        </>
    )
}

export default SmallCardSequenceWithTitle
