import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from '../../services/api'

function Home() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputSenha = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    const nome = inputName.current.value
    const senha = inputSenha.current.value

    if (!nome || !senha) {
      alert('Preencha usuário e senha!')
      return;
    }
    try {
      await api.post('/usuarios', { nome, senha })
      alert('Perfil criado com sucesso!')
      navigate('/pesquisa')
      inputName.current.value = ''
      inputSenha.current.value = ''
      getUsers()
    } catch (erro) {
      alert('Erro ao criae perfil!')
      console.log(erro)
    }
  }
  async function handleLogin() {
    const nome = inputName.current.value;
    const senha =
      inputSenha.current.value;
    if (!nome || !senha) {
    alert('Preencha usuário e senha!');
    return;
  }
  try {
    const todosUsuarios = await api.get('/usuarios');
    const usuarioEncontrado = todosUsuarios.data.find(
      u => u.nome === nome && u.senha === senha);
    if (usuarioEncontrado) {
      alert('Login realizado com sucesso!');
      navigate('/pesquisa')
    } else {
      alert('Usuário ou senha incorretos!');
    }
  } catch (erro) {
    alert('Erro ao fazer login!');
    console.log(erro);
  }
}
useEffect(() => {
  getUsers()
}, [])

return (
  <div className='container'>
    <form>
      <h1>MB<br />TURISMO</h1>

      <div className="campo">
        <label>USUÁRIO</label>
        <input type="text" ref={inputName} placeholder='Digite seu usuário' />
      </div>
      <div className="campo">
        <label>SENHA</label>
        <input type="password" ref={inputSenha} placeholder='Digite sua senha' />
      </div>
      <button type="button" onClick={handleLogin}>ENTRAR</button>
      <button type="button" onClick={createUsers}>CRIAR PERFIL</button>
    </form>
  </div>
);
}


export default Home;
