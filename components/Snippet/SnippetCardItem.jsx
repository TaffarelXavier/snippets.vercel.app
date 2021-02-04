/* eslint-disable multiline-ternary */
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Highlight from 'react-highlight'
import { Contexto } from '../../contexts/contexto'
import api from '../../services/axios'
const ReactMarkdown = require('react-markdown')

const useStyles = makeStyles({
  grid: {
    flexGrow: 1
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0px auto',
    marginBottom: 40,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)'
  },
  media: {
    height: 140
  },
  languageNameSnippet: {
    border: '0px dashed gold',
    maxWidth: '100%',
    borderRadius: 5
  }
})

function SnippetCardItem(props) {
  const classes = useStyles()
  const { snippet, key_autoincrement, logged } = props
  const [copyButtonText, setCopyButtonText] = useState('COPIAR')
  const [expandir, setExpandir] = useState(false)
  const { notas, setNotas } = useContext(Contexto)

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(snippet.note_code)
    setCopyButtonText('COPIADO')
    setTimeout(() => {
      setCopyButtonText('COPIAR')
    }, 1000)
  }

  const excluirNota = async () => {
    try {
      if (confirm('Deseja remover realmente esta nota?')) {
        const { note_id } = snippet
        const { data } = await api.delete(`notes/${note_id}`)
        if (data.error == false) {
          const updateNotas = notas.filter(nota => note_id !== nota.note_id)
          setNotas(updateNotas)
        }
      }
    } catch (error) {
      alert(error.toString())
    }
  }

  const handleExpandir = () => {
    setExpandir(!expandir)
  }

  useEffect(() => {
    // hljs.initHighlightingOnLoad()
  }, [])

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{
                borderBottom: '0px solid #ccc',
                marginBottom: 15,
                display: 'flex',
                alignItens: 'center'
              }}
            >
              <span style={{ opacity: 0.5 }}>[{key_autoincrement}]</span>
              {snippet.note_title}
            </Typography>

            {snippet.note_description && (
              <>
                {snippet.note_description.toString().length > 1000 ? (
                  <>
                    <ReactMarkdown
                      source={
                        !expandir
                          ? snippet.note_description
                              .toString()
                              .trim()
                              .substr(0, 500) + '...'
                          : snippet.note_description.toString().trim()
                      }
                      escapeHtml={false}
                    />
                  </>
                ) : (
                  <>
                    {/* <Highlight
                      className={snippet.language.lang_name}
                      innerHTML={false}
                    >
                      {snippet.note_description}
                    </Highlight> */}
                    <ReactMarkdown
                      source={snippet.note_description}
                      escapeHtml={false}
                    />
                  </>
                )}
              </>
            )}

            {snippet.note_code && (
              <>
                <hr
                  style={{
                    border: 0,
                    borderTop: '0.00000001rem solid #ccc',
                    height: '0.11rem'
                  }}
                />
                <Highlight
                  className={classes.languageNameSnippet}
                  innerHTML={false}
                >
                  {!expandir
                    ? snippet.note_code.toString().trim().substr(0, 100)
                    : snippet.note_code.toString().trim()}
                </Highlight>
              </>
            )}
            {snippet.note_code && (
              <>
                {snippet.note_code.toString().length > 100 && (
                  <>
                    <Button color="primary" onClick={handleExpandir}>
                      {!expandir ? 'Expandir...' : 'Retrair'}
                    </Button>
                  </>
                )}
              </>
            )}

            <hr />

            <Link href={`/categoria/${snippet.category.slug.toLowerCase()}`}>
              <a>
                <Chip
                  label={snippet.category.category_name}
                  avatar={
                    <Avatar
                      alt={snippet.category.category_name}
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL_API_REST +
                        '/images/' +
                        snippet.category.category_icon
                      }
                      style={{
                        width: 25,
                        height: 25
                      }}
                    />
                  }
                />
              </a>
            </Link>
          </CardContent>
          {/* {Ações} */}
          <CardActions
            style={{
              borderTop: '1px solid #ccc',
              paddingLeft: 15,
              paddingBottom: 15,
              paddingTop: 15
            }}
          >
            <a
              onClick={onCopyToClipboard}
              style={{ color: '#3f51b5', fontWeight: 600 }}
            >
              {copyButtonText}
            </a>
            {logged && (
              <>
                <span style={{ borderLeft: '0px solid #ccc', marginLeft: 14 }}>
                  {'\u00A0'}
                </span>
                <Link
                  href={`/categoria/${snippet.category.slug.toLowerCase()}/${
                    snippet.note_id
                  }/edit`}
                >
                  <a style={{ color: '#3f51b5', fontWeight: 600 }}>EDITAR</a>
                </Link>
              </>
            )}
            <span style={{ borderLeft: '0px solid #ccc', marginLeft: 14 }}>
              {'\u00A0'}
            </span>
            <Link
              href={`/categoria/${snippet.category.slug.toLowerCase()}/${
                snippet.note_id
              }`}
            >
              <a style={{ color: '#3f51b5', fontWeight: 600 }}>LER MAIS</a>
            </Link>
            {logged && (
              <>
                <span style={{ borderLeft: '0px solid #ccc', marginLeft: 14 }}>
                  {'\u00A0'}
                </span>
                <a
                  onClick={excluirNota}
                  style={{ color: '#3f51b5', fontWeight: 600 }}
                >
                  EXCLUIR
                </a>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SnippetCardItem
