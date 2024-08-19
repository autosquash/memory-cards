import { useState } from 'react'

interface NavData {
    page: string
    userName: string | null
}

const useNav = (): {
    navData: NavData
    setActiveUser: (user: string | null) => void
} => {
    const [page, setPage] = useState('home')
    const [currentUserName, setCurrentUserName] = useState<string | null>(null)
    const setActiveUser = (user: string | null) => {
        if (user == null) {
            setPage('home')
            setCurrentUserName(null)
        } else {
            setPage('start-page')
            setCurrentUserName(user)
        }
    }
    return { navData: { page, userName: currentUserName }, setActiveUser }
}

export default useNav
