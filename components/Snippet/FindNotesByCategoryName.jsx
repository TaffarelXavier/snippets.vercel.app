/* eslint-disable multiline-ternary */
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Contexto } from '../../contexts/contexto'
import useFetchNotes from '../../hooks/useFetchNotes'
import MySkeleton from './MySkeleton'
import SnippetCardItem from './SnippetCardItem'
import SnippetReadmeCabecalho from './SnippetReadme'
import { useSession } from 'next-auth/client'
import CriarSnippet from '../../components/Snippet/ModalEditar'

const LIMITE_DE_REGISTROS_POR_PAGINA = 5

const MostrarSnippets = ({
  isLogged,
  size,
  setSize,
  isLoadingInitialData,
  notes,
  data
}) => {
  if (!data) return null
  return (
    <>
      {data && (
        <>
          {(notes || []).map((snippet, index) => {
            return (
              <SnippetCardItem
                snippet={snippet}
                logged={isLogged}
                key={index + 1}
                key_autoincrement={index + 1}
              />
            )
          })}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!(data[0].data.total / size < LIMITE_DE_REGISTROS_POR_PAGINA) ? (
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
            <Pagination
              page={size}
              showFirstButton
              showLastButton
              count={Math.ceil(
                data[0].data.total / LIMITE_DE_REGISTROS_POR_PAGINA
              )}
              onChange={(ev, value) => {
                setSize(value)
              }}
            />
          </div>
        </>
      )}
    </>
  )
}

const FindNotesByCategoryName = () => {
  const { notas } = useContext(Contexto)
  const [session] = useSession()
  const { query } = useRouter()

  const {
    notes,
    error,
    size,
    setSize,
    isLoadingInitialData,
    data
  } = useFetchNotes('/categoria/' + query.id) // ' + query.id

  if (error) return 'Ops, houve ume erro'

  if (!data) {
    return (
      <div
        style={{
          maxWidth: 1100,
          border: '0px solid red',
          padding: 10
        }}
      >
        {isLoadingInitialData && (
          <>
            {[...Array(3)].fill().map((el, index) => {
              return <MySkeleton key={index + 1} color={2} />
            })}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          maxWidth: 1100,
          border: '0px solid red',
          padding: 10
        }}
      >
        <SnippetReadmeCabecalho />

        <div>
          <h3 className="tecnical-line-horizontal">
            <span>Navegue pelos snippets</span>
          </h3>
        </div>
        <br />
        <CriarSnippet />
        {notas.length > 0 ? (
          <>
            <MostrarSnippets
              data={data}
              notes={notas}
              isLogged={session && true}
              size={size}
              setSize={setSize}
              isLoadingInitialData
            />
          </>
        ) : (
          <>
            <MostrarSnippets
              data={data}
              notes={notes}
              isLogged={session && true}
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
export default FindNotesByCategoryName
