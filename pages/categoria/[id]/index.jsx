import Head from 'next/head'
import React from 'react'
import ResponsiveDrawer from '../../../components/Index'
import { ContextProvider } from '../../../contexts/contexto'
import FindNotesByCategoryName from '../../../components/Snippet/FindNotesByCategoryName'
import axios from '../../../services/axios'

const App = ({ data }) => {
  const { category_name, category_icon } = data.data
  return (
    <ContextProvider>
      <Head>
        <title>
          {category_name.toUpperCase()} - Snippets Codes - Ganhe tempo e seja
          mais produtivo
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Precisa de tempo? Use o Snippets Codes, ganhe tempo e seja mais produtivo."
        />

        <meta
          name="twitter:image:src"
          content={
            process.env.NEXT_PUBLIC_BASE_URL_API_REST +
            '/images/' +
            category_icon
          }
        />
        <meta name="twitter:site" content="@snippetscodes" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${category_name.toUpperCase()} - Snippets Codes - Ganhe tempo e seja mais produtivo`}
        />
        <meta
          name="twitter:description"
          content="Precisa de tempo? Use o Snippets Codes, ganhe tempo e seja mais produtivo."
        />
        <meta
          property="og:image"
          content={
            process.env.NEXT_PUBLIC_BASE_URL_API_REST +
            '/images/' +
            category_icon
          }
        />
        <meta property="og:site_name" content="Snippets Codes" />
        <meta property="og:type" content="site" />
        <meta
          property="og:title"
          content={`${category_name.toUpperCase()} - Snippets Codes - Ganhe tempo e seja mais produtivo`}
        />
        <meta
          property="og:description"
          content="Precisa de tempo? Use o Snippets Codes, ganhe tempo e seja mais produtivo."
        />
      </Head>
      <ResponsiveDrawer>
        <FindNotesByCategoryName />
      </ResponsiveDrawer>
    </ContextProvider>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get('category/' + params.id)
  return {
    props: {
      data: res.data
    }
  }
}

export default App
