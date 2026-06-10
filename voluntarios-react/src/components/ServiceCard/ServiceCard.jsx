import { ExternalLink, Heart, MapPin, MessageCircle } from 'lucide-react';

import './ServiceCard.css';

export default function ServiceCard({ service }) {
  const locationLabel =
    service.modality === 'Online' ? 'Online' : `${service.neighborhood}, BH`;

  return (
    <article className="service-card">
      <div
        className="service-card__image"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <span
          className={`service-card__badge ${
            service.modality === 'Online' ? 'service-card__badge--online' : ''
          }`}
        >
          {service.modality}
        </span>

        <button type="button" aria-label="Favoritar serviço">
          <Heart size={18} />
        </button>
      </div>

      <div className="service-card__body">
        <span className="service-card__category">{service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>

        <div className="service-card__location">
          <MapPin size={15} />
          {locationLabel}
        </div>

        <div className="service-card__contacts">
          <a href="https://wa.me/5531999999999" aria-label="Entrar em contato pelo WhatsApp">
            <MessageCircle size={18} />
          </a>
          <a href="https://instagram.com" aria-label="Abrir Instagram do serviço">
            <ExternalLink size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}
