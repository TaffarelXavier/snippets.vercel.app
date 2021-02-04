import React from 'react'
import api from '../../services/axios'
const Login = () => {
  const onSubmit = async (ev) => {
    ev.preventDefault()
    const { target } = ev
    const email = target.elements.email
    const password = target.elements.password
    // const data = target.elements.email;
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    console.log(data)
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Usu�rio</label>
          <input type="text" name="email" id="" autoFocus />
        </div>
        <div>
          <label htmlFor="">Senha</label>
          <input type="text" name="password" id="" />
        </div>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </>
  )
}
export default Login
