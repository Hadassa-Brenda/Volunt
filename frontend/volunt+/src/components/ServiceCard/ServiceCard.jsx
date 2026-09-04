import { ExternalLink, MapPin, MessageCircle } from "lucide-react";

import { SERVICE_MODALITIES } from "../../types/enum/Modalities";

import "./ServiceCard.css";

export function ServiceCard({ service }) {
  const modalityLabel =
    SERVICE_MODALITIES.find((modality) => modality.value === service.modalities)
      ?.label ?? "Não informado";

  const locationLabel =
    service.modalities === 2
      ? "Online"
      : [service.localizacao?.bairro, service.localizacao?.cidade || "BH"]
          .filter(Boolean)
          .join(", ");

  const image =
    service.providerImage ||
    `https://picsum.photos/400/300?random=${service.id}`;

  const whatsappNumber = service.contato?.telefone?.replace(/\D/g, "");

  const instagramUsername = service.contato?.instagram?.replace("@", "");

  return (
    <article className="service-card">
      <div
        className="service-card__image"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      >
        <span
          className={`service-card__badge ${
            service.modalities === 2 ? "service-card__badge--online" : ""
          }`}
        >
          {modalityLabel}
        </span>
      </div>

      <div className="service-card__body">
        <span className="service-card__category">
          {service.categoria?.nome ?? "Outros"}
        </span>

        <h3>{service.name}</h3>

        <p>{service.descricao}</p>

        <div className="service-card__location">
          <MapPin size={15} />
          {locationLabel}
        </div>

        <div className="service-card__contacts">
          <div>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                aria-label="Entrar em contato pelo WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
              </a>
            )}

            {instagramUsername && (
              <a
                href={`https://instagram.com/${instagramUsername}`}
                aria-label="Abrir Instagram do serviço"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
