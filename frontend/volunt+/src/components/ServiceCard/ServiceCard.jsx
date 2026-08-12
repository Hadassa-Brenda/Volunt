import { ExternalLink, Flag, Heart, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import "./ServiceCard.css";

export function ServiceCard({ service }) {
  const locationLabel =
    service.modality === "Online" ? "Online" : `${service.neighborhood}, BH`;

  return (
    <article className="service-card">
      <div
        className="service-card__image"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <span
          className={`service-card__badge ${
            service.modality === "Online" ? "service-card__badge--online" : ""
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
          <div>
            <a href={service.whatsapp || "#contato"} aria-label="Entrar em contato pelo WhatsApp"><MessageCircle size={18} /></a>
            <a href={service.instagram || "#detalhes"} aria-label="Abrir informações do serviço"><ExternalLink size={17} /></a>
          </div>
          <Link
            className="service-card__report"
            to={`/denunciar/${service.id}`}
            aria-label={`Denunciar o serviço ${service.title}`}
            title="Denunciar serviço"
          >
            <Flag size={15} />
            Denunciar
          </Link>
        </div>
      </div>
    </article>
  );
}
