/* eslint-disable multiline-ternary */
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fade, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import Skelecton from '@material-ui/lab/Skeleton'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Contexto } from '../../contexts/contexto'
import api from '../../services/axios'
const drawerWidth = 320

const useStyles = makeStyles((theme) => ({
  grow: {
    left: drawerWidth,
    right: 0
  },
  appBar: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    background: '#222A68'
  },
  buttonCreate: {
    borderRadius: 50
  },
  toolbar: {
    border: '0px solid red',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ' & div': {
      background: 'transparent'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

export default function PrimarySearchAppBar(props) {
  const [session, loading] = useSession()
  // const theme = useTheme()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [filtro, setFiltro] = useState('')
  const [procurando, setProcurando] = useState(false)

  const [oooo, setMobileMoreAnchorEl] = useState(null)

  const {
    setNotas,
    setModalOpenCreate,
    setModalCategory,
    setNotaPesquisaEncontrada,
    handleDrawerOpen,
    setHandleDrawerOpen
  } = useContext(Contexto)

  const isMenuOpen = Boolean(anchorEl)

  const pesquisarNota = async (ev) => {
    if (ev.keyCode == 13) {
      if (ev.target.value.trim().length >= 2) {
        setNotaPesquisaEncontrada(true)
        setProcurando(true)
        const { data } = await api.get(`/filtrar-notas/${filtro}`)
        if (data.type == 'success') {
          if (data.message == 'notas_mostradas_com_sucesso') {
            setNotas([])
            setNotas(data.data.data)
            if (data.data.data.length > 0) {
              setNotaPesquisaEncontrada(true)
            } else {
              setNotaPesquisaEncontrada(false)
            }
          }
          setProcurando(!true)
        }
      }
    }
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const openMenuCategory = () => {
    setModalCategory(true)
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (
    <>
      <AppBar position="fixed" className={props.className}>
        <Toolbar className={classes.toolbar}>
          <div>
            <IconButton onClick={() => setHandleDrawerOpen(!handleDrawerOpen)}>
              {handleDrawerOpen ? (
                <ChevronLeftIcon style={{ color: '#fff', fontSize: 30 }} />
              ) : (
                <ChevronRightIcon style={{ color: '#fff', fontSize: 30 }} />
              )}
            </IconButton>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Pesquisar..."
              onKeyUp={pesquisarNota}
              onChange={({ target }) => {
                setFiltro(target.value)
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            {session ? (
              <>
                <Button
                  variant="contained"
                  onClick={setModalOpenCreate}
                  color="primary"
                  className={classes.buttonCreate}
                >
                  <AddIcon />
                  Criar Snippet
                </Button>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  style={{ padding: 0, marginLeft: 10 }}
                >
                  <Avatar
                    src={session.user.image}
                    style={{ width: 40, height: 40 }}
                  />
                </IconButton>
              </>
            ) : (
              <>
                {!loading ? (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 10 }}
                    onClick={() => signIn('github')}
                  >
                    Entrar
                  </Button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Skelecton
                      height={40}
                      style={{ background: '#fff' }}
                      variant="text"
                      width={140}
                    />
                    <Skelecton
                      height={40}
                      style={{ background: '#fff', marginLeft: 10 }}
                      variant="circle"
                      width={40}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              onClick={handleProfileMenuOpen}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {session && (
            <MenuItem onClick={openMenuCategory}>{session.user.name}</MenuItem>
          )}
          {session ? (
            <MenuItem>
              <Link href="/my-snippets">
                <a>Meus snippets</a>
              </Link>
            </MenuItem>
          ) : (
            <MenuItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => signIn('github')}
              >
                Entrar
              </Button>
            </MenuItem>
          )}
          {session && (
            <MenuItem onClick={openMenuCategory}>Categorias</MenuItem>
          )}
          {session && <Divider />}
          {session && <MenuItem onClick={() => signOut()}>Sair</MenuItem>}
        </Menu>
      </AppBar>
      {procurando && (
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #fff',
            right: 0,
            left: '45%',
            bottom: '40%',
            top: '40%',
            width: 200,
            height: 0,
            color: '#fff',
            background: 'rgba(0,0,0,0.4)'
          }}
        >
          <img src="/assets/images/276.gif" alt="" />
        </div>
      )}
    </>
  )
}
