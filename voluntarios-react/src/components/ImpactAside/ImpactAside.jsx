import { Check, Heart } from 'lucide-react';

import './ImpactAside.css';

const PARTICIPATION_REASONS = [
  'Ajude quem precisa na sua comunidade',
  'Desenvolva novas habilidades',
  'Conheça pessoas incríveis',
  'Faça a diferença de verdade',
];

export default function ImpactAside({ onOpenServiceModal }) {
  return (
    <aside className="impact-aside" id="sobre">
      <div className="impact-aside__card impact-aside__card--highlight">
        <div>
          <h2>Quer causar um impacto na sua comunidade?</h2>
          <p>Cadastre um serviço voluntário e alcance mais pessoas!</p>
          <button type="button" onClick={onOpenServiceModal}>
            Cadastrar serviço
          </button>
        </div>

        <div className="impact-aside__person">
          <span className="impact-aside__head" />
          <span className="impact-aside__body" />
          <Heart className="impact-aside__heart" size={44} fill="currentColor" />
        </div>
      </div>

      <div className="impact-aside__card impact-aside__card--why">
        <h2>Por que participar?</h2>
        <ul>
          {PARTICIPATION_REASONS.map((reason) => (
            <li key={reason}>
              <Check size={18} />
              {reason}
            </li>
          ))}
        </ul>
        <a href="#como-funciona">Saiba mais sobre o voluntariado →</a>
      </div>
    </aside>
  );
}
