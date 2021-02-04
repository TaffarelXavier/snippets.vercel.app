import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import React, { useContext } from 'react'
import { Contexto } from '../../contexts/contexto'
import api from '../../services/axios'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    width: '100%',
    '&:hover': {
      background: '#ebebeb',
      cursor: 'pointer'
    }
  }
}))
function MyBadge({ total }) {
  return (
    <>
      Total de Snippets:{'\u00A0'}
      {'\u00A0'}
      {'\u00A0\u00A0'}
      <Badge overlap="rectangle" badgeContent={total} color="primary"></Badge>
    </>
  )
}
function CategoriaItem(props) {
  const classes = useStyles()

  const { categoria } = props
  const { category_id, category_name, slug, total, category_icon } = categoria
  const { setNotas, selected, setSelected, setPagina } = useContext(Contexto)

  const handleClick = async () => {
    setPagina(1)
    Router.replace('/categoria/' + slug, '/categoria/' + slug.toLowerCase())
    const { data } = await api.get(
      `/notes-por-category-id/${category_id}?page=1&limit=10`
    )
    setNotas(data)
    setSelected(category_id)
  }

  const excluirCategoria = async (ev) => {
    ev.preventDefault()
    if (confirm('Deseja realmente excluir esta categoria?')) {
      const { data } = await api.delete(`/category/${category_id}`)
      alert(JSON.stringify(data, null, 2))
    }
  }

  return (
    <ListItem
      onClick={handleClick}
      selected={selected === category_id}
      className={classes.listItem}
      divider
    >
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={
            process.env.NEXT_PUBLIC_BASE_URL_API_REST +
            '/images/' +
            category_icon
          }
        ></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={category_name}
        secondary={<MyBadge total={total} />}
      />
      <style jsx global>
        {`
          * {
            font-family: Montserrat, sans-serif !important;
          }
        `}
      </style>
    </ListItem>
  )
}

export default CategoriaItem
