import { useSWRInfinite } from 'swr'
import axios from '../services/axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const PAGE_LIMIT = 5

const useFetchNotesByCategoryName = (path) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const { data, size, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.data) return null

      if (pageIndex === 0) return `${path}?limit=${PAGE_LIMIT}`

      return `${path}?page=${pageIndex + 1}&limit=${PAGE_LIMIT}`
    },
    fetcher
  )

  let notes = []

  if (data) {
    notes = []
    for (const pageData of data) {
      if (pageData.data) {
        notes = [...notes, ...pageData.data.notes]
      }
    }
  }

  const isLoadingInitialData = !data && !error

  return {
    notes,
    error,
    size,
    isLoadingInitialData,
    setSize,
    data
  }
}

export default useFetchNotesByCategoryName
