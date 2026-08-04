import { Plus } from "lucide-react";
import "./Header.css";
import { Link } from "react-router-dom"

export default function Header({ onCreateUser, onOpenLogin }) {
  return (
    <header className="header">
      <Link to="/" className="header__brand" aria-label="Voluntá+ início">
        <span className="header__brand-icon">♡</span>
        <strong>Voluntá+</strong>
      </Link>

      <nav className="header__nav" aria-label="Menu principal">
        <Link to="/" className="header__nav-link header__nav-link--active">
          Início
        </Link>

        <Link to="about-volunteering" className="header__nav-link">
          Sobre
        </Link>
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
