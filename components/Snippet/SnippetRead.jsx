/* eslint-disable multiline-ternary */
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import React, { useContext } from 'react'
import { Contexto } from '../../contexts/contexto'
import useFetchNotes from '../../hooks/useFetchNotes'
import MySkeleton from './MySkeleton'
import SnippetCardItem from './SnippetCardItem'
import SnippetReadmeCabecalho from './SnippetReadme'
import { useSession } from 'next-auth/client'
import Router from 'next/router'
const LIMITE_DE_REGISTROS_POR_PAGINA = 5

const Funcao = ({
  notes,
  isLogged,
  tamanho,
  size,
  setSize,
  isLoadingInitialData,
  data
}) => {
  return (
    <>
      {(notes || []).map((snippet, index) => {
        return (
          <SnippetCardItem
            snippet={snippet}
            logged={isLogged}
            key={snippet.note_id}
            key_autoincrement={index + 1}
          />
        )
      })}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!(tamanho / size < LIMITE_DE_REGISTROS_POR_PAGINA) ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setSize(size + 1)}
          >
            Carregar mais
          </Button>
        ) : (
          <> {!isLoadingInitialData && 'Não há mais snippets.'}</>
        )}
        {data && (
          <Pagination
            showFirstButton
            showLastButton
            count={Math.ceil(
              data[0].data.total / LIMITE_DE_REGISTROS_POR_PAGINA
            )}
            onChange={(ev, value) => {
              setSize(value)
            }}
          />
        )}
      </div>
    </>
  )
}

const SnippetRead = () => {
  const { notas } = useContext(Contexto)
  const [session] = useSession()

  const {
    notes,
    error,
    tamanho,
    size,
    setSize,
    isLoadingInitialData,
    data
  } = useFetchNotes('/notes')

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          right: 0,
          bottom: 0,
          left: 0,
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          color: '#fff'
        }}
      >
        <h3>
          <pre style={{ color: '#fff' }}>{error.message}</pre>
        </h3>
        <Button onClick={() => Router.reload()} style={{ color: '#fff' }}>
          Atualizar
        </Button>
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          maxWidth: 1100,
          padding: 10
        }}
      >
        <SnippetReadmeCabecalho />
        {isLoadingInitialData && (
          <>
            {[...Array(3)].fill().map((el, index) => {
              return <MySkeleton key={index + 1} color={2} />
            })}
          </>
        )}
        <div>
          <h3 className="tecnical-line-horizontal">
            <span>Navegue pelos snippets</span>
          </h3>
        </div>
        <br />
        {notas.length > 0 ? (
          <>
            <Funcao
              data={data}
              notes={notas}
              isLogged={session && true}
              tamanho={tamanho}
              size={size}
              setSize={setSize}
              isLoadingInitialData
            />
          </>
        ) : (
          <>
            <Funcao
              data={data}
              notes={notes}
              isLogged={session && true}
              tamanho={tamanho}
              size={size}
              setSize={setSize}
              isLoadingInitialData
            />
          </>
        )}
      </div>
      <style jsx global>
        {`
          section {
            font-size: 19px;
            font-family: 'Noto Sans', sans-serif;
          }
          section p {
            line-height: 2;
          }
          .tecnical-line-horizontal {
            width: 100%;
            text-align: center;
            border-bottom: 1px solid rgb(148, 148, 148);
            line-height: 0.1em;
            margin: 10px 0 20px;
          }
          .tecnical-line-horizontal span {
            background: #fafafa;
            padding: 0 10px;
            font-weight: 900;
            font-size: 30px;
            color: hsla(210, 33%, 4%, 0.7);
          }
        `}
      </style>
    </>
  )
}
export default SnippetRead
