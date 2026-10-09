import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Login() {
    const navigate = useNavigate();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setMensagem('');

        if (!nomeUsuario.trim() || !senha) {
            setMensagem('Digite seu usuário e sua senha.');
            return;
        }

        try {
            setCarregando(true);

            const resposta = await api.post('/usuarios/login', {
                nomeUsuario: nomeUsuario.trim(),
                senha
            });

            const { token, usuario } = resposta.data;

            sessionStorage.setItem('mb_turismo_token', token);
            sessionStorage.setItem(
                'mb_turismo_usuario',
                JSON.stringify(usuario)
            );

            navigate('/pesquisa');
        } catch (erro) {
            const mensagemErro =
                erro.response?.data?.mensagem ||
                'Não foi possível realizar o login.';

            setMensagem(mensagemErro);
        } finally {
            setCarregando(false);
        }
    }

    function handleCriarPerfil() {
        navigate('/cadastro');
    }

    return (
        <main className="container">
            <h1>MB TURISMO</h1>

            <form onSubmit={handleLogin}>
                <div className="campo">
                    <label htmlFor="nomeUsuario">USUÁRIO</label>

                    <input
                        id="nomeUsuario"
                        type="text"
                        value={nomeUsuario}
                        onChange={(event) =>
                            setNomeUsuario(event.target.value)
                        }
                        autoComplete="username"
                    />
                </div>

                <div className="campo">
                    <label htmlFor="senha">SENHA</label>

                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(event) =>
                            setSenha(event.target.value)
                        }
                        autoComplete="current-password"
                    />
                </div>

                {mensagem && (
                    <p className="mensagem-erro">
                        {mensagem}
                    </p>
                )}

                <button type="submit" disabled={carregando}>
                    {carregando ? 'ENTRANDO...' : 'ENTRAR'}
                </button>

                <button type="button" onClick={handleCriarPerfil}>
                    CRIAR PERFIL
                </button>
            </form>
        </main>
    );
}

export default Login;