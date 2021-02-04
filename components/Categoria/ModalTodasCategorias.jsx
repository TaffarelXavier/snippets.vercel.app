import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import api from '../../services/axios'
import CategoriaItem from './CategoriaItem'
import useFetch from '../../hooks/useFetch'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: 280,
    overflow: 'auto',
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
  const [categorias, setCategorias] = useState([])
  const [termoFiltered, setTermoFiltered] = useState(null)
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([])
  const [isEncontrado, setEncontrado] = useState(false)
  const classes = useStyles()
  const { data } = useFetch('/category')

  if (!data) return 'Carregando...'

  const getCategoria = async () => {
    if (data.type == 'success') {
      const newListCategory = data.data.map((el) => {
        el.selected = false
        return el
      })
      setCategorias(newListCategory)
      setCategoriasFiltradas(newListCategory)
    }
  }

  const handleSearchCategory = ({ target }) => {
    const value = target.value
    let newCategories = [...categorias]
    setEncontrado(!true)
    newCategories = newCategories.filter(({ category_name }) => {
      return category_name.toLowerCase().includes(value.toLowerCase())
    })
    setCategoriasFiltradas(newCategories)
    if (!newCategories.length) {
      setEncontrado(true)
    }
  }

  const myCategories = data.data.map(
    ({
      category_id,
      category_name,
      category_icon,
      category_placeholder_icon
    }) => {
      return {
        category_id,
        category_name,
        category_icon,
        category_placeholder_icon,
        selected: false
      }
    }
  )

  let filteredCategories = termoFiltered
    ? myCategories.filter((crime) =>
        crime.category_name.toUpperCase().includes(termoFiltered.toUpperCase())
      )
    : myCategories
  return (
    <>
      <div style={{ display: 'flex', padding: 20 }}>
        <FormControl fullWidth variant="outlined">
          <TextField
            onChange={({ target }) => {
              setTermoFiltered(target.value)
            }}
            type="search"
            id="standard-basic"
            label="Pesquisar categorias"
          />
        </FormControl>
      </div>
      {filteredCategories.length ? (
        <List className={classes.root}>
          {(filteredCategories || []).map((categoria) => {
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
            <img src="/assets/images/276.gif" alt="" />
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
