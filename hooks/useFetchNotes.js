import { useSWRInfinite } from 'swr'
import axios from '../services/axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const PAGE_LIMIT = 5

const useFetchNotes = (path) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const { data, size, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // reached the end
      if (previousPageData && !previousPageData.data) return null
      // first page, we don't have `previousPageData`
      if (pageIndex === 0) return `${path}?page=1&limit=${PAGE_LIMIT}`
      // add the cursor to the API endpoint
      return `${path}?page=${pageIndex + 1}&limit=${PAGE_LIMIT}`
    },
    fetcher
  )

  let notes = []

  if (data) {
    notes = []
    for (const pageData of data) {
      notes = [...notes, ...pageData.data.data]
    }
  }
  const isLoadingInitialData = !data && !error
  return {
    data,
    notes,
    error,
    size,
    isLoadingInitialData,
    setSize,
    tamanho: notes.length
  }
}

export default useFetchNotes
