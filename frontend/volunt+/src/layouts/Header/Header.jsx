import { Menu, Plus, X } from "lucide-react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ onCreateUser, onOpenLogin }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("volunt-user") || "null");
  const isBeneficiario = user?.perfilUsuario === "BF";
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

      {user && (
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

          {!isBeneficiario && (
            <Link
              to="/cadastrar-servico"
              className="header__nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Criar Serviço
            </Link>
          )}
          <Link
            to="/catalogo-servicos"
            className="header__nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Catalógo de Serviços
          </Link>
          {!isBeneficiario && (
            <Link
              to="/meus-servicos"
              className="header__nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Meus Serviços
            </Link>
          )}
        </nav>
      )}

      <div className="header__actions">
        {user ? (
          <>
            <Link
              className="header__profile"
              to={`/perfil/${user.id}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="header__avatar">
                {(user.fullName || user.name || "U").slice(0, 1).toUpperCase()}
              </span>
              <span>Minha conta</span>
            </Link>
          </>
        ) : (
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
