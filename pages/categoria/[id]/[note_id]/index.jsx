/* eslint-disable multiline-ternary */
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Skeleton from '@material-ui/lab/Skeleton'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Highlight from 'react-highlight'
import Footer from '@/components/Footer'
import api from '../../../../services/axios'

const ReactMarkdown = require('react-markdown')

const Saida = ({ descricao, codigo }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block)
      })
    }, 500)
  }, [])

  return (
    <>
      <div style={{ marginTop: 40 }}></div>
      {!descricao ? (
        <Skeleton variant="rect" height={418} />
      ) : (
        <ReactMarkdown source={descricao} escapeHtml={false} />
      )}

      <div style={{ marginTop: 40 }}></div>
      {!codigo && !isMounted ? (
        <Skeleton variant="rect" height={418} />
      ) : (
        <>
          {codigo && (
            <>
              <Highlight innerHTML={false}>{codigo}</Highlight>
            </>
          )}
        </>
      )}
    </>
  )
}

const App = props => {
  const [session] = useSession()
  const { query, isFallback } = useRouter()

  if (isFallback) {
    return 'Carregando ...'
  }

  const {
    note_code,
    note_id,
    note_description,
    note_title: titulo,
    category
  } = props.snippet

  return (
    <>
      <Head>
        <title>{'Carregando...' && titulo}</title>
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link rel="stylesheet" href="/assets/css/footer.css" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/github.min.css"
        /> */}
        <meta
          name="description"
          content="Precisa de tempo? Use o Snippets Codes, ganhe tempo e seja mais produtivo."
        />

        <meta
          name="twitter:image:src"
          content={
            process.env.NEXT_PUBLIC_BASE_URL_API_REST +
            '/images/' +
            category.category_icon
          }
        />
        <meta name="twitter:site" content="@snippetscodes" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${category.category_name.toUpperCase()} - ${titulo}`}
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
            category.category_icon
          }
        />
        <meta property="og:site_name" content="Snippets Codes" />
        <meta property="og:type" content="site" />
        <meta
          property="og:title"
          content={`${category.category_name.toUpperCase()} - Snippets Codes - Ganhe tempo e seja mais produtivo`}
        />
        <meta
          property="og:description"
          content="Precisa de tempo? Use o Snippets Codes, ganhe tempo e seja mais produtivo."
        />
      </Head>
      <header
        style={{
          background: '#222a68',
          width: '100%',
          top: 0,
          alignItems: 'center',
          position: 'fixed',
          height: 64,
          display: 'flex',
          zIndex: 9999,
          color: '#fff'
        }}
      >
        <Container>
          <Row>
            <Col xs={12} md={1} sm={1}></Col>
            <Col xs={12} md={10} sm={10}>
              <Row>
                <Col style={{ border: '0px solid red' }}>
                  <Link href={`/categoria/${query.id}/`}>
                    <a style={{ color: '#fff' }}>
                      <span className="logo">
                        <img
                          src="/assets/images/snippets-logo.png"
                          alt="logo"
                          style={{ width: 50, height: 50 }}
                        />
                        Snippets Code
                      </span>
                    </a>
                  </Link>
                </Col>
                <Col
                  style={{
                    border: '0px solid blue',
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'flex-end'
                  }}
                >
                  {session && (
                    <>
                      <Link href={`/categoria/${query.id}/${note_id}/edit`}>
                        <a className="acoes">Editar</a>
                      </Link>{' '}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={1} sm={1}></Col>
          </Row>
        </Container>
      </header>
      <div className="content">
        <Container style={{ marginTop: 100 }}>
          <Row style={{ marginTop: 20 }}>
            <Col xs={12} md={1} sm={1}></Col>
            <Col xs={12} md={10} sm={10}>
              <h1>
                {!titulo ? (
                  <Skeleton variant="rect" width={200} height={25} />
                ) : (
                  titulo
                )}
              </h1>
              <hr />

              <Chip
                title={
                  'Clique para voltar à categoria ' + category.category_name
                }
                clickable
                avatar={
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_API_REST}/images/${category.category_icon}`}
                    style={{
                      width: 25,
                      height: 25
                    }}
                  />
                }
                label={category.category_name}
                onClick={() =>
                  Router.replace(
                    `/categoria/${query.id}/`,
                    `/categoria/${query.id}/`
                  )
                }
              />
            </Col>
            <Col xs={12} md={1} sm={1}></Col>
          </Row>
          <Row>
            <Col xs={12} md={1} sm={1}></Col>
            <Col xs={12} md={10} sm={10}>
              {!titulo ? (
                <Skeleton variant="rect" height={418} />
              ) : (
                <Saida
                  titulo={titulo}
                  descricao={note_description}
                  codigo={note_code}
                />
              )}
            </Col>
            <Col xs={12} md={1} sm={1}></Col>
          </Row>
          <Row style={{ marginTop: 300 }}></Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await api.get('/notes?page=1&limit=144')

  const paths = data.data.data.map(note => {
    return {
      params: {
        id: note.category.slug,
        note_id: note.note_id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { note_id } = params

  const { data } = await api.get(`/notes/${note_id}/edit`)

  return {
    props: {
      snippet: data.data
    }
  }
}
export default App
