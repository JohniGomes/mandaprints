export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div className="foot__brand">
          <div className="foot__wordmark">
            Manda<em>Prints</em>
          </div>
          <div className="foot__sub">Fotografias autorais · Coleção de quadros decorativos</div>
        </div>
        <div className="foot__cols">
          <div>
            <div className="foot__col-h">Navegar</div>
            <ul>
              <li>
                <a href="#fotografo">O fotógrafo</a>
              </li>
              <li>
                <a href="#colecoes">Coleções</a>
              </li>
              <li>
                <a href="#galeria">Galeria</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="foot__col-h">Contato</div>
            <ul>
              <li>
                <a href="https://wa.me/5551989739921" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="/fale-conosco">Fale Conosco</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="foot__col-h">Curadoria</div>
            <ul>
              <li>
                <a href="/material-qualidade">Material e Qualidade</a>
              </li>
              <li>
                <a href="/troca-devolucao">Troca e Devolução</a>
              </li>
              <li>
                <a href="/politica-entrega">Política de Entrega</a>
              </li>
              <li>
                <a href="/politica-privacidade">Política de Privacidade</a>
              </li>
              <li>
                <a href="/rastreio">Rastreio do Pedido</a>
              </li>
              <li>
                <a href="/dicas">Dicas</a>
              </li>
              <li>
                <a href="/faq">Perguntas Frequentes</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot__bot">
        <div>© {new Date().getFullYear()} — Filipe Lara Fotografia</div>
        <div>Todas as imagens são obra autoral · reprodução não autorizada</div>
        <div>BRL · pt-BR</div>
      </div>
    </footer>
  );
}
