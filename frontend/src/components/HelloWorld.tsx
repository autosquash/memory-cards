import axios from 'axios'
import { useEffect, useState } from 'react'
import './HelloWorld.css'

const url = 'http://127.0.0.1:5000'

const HelloWorld = () => {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        axios
            .get(url + '/api/data')
            .then((response) => setMsg(response.data.message))
            .catch((error) => console.error('Error fetching msg:', error))
    }, [])

    return (
        <div>
            <h1>Hello</h1>
            <p>
                We have a message from the backend:{' '}
                <span className="msg">{msg}</span>
            </p>
        </div>
    )
}

export default HelloWorld
