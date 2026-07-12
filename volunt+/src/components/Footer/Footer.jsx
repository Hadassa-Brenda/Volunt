import { Heart} from "lucide-react";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <h2 style={{ color: "#f1f1f1" }}>Voluntários</h2>
          <p>Conectando pessoas que querem ajudar com quem precisa de ajuda.</p>
        </div>

        <div className="footer__column">
          <h3 style={{ color: "#f1f1f1" }}>Navegação</h3>
          <a href="#top">Início</a>
          <a href="#explorar">Explorar serviços</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#sobre">Sobre</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          Feito com <Heart size={15} fill="currentColor" /> para conectar
          pessoas.
        </p>

        <span>© 2026 Hadassa. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
