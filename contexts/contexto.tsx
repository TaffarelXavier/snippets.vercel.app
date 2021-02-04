/* eslint-disable react/jsx-filename-extension */
import React, { createContext, Dispatch, useEffect, useState } from 'react'

interface InitContextProps {
  post: null;
  setPost(d: any): void;
  navbarItems: any[];
  company: any[];
  blockComment: boolean;
  setBlockComment(d: any): any;
  openModalLogin: boolean;
  setModalLogin(d: any): any;
  isLogged: boolean;
  setLogged(d: any): any;
  setOpenDrawer(d: any): any;
  openDrawer: boolean;
  notas: any[];
  setNotas(d: any): any;
  selected: boolean;
  setSelected: any;
  modalOpenCreate: any;
  setModalOpenCreate(d: any): any;
  pagina: any;
  setPagina(d: any): any;
  openModalCategory: any;
  setModalCategory(d: any): any;
  categories: any;
  setCategories(d: any): any;
  categoriasFiltradas: any;
  setCategoriasFiltradas(d: any): any;
  notaPesquisaEncontrada: any;
  setNotaPesquisaEncontrada(d: any): any;
  handleDrawerOpen: any;
  setHandleDrawerOpen(d: any): any

}

export const Contexto = createContext({} as InitContextProps);

export const ContextProvider = ({ children }) => {

  const [post, setPost] = useState(null)
  const [company, setCompany] = useState(null)
  const [navbarItems, setNavBarItems] = useState([])
  const [blockComment, setBlockComment] = useState(false)
  const [openModalLogin, setModalLogin] = useState(false)
  const [isLogged, setLogged] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [notas, setNotas] = useState([])
  const [selected, setSelected] = useState(false)
  const [modalOpenCreate, setModalOpenCreate] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [openModalCategory, setModalCategory] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([])
  const [notaPesquisaEncontrada, setNotaPesquisaEncontrada] = useState(null)
  const [handleDrawerOpen, setHandleDrawerOpen] = useState(true)

  return (
    <Contexto.Provider
      value={{
        post,
        setPost,
        navbarItems,
        company,
        blockComment,
        setBlockComment,
        openModalLogin,
        setModalLogin,
        isLogged,
        setLogged,
        setOpenDrawer,
        openDrawer,
        notas,
        setNotas,
        selected,
        setSelected,
        modalOpenCreate,
        setModalOpenCreate,
        pagina,
        setPagina,
        openModalCategory,
        setModalCategory,
        categories,
        setCategories,
        categoriasFiltradas,
        setCategoriasFiltradas,
        notaPesquisaEncontrada,
        setNotaPesquisaEncontrada,
        handleDrawerOpen,
        setHandleDrawerOpen
      }}
    >
      {children}
    </Contexto.Provider>
  )
}
