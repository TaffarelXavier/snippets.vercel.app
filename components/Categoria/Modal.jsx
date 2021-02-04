import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useContext, useState } from 'react'
import { Contexto } from '../../contexts/contexto'
import api from '../../services/axios'
import ModalTodasCategorias from './ModalTodasCategorias'

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
  }
}))
export default function MaxWidthDialog() {
  const classes = useStyles()
  const { openModalCategory, setModalCategory } = useContext(Contexto)
  // const [categories, setCategories] = useState([]);
  // const [languages, setLanguages] = useState([]);
  const [name, setCategoryName] = useState('')
  const [langId, setLangId] = useState(null)
  const [novaCategoria, setNovaCategoria] = useState(false)
  const [categoryId, setCategoryId] = useState(null)
  const [fileIcon, setFileIcon] = useState(null)
  const handleClose = () => {
    setModalCategory(false)
  }
  
  // const getCategories = async () => {
  // 	const { data } = await api.get('/category');
  // 	setCategories(data);
  // };
  // const getLanguages = async () => {
  // 	const { data } = await api.get('/languages');
  // 	setLanguages(
  // 		data.map((el) => {
  // 			el.lang_name = el.lang_name.toUpperCase();
  // 			return el;
  // 		})
  // 	);
  // };
  const onSaveCategory = async () => {
    const form = new FormData()
    form.append('category__name', name)
    form.append('category__order', 1)
    form.append('category__fk__id', null)
    form.append('image_name', fileIcon)
    const { data } = await api.post('/category', form)
    alert(JSON.stringify(data, null, 2))
    // Notificacao('Snippet criado com sucesso!', 'success');
  }
  // React.useEffect(() => {
  // 	getCategories();
  // 	getLanguages();
  // }, []);
  /**
   *
   *
   *
   */
  const handleNovaCategoria = () => {
    setNovaCategoria(!novaCategoria)
  }
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={openModalCategory}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        Transition
      >
        <DialogTitle id="max-width-dialog-title">Categorias</DialogTitle>
        <DialogContent>
          <Button
            onClick={handleNovaCategoria}
            variant="contained"
            type="submit"
            color={!novaCategoria ? 'primary' : 'secondary'}
          >
            {!novaCategoria ? 'Nova Categoria' : 'Cancelar'}
          </Button>
          <form className={classes.form} noValidate>
            {!novaCategoria ? (
              <ModalTodasCategorias />
            ) : (
              <>
                <hr />
                <FormControl fullWidth variant="outlined">
                  <TextField
                    label="Nome da categoria"
                    id="filled-start-adornment"
                    variant="filled"
                    value={name}
                    onChange={({ target }) => {
                      setCategoryName(target.value)
                    }}
                  />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept={'.jpeg,.jpg,.png,.svg'}
                    onChange={({ target }) => {
                      setFileIcon(target.files[0])
                      console.log(fileIcon)
                    }}
                  />
                </FormControl>
              </>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          {novaCategoria && (
            <Button
              onClick={onSaveCategory}
              variant="contained"
              type="submit"
              color="primary"
            >
              Criar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
