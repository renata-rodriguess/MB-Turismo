import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Trilhas() {
    const navigate = useNavigate();
    const { pontoId } = useParams();

    const [trilha, setTrilha] = useState(null);
    const [ponto, setPonto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');

    const normalizarNome = (nome = '') =>
        nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const nomePonto = trilha?.pontoTuristico?.nome || ponto?.nome || 'Ponto turístico';
    const nomeNormalizado = normalizarNome(nomePonto);
    const serraDoMorcego = nomeNormalizado === 'serra do morcego';

    const imagemPadrao = nomeNormalizado === 'cachoeira dos ferreiras'
        ? '/imagens/cachoeira dos nogueiras.jpeg'
        : '';

    const imagemPonto = ponto?.imagem || imagemPadrao;

    async function carregarTrilha() {
        try {
            setCarregando(true);
            setMensagem('');

            const respostaPonto = await api.get(`/pontos/${pontoId}`);
            setPonto(respostaPonto.data);

            if (normalizarNome(respostaPonto.data.nome) === 'serra do morcego') {
                setTrilha(null);
                return;
            }

            const respostaTrilha = await api.get(`/trilhas/ponto/${pontoId}`);
            setTrilha(respostaTrilha.data);
        } catch (erro) {
            setTrilha(null);
            setMensagem(
                erro.response?.data?.mensagem ||
                'Não foi possível carregar as informações da trilha.'
            );
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarTrilha();
    }, [pontoId]);

    function handleVoltar() {
        navigate(`/ponto-turistico/${pontoId}`);
    }

    if (carregando) {
        return (
            <main className="pagina-trilha">
                <p className="mensagem-trilha">Carregando informações...</p>
            </main>
        );
    }

    if (serraDoMorcego) {
        return (
            <main className="pagina-trilha">
                <button
                    type="button"
                    className="btn-voltar-trilha"
                    onClick={handleVoltar}
                    aria-label="Voltar"
                >
                    ←
                </button>

                <section className="quadro-trilha aviso-serra">
                    <p className="mensagem-trilha">
                        <strong>
                            A trilha da Serra do Morcego ainda não está disponível
                        </strong>
                    </p>

                    <p className="mensagem-trilha">
                        O percurso precisa ser sinalizado adequadamente, com
                        instalação de placas ao longo do caminho. Essas placas
                        serão fotografadas e utilizadas na elaboração de um guia
                        com imagens e instruções escritas para orientar os
                        visitantes durante o trajeto.
                    </p>

                    <p className="mensagem-trilha">
                        Assim que essa etapa for concluída, as informações da
                        trilha serão disponibilizadas nesta página.
                    </p>
                </section>
            </main>
        );
    }

    if (!trilha) {
        return (
            <main className="pagina-trilha">
                <button
                    type="button"
                    className="btn-voltar-trilha"
                    onClick={handleVoltar}
                    aria-label="Voltar"
                >
                    ←
                </button>

                <p className="mensagem-trilha">
                    {mensagem || 'Trilha não encontrada.'}
                </p>
            </main>
        );
    }

    const passos = trilha.passos || trilha.etapas || [];

    return (
        <main className="pagina-trilha">
            <button
                type="button"
                className="btn-voltar-trilha"
                onClick={handleVoltar}
                aria-label="Voltar"
            >
                ←
            </button>

            <section className="cabecalho-trilha">
                <h1>DESTINO: {nomePonto}</h1>

                {imagemPonto && (
                    <img
                        src={imagemPonto}
                        alt={nomePonto}
                        className="imagem-trilha"
                    />
                )}
            </section>

            <section className="quadro-trilha">
                {passos.map((passo, index) => (
                    <div className="item-trilha" key={passo._id || index}>
                        <div className="numero-etapa">
                            {passo.ordem || index + 1}
                        </div>

                        <div className="conteudo-etapa">
                            <h2>{passo.titulo || `Etapa ${index + 1}`}</h2>
                            <p>{passo.descricao}</p>

                            {passo.direcao && (
                                <p>{passo.direcao}</p>
                            )}
                        </div>
                    </div>
                ))}

                {passos.length === 0 && (
                    <p className="mensagem-trilha">
                        Nenhuma etapa cadastrada para esta trilha.
                    </p>
                )}
            </section>
        </main>
    );
}

export default Trilhas;
