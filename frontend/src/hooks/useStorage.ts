const APP_KEY = 'memory-cards'

const useStorage = () => {
    const _getStorageDict = () => {
        const jsonData = window.localStorage.getItem(APP_KEY) || '{}'
        return JSON.parse(jsonData)
    }
    const _saveStorageDict = (data: unknown) => {
        const jsonData = JSON.stringify(data)
        window.localStorage.setItem(APP_KEY, jsonData)
    }
    const read = (key: string): unknown => {
        const data = _getStorageDict()
        return data[key]
    }
    const write = (key: string, value: unknown): void => {
        const data = _getStorageDict()
        data[key] = value
        _saveStorageDict(data)
    }
    return { read, write }
}
export default useStorage
