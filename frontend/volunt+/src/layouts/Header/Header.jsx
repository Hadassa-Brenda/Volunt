import { Plus } from "lucide-react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ onCreateUser, onOpenLogin }) {
  const user = JSON.parse(localStorage.getItem("volunt-user") || "null");

  const isOfertante = user?.perfilUsuario?.toString().toUpperCase() === "PF";

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

        {isOfertante && (
          <Link to="/cadastrar-servico" className="header__nav-link">
            Criar Serviço
          </Link>
        )}

        <Link to="/catalogo-servicos" className="header__nav-link">
          Catálogo de Serviços
        </Link>

        {isOfertante && (
          <Link to="/meus-servicos" className="header__nav-link">
            Meus Serviços
          </Link>
        )}
      </nav>

      <div className="header__actions">
        {user ? (
          <Link className="header__profile" to={`/perfil/${user.id}`}>
            <span className="header__avatar">
              {(user.fullName || "U").slice(0, 1).toUpperCase()}
            </span>

            <span>Minha conta</span>
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
