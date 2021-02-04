import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useContext, useState } from 'react'
import { Contexto } from '../../contexts/contexto'
import useFetch from '../../hooks/useFetch'
import api from '../../services/axios'
import { useSession } from 'next-auth/client'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  painelSelects: {
    display: 'flex',
    flexDirection: 'center',
    border: '0px solid black',
    ' & > div': {
      border: '0px solid red',
      width: '100%',
      padding: 10
    }
  },
  textAreaAutoSize: {
    background: 'rgba(232, 232, 232,1)',
    border: 0,
    padding: 10,
    outline: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#fff'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
    '& > button': {
      margin: 10
    }
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" timeout={1} ref={ref} {...props} />
})

export default function ModalEditar() {
  const [session] = useSession()
  const classes = useStyles()
  const { modalOpenCreate, setModalOpenCreate } = useContext(Contexto)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [langId, setLangId] = useState(null)
  const [categoryId, setCategoryId] = useState(null)

  const handleClose = () => {
    setModalOpenCreate(false)
  }

  const { data: categories } = useFetch('/category')
  const { data: languages } = useFetch('/languages')

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault()
      const { user, accessToken } = session

      const payload = {
        token: accessToken,
        user_id: user.id,
        title: title,
        description: description,
        code: code,
        category: categoryId,
        'formatacao-language': langId
      }
      const { data } = await api.post('/notes', payload)

      if (data.type == 'success') {
        alert('Snippet criado com sucesso!')
        // Router.reload()
      } else {
        alert(data.user_message) // FIXME: Alterar essa mensagem
      }
    } catch (error) {
      alert('Houve um erro')
    }
  }

  if (!categories || !languages) return null

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={modalOpenCreate}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Criar novo snippet
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ margin: 0 }}>
          <form className={classes.form} id="my-form-id" onSubmit={handleSubmit} noValidate>
            <FormControl fullWidth variant="outlined">
              <TextField
                label="Título"
                id="filled-start-adornment"
                variant="filled"
                value={title}
                required
                autoFocus
                onChange={({ target }) => {
                  setTitle(target.value)
                }}
              />
            </FormControl>
            <br />
            <InputLabel htmlFor="input-with-icon-adornment">
              Descrição
            </InputLabel>
            <FormControl fullWidth variant="outlined">
              <TextareaAutosize
                className={classes.textAreaAutoSize}
                label="Descrição"
                id="filled-start-adornment"
                variant="filled"
                multiline
                rows={5}
                value={description}
                onChange={({ target }) => {
                  setDescription(target.value)
                }}
              />
            </FormControl>
            <br />
            <InputLabel htmlFor="input-with-icon-adornment">Código</InputLabel>
            <FormControl fullWidth variant="outlined">
              <TextareaAutosize
                className={classes.textAreaAutoSize}
                label="Código"
                id="filled-start-adornment"
                variant="filled"
                multiline
                rows={10}
                value={code}
                onChange={({ target }) => {
                  setCode(target.value)
                }}
              />
            </FormControl>{' '}
            <br />
            <div className={classes.painelSelects}>
              <div>
                {categories && (
                  <Autocomplete
                    id="combo-box-demo"
                    options={categories.data}
                    onChange={(_, value) => {
                      const { category_id } = value
                      setCategoryId(category_id)
                    }}
                    noOptionsText="Não há nenhuma categoria para o termo escolhido"
                    renderOption={(option) => (
                      <React.Fragment>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL_API_REST +
                            `/images/${option.category_icon}`
                          }
                          style={{ width: 30, height: 30 }}
                        />
                        &nbsp;
                        {option.category_name}
                      </React.Fragment>
                    )}
                    getOptionLabel={(option) => option.category_name}
                    style={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categoria"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                )}
              </div>
              <div>
                <Autocomplete
                  id="combo-box-demo"
                  options={languages || []}
                  autoHighlight
                  onChange={(_, value) => {
                    setLangId(value.lang_id)
                  }}
                  //   value={langValue}
                  getOptionLabel={(option) => option.lang_name.toUpperCase()}
                  style={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Linguagem para formatação"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </div>
            {/* <div className={classes.actions}>
              <Button onClick={handleClose} size="large" color="primary">
                Fechar
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="large"
              >
                Criar novo snippet
              </Button>
            </div> */}
          </form>
        </DialogContent>
        <hr />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button variant="contained" form="my-form-id" type="submit" color="primary">
            Criar novo snippet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
