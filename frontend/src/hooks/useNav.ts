import { useState } from 'react'
import { Page, SetNavState } from '../types'

interface NavData {
    page: Page
    userName: string | null
}

const useNav = (): {
    navData: NavData
    setNavState: SetNavState
} => {
    const [page, setPage] = useState<Page>('home')
    const [currentUserName, setCurrentUserName] = useState<string | null>(null)
    const setNavState = (user: string | null) => {
        if (user == null) {
            setPage('home')
            setCurrentUserName(null)
        } else {
            setCurrentUserName(user)
            setPage('start-page')
        }
    }
    return { navData: { page, userName: currentUserName }, setNavState }
}

export default useNav
