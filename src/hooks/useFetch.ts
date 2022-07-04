import React, { useState, useEffect } from 'react'
import Item from '../models/Item'

export const useFetch = (url: string) => {
    const [response, setResponse] = useState<Item | Array<Item>>()
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            
        }
    }, [url])
}