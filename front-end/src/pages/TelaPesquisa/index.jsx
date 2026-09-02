import './style.css';
function TelaPesquisa() {
    return (
        <div className="tela-pesquisa">
            <button className="btn-voltar">←</button>
            <div className="barra-pesquisa">
                <span className="icone-pesquisa">🔍</span>
                <input
                    type="text"
                    placeholder="Encontre os pontos turísticos de Milton Brandão"
                    className="campo-pesquisa"
                />
            </div>
            <div className="imagem-fundo"></div>
        </div>
    );
}
export default TelaPesquisa;
