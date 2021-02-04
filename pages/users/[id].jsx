import { useRouter } from 'next/router'
import React from 'react'
import useFetch from '../../hooks/useFetch'

const NameComponent = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useFetch('users/' + id)

  if (!data) return <>Carregando...</>

  return (
    <>
      <ul>
        <li>ID: {data?.id}</li>
        <li>Name: {data?.name}</li>
      </ul>
    </>
  )
}

export default NameComponent
