import { useEffect, useState, useDebugValue } from 'react'
import axios from 'axios'

interface Details {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

type Fetch = (
  url: string
) => {
  details: null | Details[]
  loading: boolean
  error: null | string
}

async function getPokemon(url, setDetails, setLoading, setError) {
  try {
    const { data } = await axios.get(url)
    setDetails(data)
    setLoading(false)
    // console.log(data)
  } catch (error) {
    setError('error')
  }
}

const useGetPokemon: Fetch = (url) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPokemon(url, setDetails, setLoading, setError)
    return () => {
      setDetails(null)
      setLoading(true)
      setError(null)
    }
  }, [url])

  useDebugValue('fetchDetails' ?? 'loading...')

  return { details, loading, error }
}
export default useGetPokemon
