import { useState } from "react";
import { useAuth } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Plus, X } from "lucide-react";

import { useCurrentUser } from "../../context/CurrentUserContext";

import "./Header.css";

export default function Header({ onCreateUser, onOpenLogin }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user: currentUser } = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`header ${menuOpen ? "header--menu-open" : ""}`}>
      <Link to="/" className="header__brand" aria-label="Voluntá+ início">
        <span className="header__brand-icon">♡</span>
        <strong>Voluntá+</strong>
      </Link>

      <button
        className="header__menu-button"
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      {isSignedIn && (
        <nav className="header__nav" aria-label="Menu principal">
          <Link
            to="/"
            className="header__nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </Link>

          <Link
            to="/about-volunteering"
            className="header__nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </Link>

          <Link
            to="/catalogo-servicos"
            className="header__nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Catálogo de Serviços
          </Link>
        </nav>
      )}

      <div className="header__actions">
        {isLoaded && isSignedIn && currentUser?.id && (
          <Link
            className="header__profile"
            to={`/perfil/${currentUser.id}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="header__avatar">
              {(currentUser.fullName || currentUser.name || "U")
                .slice(0, 1)
                .toUpperCase()}
            </span>
            <span>Minha conta</span>
          </Link>
        )}

        {isLoaded && !isSignedIn && (
          <>
            <button
              className="header__primary-button"
              type="button"
              onClick={() => onCreateUser?.() ?? navigate("/cadastro")}
            >
              <Plus size={18} />
              Cadastrar-se
            </button>

            <button
              className="header__primary-button"
              type="button"
              onClick={() => onOpenLogin?.() ?? navigate("/login")}
            >
              Entrar
            </button>
          </>
        )}
      </div>
    </header>
  );
}
