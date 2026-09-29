import { useEffect, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { List, LogOut, Menu, Plus, UserRound, X } from "lucide-react";

import { getVoluntUserForClerkUser } from "../../utils/userProfileStorage";

import "./Header.css";

export default function Header({ onCreateUser, onOpenLogin }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const clerkUserId = clerkUser?.id || "";
  const clerkEmail =
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [voluntUser, setVoluntUser] = useState(null);
  const userType = String(voluntUser?.tipoUsuario || "").trim().toLowerCase();
  const userProfile = String(voluntUser?.perfilUsuario || "")
    .trim()
    .toLowerCase();
  const canManageServices =
    ["pj", "pessoa jurídica", "pessoa juridica"].includes(userType) ||
    ["pf", "ofertante"].includes(userProfile);

  useEffect(() => {
    function updateVoluntUser() {
      setVoluntUser(
        isSignedIn
          ? getVoluntUserForClerkUser({
              id: clerkUserId,
              primaryEmailAddress: { emailAddress: clerkEmail },
            })
          : null,
      );
    }

    updateVoluntUser();
    window.addEventListener("storage", updateVoluntUser);
    window.addEventListener("volunt-user-profile-updated", updateVoluntUser);

    return () => {
      window.removeEventListener("storage", updateVoluntUser);
      window.removeEventListener("volunt-user-profile-updated", updateVoluntUser);
    };
  }, [clerkEmail, clerkUserId, isSignedIn]);

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
        {isLoaded && isSignedIn && (
          <>
            {canManageServices && (
              <div className="header__service-actions">
                <Link
                  className="header__service-link"
                  to="/cadastrar-servico"
                  aria-label="Criar serviço"
                  title="Criar serviço"
                  onClick={() => setMenuOpen(false)}
                >
                  <Plus size={18} />
                  <span>Criar serviço</span>
                </Link>
                <Link
                  className="header__service-link"
                  to="/meus-servicos"
                  aria-label="Meus serviços"
                  title="Meus serviços"
                  onClick={() => setMenuOpen(false)}
                >
                  <List size={18} />
                  <span>Meus serviços</span>
                </Link>
              </div>
            )}
          <div className="header__clerk-account">
            <Link
              className="header__account-link"
              to="/perfil"
              aria-label="Meu perfil Voluntá+"
              onClick={() => setMenuOpen(false)}
            >
              <UserRound size={19} />
              <span>Meu perfil</span>
            </Link>
            <button
              className="header__signout"
              type="button"
              aria-label="Sair da conta"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
          </>
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
