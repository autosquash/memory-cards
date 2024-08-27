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
    const setNavState = (newPage: Page, user: string | null = null) => {
        setCurrentUserName(user)
        setPage(newPage)
    }
    return { navData: { page, userName: currentUserName }, setNavState }
}

export default useNav
