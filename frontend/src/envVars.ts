const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL
    return url
}

export { getApiUrl }
