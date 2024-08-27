const APP_KEY = 'memory-cards'

const useStorage = () => {
    const getStorageDict = () => {
        const jsonData = window.localStorage.getItem(APP_KEY) || '{}'
        return JSON.parse(jsonData)
    }
    const read = (key: string): unknown => {
        const data = getStorageDict()
        return data[key]
    }
    const write = (key: string, value: unknown): void => {
        const data = getStorageDict()
        data[key] = value
        const jsonData = JSON.stringify(data)
        window.localStorage.setItem(APP_KEY, jsonData)
    }
    return { read, write }
}
export default useStorage
