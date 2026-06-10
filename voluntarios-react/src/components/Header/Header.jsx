import { ChevronDown, Moon, Plus } from 'lucide-react';

import './Header.css';

export default function Header({ onOpenServiceModal }) {
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
        <button className="header__icon-button" type="button" aria-label="Alternar tema">
          <Moon size={18} />
        </button>

        <button className="header__primary-button" type="button" onClick={onOpenServiceModal}>
          <Plus size={18} />
          Cadastrar serviço
        </button>

        <div className="header__profile">
          <span className="header__avatar">M</span>
          <strong>Maria Silva</strong>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
