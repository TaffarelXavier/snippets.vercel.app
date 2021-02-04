/* eslint-disable multiline-ternary */
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useContext, useState } from 'react'
import { Contexto } from '../../contexts/contexto'
import useFetch from '../../hooks/useFetch'
import CategoriaItem from './CategoriaItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    '&:hover': {
      background: '#ebebeb',
      cursor: 'pointer'
    }
  }
}))

const CategoriaRead = () => {
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([])
  const [isEncontrado, setEncontrado] = useState(true)
  const [termoFiltrado, setTermoFiltrado] = useState(null)
  const { categories, setCategories } = useContext(Contexto)

  const classes = useStyles()

  const { data } = useFetch('/categories')

  // if (!data) return 'Carregando...'

  const handleSearchCategory = ({ target }) => {
    const value = target.value
    let newCategories = [...categories]

    newCategories = newCategories.filter(({ category_name }) => {
      return category_name.toLowerCase().includes(value.toLowerCase())
    })

    setCategoriasFiltradas(newCategories)
    if (!newCategories.length) {
      setEncontrado(true)
    }
  }

  if (!data) {
    return (
      <div
        style={{ border: '0px solid red', textAlign: 'center', marginTop: 20 }}
      >
        <img src="/assets/images/276.gif" alt="" />
      </div>
    )
  }

  data.sort((a, b) => {
    return b.total - a.total
  })

  const search = termoFiltrado
    ? data.filter(crime =>
        crime.category_name.toUpperCase().includes(termoFiltrado.toUpperCase())
      )
    : data
  return (
    <>
      <div style={{ display: 'flex', padding: 20 }}>
        <FormControl fullWidth variant="outlined">
          <TextField
            onChange={({ target }) => setTermoFiltrado(target.value)}
            type="search"
            id="standard-basic"
            label="Pesquisar categorias"
          />
        </FormControl>
      </div>

      {search.length ? (
        <List className={classes.root}>
          {(search || []).map(categoria => {
            return (
              <CategoriaItem
                key={`categoria_${categoria.category_id}`}
                categoria={categoria}
              />
            )
          })}
        </List>
      ) : (
        <>
          {!isEncontrado ? (
            <div style={{ border: '0px solid red', textAlign: 'center' }}>
              <img src="/assets/images/276.gif" alt="" />
            </div>
          ) : (
            <div style={{ display: 'flex', paddingLeft: 20, paddingRight: 20 }}>
              Nenhuma categoria encontrada
            </div>
          )}
        </>
      )}
    </>
  )
}
export default CategoriaRead
