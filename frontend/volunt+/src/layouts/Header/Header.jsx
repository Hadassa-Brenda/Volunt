import { Plus, UserRound } from "lucide-react";
import "./Header.css";
import { Link } from "react-router-dom"

export default function Header({ onCreateUser, onOpenLogin }) {
  const user = JSON.parse(localStorage.getItem("volunt-user") || "null");
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

        <Link to="/about-volunteering" className="header__nav-link">
          Sobre
        </Link>
      </nav>

      <div className="header__actions">
        {user ? <Link className="header__profile" to="/meus-servicos"><span className="header__avatar">{(user.fullName || user.name || "U").slice(0, 1).toUpperCase()}</span><span>Minha conta</span></Link> : <>
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
        </>}
      </div>
    </header>
  );
}
