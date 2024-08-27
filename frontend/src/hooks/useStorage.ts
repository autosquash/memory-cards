const useStorage = () => {
    const read = (key: string): unknown => {
        const jsonData = window.localStorage.getItem('memory-cards')
        if (!jsonData) {
            return null
        }
        const data = JSON.parse(jsonData)
        return data[key]
    }
    const write = (key: string, value: unknown): void => {
        let jsonData = window.localStorage.getItem('memory-cards') || '{}'
        const data = JSON.parse(jsonData)
        data[key] = value
        jsonData = JSON.stringify(data)
        window.localStorage.setItem('memory-cards', jsonData)
    }
    return { read, write }
}
export default useStorage
