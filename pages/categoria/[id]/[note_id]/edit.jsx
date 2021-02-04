/* eslint-disable multiline-ternary */
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Head from 'next/head'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import Alerta from '../../../../components/Alert'
import Footer from '../../../../components/Footer'
import Saida from '../../../../components/Saida'
import useFetch from '../../../../hooks/useFetch'
import api from '../../../../services/axios'
import Notificacao from '../../../../utils/Notificacao'

const EditarSnippet = () => {
  const { register, handleSubmit, getValues } = useForm()

  const [loading, setLoading] = useState(false)
  const [snippetExists, setSnippetExists] = useState(true)
  const [disableButton, setDisableButton] = useState(true)

  const { data: categories } = useFetch('/category')

  const [notaId, setNotaId] = useState('')
  const [oldTitulo, setOldTitulo] = useState('')
  const [oldDescricao, setOldDescricao] = useState('')
  const [oldCodigo, setOldCodigo] = useState('')

  const [category, setCategory] = useState(null)

  const { query } = useRouter()

  const [title, setTitle] = useState(
    'Snippets Codes - Ganhe tempo e seja mais produtivo'
  )
  const onSubmit = values => {
    visualizar()

    values.category_id = parseInt(category.category_id, 10)

    api.put(`/notes/${notaId}`, values).then(({ data }) => {
      console.log(data.type == 'success')
      if (data.type == 'success') {
        Notificacao('Alterações salvas com sucesso!')
      }
    })
  }
  const obterDados = async () => {
    const { note_id } = query
    if (note_id) {
      setNotaId(note_id)
      const { data } = await api.get(`/notes/${parseInt(note_id)}/edit`)
      const response = data.data
      if (data.type === 'success') {
        setCategory({
          category_id: response.category_id.toString(),
          category_name: response.category.category_name.toString()
        })
        setLoading(false)

        setOldTitulo(response.note_title)
        setOldDescricao(response.note_description)
        setOldCodigo(response.note_code)

        setTitle(response.note_title)
        setLoading(true)
        if (!response.note_id) {
          setSnippetExists(false)
        }
      }
    }
  }

  useEffect(() => {
    obterDados()
  }, [query])

  const visualizar = () => {
    setOldCodigo(getValues('codigo'))
    setOldTitulo(getValues('titulo'))
    setOldDescricao(getValues('description'))
  }
  return (
    <>
      <Head>
        <title>{'Carregando...' && title}</title>
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link rel="stylesheet" href="/assets/css/footer.css" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
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
          zIndex: 1,
          color: '#fff'
        }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={1}></Col>
            <Col xs={12} md={12} sm={10}>
              <Row style={{ border: '0px solid red' }}>
                <Col>
                  <Link href={'/'}>
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
                ></Col>
              </Row>
            </Col>
            <Col xs={12} sm={1}></Col>
          </Row>
        </Container>
      </header>
      <div className="content">
        <Container>
          {loading === false ? (
            <Row style={{ marginTop: 60 }}>
              <Col lg={3} sm={1} md={3}></Col>
              <Col lg={6} sm={10} md={6}>
                {!snippetExists && <Alerta />}
              </Col>
              <Col lg={3} sm={1} md={3}></Col>
            </Row>
          ) : (
            <>
              {!snippetExists ? (
                <>
                  <Row style={{ marginTop: 20 }}>
                    <Col lg={3} sm={1} md={3}></Col>
                    <Col lg={6} sm={10} md={6}>
                      <Alerta />
                    </Col>
                    <Col lg={3} sm={1} md={3}></Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row style={{ marginTop: 20 }}>
                    <Col>
                      <h1>Editar nota</h1>
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ border: '0px solid lime' }}>
                    <Col xs={6} md={6} sm={6}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                          <h3>Título:</h3>
                          <Form.Control
                            name="titulo"
                            as="input"
                            rows="10"
                            autoFocus
                            defaultValue={oldTitulo}
                            ref={register}
                          />
                          <h3>Descrição:</h3>
                          <Form.Control
                            name="description"
                            as="textarea"
                            rows="6"
                            defaultValue={oldDescricao}
                            ref={register}
                          />
                          <h3>Código:</h3>
                          <Form.Control
                            name="codigo"
                            as="textarea"
                            rows="10"
                            defaultValue={oldCodigo}
                            ref={register}
                          />
                          <br />
                          {categories && (
                            <Autocomplete
                              value={category}
                              id="combo-box-demo"
                              options={categories.data}
                              onChange={(_, value) => {
                                const { category_id } = value
                                console.log(value)
                                setCategory(value)
                                // formik.setFieldValue(
                                //   'category_id',
                                //   category_id
                                // )
                              }}
                              renderOption={option => (
                                <React.Fragment>
                                  <img
                                    src={
                                      process.env
                                        .NEXT_PUBLIC_BASE_URL_API_REST +
                                      `/images/${option.category_icon}`
                                    }
                                    style={{ width: 30, height: 30 }}
                                  />
                                  &nbsp;
                                  {option.category_name}
                                </React.Fragment>
                              )}
                              getOptionLabel={option => option.category_name}
                              style={{ width: '100%' }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Categoria"
                                  variant="outlined"
                                />
                              )}
                            />
                          )}
                        </Form.Group>

                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Salvar
                        </Button>
                        <Button
                          style={{ marginLeft: 20 }}
                          onClick={() => {
                            Router.back()
                          }}
                        >
                          Voltar
                        </Button>
                        <Button
                          style={{ marginLeft: 20 }}
                          type="button"
                          color="primary"
                          onClick={() => visualizar()}
                        >
                          Visualizar
                        </Button>
                      </form>
                    </Col>
                    <Col xs={6} md={6} sm={6}>
                      <Saida
                        titulo={oldTitulo}
                        descricao={oldDescricao}
                        codigo={oldCodigo}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default EditarSnippet
