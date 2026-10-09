import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Pesquisa() {
    const navigate = useNavigate();

    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const termo = busca.trim();

        if (!termo) {
            setMensagem('Digite o nome de um ponto turístico.');
            return;
        }

        try {
            setCarregando(true);
            setMensagem('');

            const resposta = await api.get('/pontos', {
                params: {
                    nome: termo
                }
            });

            const pontos = resposta.data;

            if (!pontos || pontos.length === 0) {
                setMensagem('Nenhum ponto turístico encontrado.');
                return;
            }

            navigate(`/ponto-turistico/${pontos[0]._id}`);
        } catch (erro) {
            setMensagem(
                erro.response?.data?.mensagem ||
                'Não foi possível realizar a pesquisa.'
            );
        } finally {
            setCarregando(false);
        }
    }

    function handleVoltar() {
        navigate('/');
    }

    return (
        <main className="tela-pesquisa">
            <button
                type="button"
                className="btn-voltar"
                onClick={handleVoltar}
                aria-label="Voltar"
            >
                ←
            </button>

            <section className="conteudo-pesquisa">
                <form
                    className="barra-pesquisa"
                    onSubmit={handleSubmit}
                >
                    <button
                        type="submit"
                        className="icone-pesquisa"
                        aria-label="Pesquisar"
                        disabled={carregando}
                    >
                        🔍
                    </button>

                    <input
                        type="search"
                        className="campo-pesquisa"
                        placeholder="Encontre os pontos turísticos de Milton Brandão"
                        value={busca}
                        onChange={(event) => {
                            setBusca(event.target.value);
                            setMensagem('');
                        }}
                    />
                </form>

                {carregando && (
                    <p className="mensagem-pesquisa">
                        Pesquisando...
                    </p>
                )}

                {!carregando && mensagem && (
                    <p className="mensagem-pesquisa">
                        {mensagem}
                    </p>
                )}
            </section>
        </main>
    );
}

export default Pesquisa;