/* eslint-disable multiline-ternary */
// import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import Categorias from '../../components/Categoria/CategoriaRead'
import NavBar from '../../components/Navbar'
import SnippetRead from '../../components/Snippet/SnippetRead'
import CriarSnippet from '../../components/Snippet/ModalEditar'
import BuscarPorCategoria from '../../components/Categoria/Modal'
import { Contexto, ContextProvider } from '../../contexts/contexto'
const drawerWidth = 320

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: '#222A68',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: '5px solid lime'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  logo: {
    maxWidth: '100%',
    height: 40
  },
  title: {
    color: '#fff'
  }
}))

function MiniDrawer() {
  const { handleDrawerOpen, setHandleDrawerOpen } = useContext(Contexto)
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Snippets Codes - Ganhe tempo e seja mais produtivo</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: handleDrawerOpen
          })}
        />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: handleDrawerOpen,
            [classes.drawerClose]: !handleDrawerOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: handleDrawerOpen,
              [classes.drawerClose]: !handleDrawerOpen
            })
          }}
        >
          <Toolbar
            style={{
              background: '#222A68',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Link href="/">
              <a style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/assets/images/snippets-logo.png"
                  alt="logo"
                  className={classes.logo}
                />
                <Typography variant="h6" className={classes.title}>
                  Snippets Code
                </Typography>
              </a>
            </Link>
            {/* <IconButton onClick={() => setHandleDrawerOpen(!handleDrawerOpen)}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton> */}
          </Toolbar>
          <Divider />
          <Categorias />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <SnippetRead />
        </main>
      </div>
      <CriarSnippet />
      <BuscarPorCategoria />
    </>
  )
}

const myFunction = () => {
  return (
    <ContextProvider>
      <MiniDrawer />
    </ContextProvider>
  )
}

export default myFunction
