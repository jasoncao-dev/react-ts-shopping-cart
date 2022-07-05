import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {
    const [response, setResponse] = useState<any>()
    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const data = await res.json()
                setResponse(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { response, error, loading }
}