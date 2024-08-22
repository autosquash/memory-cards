import { useState } from 'react'
import Card from '../components/Card'
import './DemoCard.css'

const DemoCard = () => {
    const [cardSize, setCardSize] = useState(1)
    return (
        <div>
            <h2>Demo Card</h2>
            <div className="DemoCard_container">
                <Card shape="square" color="green" scale={cardSize} />
            </div>

            <input
                type="range"
                id="card-size"
                name="card-size"
                min="0"
                max="1"
                step="0.05"
                value={cardSize}
                onChange={(e) => {
                    setCardSize(parseFloat(e.target.value))
                    // alert(e.target.value)
                }}
            />
        </div>
    )
}

export default DemoCard
