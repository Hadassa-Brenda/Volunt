import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  UserRound,
} from "lucide-react";

import { Header } from "../../../components";
import Footer from "../../../layouts/Footer/Footer";
import Button from "components/Button/Button";
import { ServiceNotFound } from "../../pages/DetalhesServico/components/ServiceNotFound/ServiceNotFound";
import { ServiceReviews } from "components/ServiceReviews/ServiceReviews";
import { InfoItem } from "../CadastrarServico/components/InfoItem/InfoItem";

import {
  buildInstagramLink,
  buildWhatsAppLink,
  formatDate,
  formatInstagram,
  formatLocation,
  formatPhone,
} from "./Utils/DetalhesServicoUtils";

import { useService } from "hook/useService";

import { SERVICE_MODALITIES } from "../../../types/enum/Modalities";
import { DiaSemana } from "../../../types/enum/DiaSemana";
import { Turno } from "../../../types/enum/Turno";

import "./DetalhesServico.css";
import "../../../styles/global.css";

export default function DetalhesServico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { service, loading, error } = useService(id);

  if (loading) {
    return (
      <main className="service-details-page">
        <Header />

        <div className="service-details-container">
          <p>Carregando serviço...</p>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !service) {
    return <ServiceNotFound />;
  }

  /*
   * Avaliações
   *
   * Aceita tanto:
   * - service.avaliacoes
   * - service.avaliacao
   */
  const serviceReviews = Array.isArray(service.avaliacoes)
    ? service.avaliacoes
    : Array.isArray(service.avaliacao)
      ? service.avaliacao
      : service.avaliacao
        ? [service.avaliacao]
        : [];

  const serviceId = service.id;

  /*
   * Modalidade
   */
  const modalityLabel =
    SERVICE_MODALITIES.find(
      (item) => String(item.value) === String(service.modalities),
    )?.label ??
    service.modalities ??
    "Não informado";

  /*
   * Contatos
   */
  const whatsapp = service.contato?.telefone;
  const instagram = service.contato?.instagram;
  const website = service.contato?.site;
  const email = service.usuario?.email;

  /*
   * Imagem do serviço
   */
  const image =
    service.providerImage ||
    `https://picsum.photos/600/400?random=${serviceId}`;

  /*
   * Agendamentos
   *
   * O DTO atual utiliza:
   * AgendarServico
   *
   * Caso o backend utilize:
   * agendamentos
   *
   * os dois formatos são aceitos.
   */
  const rawSchedules = service.agendamentos?.length
    ? service.agendamentos
    : service.AgendarServico
      ? service.AgendarServico
      : [];

  const schedules = Array.isArray(rawSchedules) ? rawSchedules : [rawSchedules];

  const schedule =
    schedules.length > 0
      ? schedules
          .map((agendamento) => {
            if (!agendamento) {
              return null;
            }

            const dayValue =
              agendamento.diaSemana ??
              agendamento.diaDaSemana ??
              agendamento.dia ??
              "";

            const shiftValue = agendamento.turno ?? agendamento.horario ?? "";

            const dayLabel =
              DiaSemana.find(
                (item) =>
                  String(item.value).toLowerCase() ===
                  String(dayValue).toLowerCase(),
              )?.label ?? dayValue;

            const shiftLabel =
              Turno.find(
                (item) =>
                  String(item.value).toLowerCase() ===
                  String(shiftValue).toLowerCase(),
              )?.label ?? shiftValue;

            if (dayLabel && shiftLabel) {
              return `${dayLabel}, Turno: ${shiftLabel}`;
            }
            if (dayLabel) {
              return String(dayLabel);
            }

            if (shiftLabel) {
              return String(shiftLabel);
            }

            return null;
          })
          .filter(Boolean)
          .join(", ") || "Combine diretamente com o responsável"
      : "Combine diretamente com o responsável";

  return (
    <main className="service-details-page">
      <Header />

      <div className="service-details-container">
        <Button
          className="catalog-back-button"
          variant="ghost"
          size="small"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft size={18} />}
        >
          Voltar
        </Button>

        <nav className="service-breadcrumb" aria-label="Navegação estrutural">
          <Link to="/">Início</Link>

          <span>/</span>

          <Link to="/catalogo-servicos">Serviços</Link>

          <span>/</span>

          <span>{service.categoria?.nome ?? "Serviço"}</span>
        </nav>

        <section className="service-hero">
          <div className="service-main-image">
            <img src={image} alt={service.name ?? "Imagem do serviço"} />

            <span className="service-image-category">
              {service.categoria?.nome ?? "Outros"}
            </span>
          </div>

          <aside className="service-summary">
            <span className="service-status">Serviço voluntário gratuito</span>

            <h1>{service.name}</h1>

            <p className="service-short-description">
              {service.descricao || "Nenhuma descrição informada."}
            </p>

            <div className="service-provider-summary">
              <div className="provider-avatar">
                {service.providerImage ? (
                  <img
                    src={service.providerImage}
                    alt={service.usuario?.fullName ?? "Ofertante"}
                  />
                ) : (
                  <UserRound size={24} />
                )}
              </div>

              <div>
                <span>Oferecido por</span>

                <strong>{service.usuario?.fullName ?? "Não informado"}</strong>

                <small>
                  {service.usuario?.tipoUsuario ?? "Projeto voluntário"}
                </small>
              </div>
            </div>

            {whatsapp && (
              <div className="service-summary-actions">
                <a
                  className="primary-contact-button"
                  href={buildWhatsAppLink(whatsapp, service.name)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={20} />
                  Entrar em contato
                </a>
              </div>
            )}

            <p className="contact-warning">
              A plataforma apenas divulga o serviço. Confirme as informações
              diretamente com o responsável.
            </p>
          </aside>
        </section>

        <div className="service-details-layout">
          <div className="service-details-content">
            <section className="details-section">
              <h2>Sobre o serviço</h2>

              <p>{service.descricao || "Nenhuma descrição informada."}</p>
            </section>

            <section className="details-section">
              <h2>Informações do atendimento</h2>

              <div className="service-information-grid">
                <InfoItem
                  icon={<Monitor size={21} />}
                  label="Modalidade"
                  value={modalityLabel}
                />

                <InfoItem
                  icon={<MapPin size={21} />}
                  label="Localização"
                  value={formatLocation(service) || "Não informado"}
                />

                <InfoItem
                  icon={<Clock3 size={21} />}
                  label="Horários"
                  value={schedule}
                />

                <InfoItem
                  icon={<CalendarDays size={21} />}
                  label="Publicado em"
                  value={formatDate(service.publicationDate) || "Não informado"}
                />
              </div>
            </section>

            <section className="details-section">
              <h2>Sobre quem oferece</h2>

              <div className="provider-card">
                <div className="provider-card-avatar">
                  {service.providerImage ? (
                    <img
                      src={service.providerImage}
                      alt={service.usuario?.fullName ?? "Ofertante"}
                    />
                  ) : (
                    <UserRound size={30} />
                  )}
                </div>

                <div className="provider-card-content">
                  <div>
                    <h3>{service.usuario?.fullName ?? "Não informado"}</h3>

                    <span>
                      {service.usuario?.tipoUsuario ?? "Projeto voluntário"}
                    </span>
                  </div>

                  <p>
                    Responsável por oferecer este serviço voluntário para a
                    comunidade.
                  </p>

                  {service.idUsuario && (
                    <Link to={`/perfil/${service.idUsuario}`}>
                      Ver perfil
                      <ExternalLink size={15} />
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <ServiceReviews
              reviews={serviceReviews}
              onSubmitReview={async (review) => {
                console.log({
                  idServico: service.id,
                  ...review,
                });
              }}
            />
          </div>

          <aside className="service-contact-card">
            <h2>Informações de contato</h2>

            <p>
              Use um dos canais abaixo para falar diretamente com o responsável.
            </p>

            <div className="contact-list">
              {whatsapp && (
                <InfoItem
                  icon={<MessageCircle size={20} />}
                  label="WhatsApp"
                  value={formatPhone(whatsapp)}
                  href={buildWhatsAppLink(whatsapp, service.name)}
                />
              )}

              {instagram && (
                <InfoItem
                  icon={<Instagram size={20} />}
                  label="Instagram"
                  value={formatInstagram(instagram)}
                  href={buildInstagramLink(instagram)}
                />
              )}

              {email && (
                <InfoItem
                  icon={<Mail size={20} />}
                  label="E-mail"
                  value={email}
                  href={`mailto:${email}`}
                />
              )}

              {website && (
                <InfoItem
                  icon={<Globe size={20} />}
                  label="Site"
                  value="Acessar site"
                  href={website}
                />
              )}
            </div>

            {!whatsapp && !instagram && !email && !website && (
              <p className="no-contact-message">
                Nenhum contato foi informado.
              </p>
            )}

            <div className="service-update-information">
              <span>Última atualização</span>

              <strong>{formatDate(service.publicationDate)}</strong>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
