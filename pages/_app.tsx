import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'next-auth/client'
import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Snippet Code</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js"></script>
      </Provider>
    </>
  )
}

export default App
