import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function PontosTuristicos() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ponto, setPonto] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [media, setMedia] = useState(0);
    const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const nomeNormalizado = ponto?.nome
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    const semFoto = nomeNormalizado === 'serra do morcego';

    const nomeExibido = nomeNormalizado === 'igreja'
        ? 'Igreja do Sagrado Coração de Jesus'
        : ponto?.nome;

    async function carregarPonto() {
        try {
            setCarregando(true);
            setMensagem('');

            const resposta = await api.get(`/pontos/${id}`);
            setPonto(resposta.data);
        } catch (erro) {
            setMensagem(
                erro.response?.data?.mensagem ||
                'Não foi possível carregar o ponto turístico.'
            );
        } finally {
            setCarregando(false);
        }
    }

    async function carregarAvaliacoes() {
        try {
            setCarregandoAvaliacoes(true);
            setMensagem('');

            const resposta = await api.get(`/avaliacoes/ponto/${id}`);

            setAvaliacoes(resposta.data.avaliacoes || []);
            setMedia(resposta.data.media || 0);
            setMostrarAvaliacoes(true);
        } catch (erro) {
            setMensagem(
                erro.response?.data?.mensagem ||
                'Não foi possível carregar as avaliações.'
            );
        } finally {
            setCarregandoAvaliacoes(false);
        }
    }

    useEffect(() => {
        carregarPonto();
    }, [id]);

    function handleVoltar() {
        navigate('/pesquisa');
    }

    function handleTrilha() {
        navigate(`/trilha/${id}`);
    }

    function handleAvaliacoes() {
        if (mostrarAvaliacoes) {
            setMostrarAvaliacoes(false);
            return;
        }

        carregarAvaliacoes();
    }

    if (carregando) {
        return (
            <main className="pagina-ponto">
                <p className="mensagem-ponto">
                    Carregando ponto turístico...
                </p>
            </main>
        );
    }

    if (!ponto) {
        return (
            <main className="pagina-ponto">
                <button
                    type="button"
                    className="btn-voltar-ponto"
                    onClick={handleVoltar}
                    aria-label="Voltar"
                >
                    ←
                </button>

                <p className="mensagem-ponto">
                    {mensagem || 'Ponto turístico não encontrado.'}
                </p>
            </main>
        );
    }

    return (
        <main className="pagina-ponto">
            <button
                type="button"
                className="btn-voltar-ponto"
                onClick={handleVoltar}
                aria-label="Voltar"
            >
                ←
            </button>

            <section className={`imagem-ponto ${semFoto ? 'ponto-sem-foto' : ''}`}>
                {!semFoto && (
                    <img
                        src={ponto.imagem || '/imagens/cachoeira dos nogueiras.jpeg'}
                        alt={nomeExibido}
                    />
                )}

                <div className="titulo-ponto">
                    <h1>{nomeExibido}</h1>
                    <h2>MILTON BRANDÃO-PI</h2>
                </div>
            </section>

            <section className="conteudo-ponto">
                <p className="descricao-ponto">
                    {ponto.descricao}
                </p>

                <div className="botoes-ponto">
                    <button
                        type="button"
                        className="botao-ponto"
                        onClick={handleTrilha}
                    >
                        TRILHA
                    </button>

                    <button
                        type="button"
                        className="botao-ponto"
                        onClick={handleAvaliacoes}
                    >
                        AVALIAÇÃO
                    </button>
                </div>

                {mostrarAvaliacoes && (
                    <section className="area-avaliacoes">
                        <div className="cabecalho-avaliacoes">
                            <h3>AVALIAÇÕES</h3>
                            <span>
                                Média: {Number(media).toFixed(1)}
                            </span>
                        </div>

                        {carregandoAvaliacoes && (
                            <p className="mensagem-avaliacoes">
                                Carregando avaliações...
                            </p>
                        )}

                        {!carregandoAvaliacoes && avaliacoes.length === 0 && (
                            <p className="mensagem-avaliacoes">
                                Ainda não existem avaliações.
                            </p>
                        )}

                        {!carregandoAvaliacoes && avaliacoes.length > 0 && (
                            <div className="lista-avaliacoes">
                                {avaliacoes.map((avaliacao) => (
                                    <article
                                        className="avaliacao"
                                        key={avaliacao._id}
                                    >
                                        <div className="topo-avaliacao">
                                            <strong>
                                                {avaliacao.nomeUsuario}
                                            </strong>
                                            <span>{avaliacao.nota}/5</span>
                                        </div>

                                        {avaliacao.comentario && (
                                            <p>{avaliacao.comentario}</p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </section>
        </main>
    );
}

export default PontosTuristicos;
