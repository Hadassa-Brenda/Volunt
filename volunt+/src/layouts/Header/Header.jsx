import { Plus } from "lucide-react";
import "./Header.css";

export default function Header({ onCreateUser, onOpenLogin }) {
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label="Voluntá+ início">
        <span className="header__brand-icon">♡</span>
        <strong>Voluntá+</strong>
      </a>

      <nav className="header__nav" aria-label="Menu principal">
        <a className="header__nav-link header__nav-link--active" href="#top">
          Início
        </a>

        <a className="header__nav-link" href="#explorar">
          Explorar
        </a>

        <a className="header__nav-link" href="#categorias">
          Categorias
        </a>

        <a className="header__nav-link" href="#como-funciona">
          Como funciona
        </a>

        <a className="header__nav-link" href="#sobre">
          Sobre
        </a>
      </nav>

      <div className="header__actions">
        <button
          className="header__primary-button"
          type="button"
          onClick={onCreateUser}
        >
          <Plus size={18} />
          Cadastrar-se
        </button>

        <button
          className="header__primary-button"
          type="button"
          onClick={onOpenLogin}
        >
          Entrar
        </button>
      </div>
    </header>
  );
}
