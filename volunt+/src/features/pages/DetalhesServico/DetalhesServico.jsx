import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ExternalLink,
  Flag,
  Globe,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Share2,
  UserRound,
  X,
} from "lucide-react";

import { Header } from "../../../components";
import Footer from "../../../layouts/Footer/Footer";
import { servicesMock } from "./constants/forms/serviceMock";
import { useServiceDetails } from "../../pages/DetalhesServico/hook/DetalhesServico";
import { InfoItem } from "../CadastrarServico/components/InfoItem/InfoItem";
import {
  buildInstagramLink,
  buildWhatsAppLink,
  formatDate,
  formatInstagram,
  formatLocation,
  formatPhone,
} from "./Utils/DetalhesServicoUtils";

import "./DetalhesServico.css";
import { ServiceNotFound } from "../../pages/DetalhesServico/components/ServiceNotFound/ServiceNotFound";

export default function DetalhesServico() {
  const { id } = useParams();
  console.log(id);

const service = servicesMock.find(
    (currentService) => String(currentService.id) === String(id),
  );
  const {
    isFavorite,
    setIsFavorite,

    reportModalOpen,
    setReportModalOpen,

    reportReason,
    setReportReason,

    reportDescription,
    setReportDescription,

    reportSent,

    handleShare,
    handleReportSubmit,
  } = useServiceDetails(service);

  

  if (!service) {
    return <ServiceNotFound />;
  }

  return (
    <main className="service-details-page">
      <Header />

      <div className="service-details-container">
        <Link className="back-link" to="/explorar">
          <ArrowLeft size={18} />
          Voltar para os serviços
        </Link>

        <nav className="service-breadcrumb" aria-label="Navegação estrutural">
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to="/explorar">Serviços</Link>
          <span>/</span>
          <span>{service.category}</span>
        </nav>

        <section className="service-hero">
          <div className="service-main-image">
            <img src={service.image} alt={service.title} />

            <span className="service-image-category">{service.category}</span>
          </div>

          <aside className="service-summary">
            <span className="service-status">Serviço voluntário gratuito</span>

            <h1>{service.title}</h1>

            <p className="service-short-description">{service.description}</p>

            <div className="service-provider-summary">
              <div className="provider-avatar">
                {service.providerImage ? (
                  <img src={service.providerImage} alt={service.provider} />
                ) : (
                  <UserRound size={24} />
                )}
              </div>

              <div>
                <span>Oferecido por</span>
                <strong>{service.provider}</strong>
                <small>{service.providerType || "Projeto voluntário"}</small>
              </div>
            </div>

            <div className="service-summary-actions">
              <a
                className="primary-contact-button"
                href={buildWhatsAppLink(service.whatsapp, service.title)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={20} />
                Entrar em contato
              </a>

              <button
                type="button"
                className={`secondary-icon-button ${
                  isFavorite ? "secondary-icon-button--favorite" : ""
                }`}
                onClick={() => setIsFavorite((current) => !current)}
                aria-label={
                  isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
                title={
                  isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <Heart size={21} fill={isFavorite ? "currentColor" : "none"} />
              </button>

              <button
                type="button"
                className="secondary-icon-button"
                onClick={handleShare}
                aria-label="Compartilhar serviço"
                title="Compartilhar"
              >
                <Share2 size={21} />
              </button>
            </div>

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

              <p>{service.fullDescription || service.description}</p>
            </section>

            <section className="details-section">
              <h2>Informações do atendimento</h2>

              <div className="service-information-grid">
                <InfoItem
                  icon={<Monitor size={21} />}
                  label="Modalidade"
                  value={service.modality}
                />

                <InfoItem
                  icon={<MapPin size={21} />}
                  label="Localização"
                  value={formatLocation(service)}
                />

                <InfoItem
                  icon={<Clock3 size={21} />}
                  label="Horários"
                  value={
                    service.schedule || "Combine diretamente com o responsável"
                  }
                />

                <InfoItem
                  icon={<CalendarDays size={21} />}
                  label="Publicado em"
                  value={formatDate(service.publishedAt)}
                />
              </div>
            </section>

            {service.requirements && (
              <section className="details-section">
                <h2>Quem pode participar</h2>
                <p>{service.requirements}</p>
              </section>
            )}

            <section className="details-section">
              <h2>Sobre quem oferece</h2>

              <div className="provider-card">
                <div className="provider-card-avatar">
                  {service.providerImage ? (
                    <img src={service.providerImage} alt={service.provider} />
                  ) : (
                    <UserRound size={30} />
                  )}
                </div>

                <div className="provider-card-content">
                  <div>
                    <h3>{service.provider}</h3>

                    <span>{service.providerType || "Projeto voluntário"}</span>
                  </div>

                  <p>
                    {service.providerDescription ||
                      "Responsável por oferecer este serviço voluntário para a comunidade."}
                  </p>

                  <Link to={`/perfil/${service.providerId || 1}`}>
                    Ver perfil
                    <ExternalLink size={15} />
                  </Link>
                </div>
              </div>
            </section>

            <button
              type="button"
              className="report-service-button"
              onClick={() => setReportModalOpen(true)}
            >
              <Flag size={17} />
              Reportar informação incorreta
            </button>
          </div>

          <aside className="service-contact-card">
            <h2>Informações de contato</h2>

            <p>
              Use um dos canais abaixo para falar diretamente com o responsável.
            </p>

            <div className="contact-list">
              {service.whatsapp && (
                <InfoItem
                  icon={<MessageCircle size={20} />}
                  label="WhatsApp"
                  value={formatPhone(service.whatsapp)}
                  href={buildWhatsAppLink(service.whatsapp, service.title)}
                />
              )}

              {service.instagram && (
                <InfoItem
                  icon={<Instagram size={20} />}
                  label="Instagram"
                  value={formatInstagram(service.instagram)}
                  href={buildInstagramLink(service.instagram)}
                />
              )}

              {service.email && (
                <InfoItem
                  icon={<Mail size={20} />}
                  label="E-mail"
                  value={service.email}
                  href={`mailto:${service.email}`}
                />
              )}

              {service.website && (
                <InfoItem
                  icon={<Globe size={20} />}
                  label="Site"
                  value="Acessar site"
                  href={service.website}
                />
              )}
            </div>

            {!service.whatsapp &&
              !service.instagram &&
              !service.email &&
              !service.website && (
                <p className="no-contact-message">
                  Nenhum contato foi informado.
                </p>
              )}

            <div className="service-update-information">
              <span>Última atualização</span>
              <strong>
                {formatDate(service.updatedAt || service.publishedAt)}
              </strong>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {reportModalOpen && (
        <div className="report-modal-overlay">
          <div
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <div className="report-modal-header">
              <div>
                <h2 id="report-modal-title">Reportar serviço</h2>
                <p>
                  Conte o que está errado para que nossa equipe possa revisar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                aria-label="Fechar denúncia"
              >
                <X size={22} />
              </button>
            </div>

            {reportSent ? (
              <div className="report-success">
                <strong>Denúncia enviada com sucesso.</strong>
                <p>O serviço será analisado pela equipe responsável.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit}>
                <label className="report-field">
                  <span>Motivo da denúncia</span>

                  <select
                    value={reportReason}
                    onChange={(event) => setReportReason(event.target.value)}
                    required
                  >
                    <option value="">Selecione um motivo</option>
                    <option value="invalid-contact">
                      Contato não funciona
                    </option>
                    <option value="service-unavailable">
                      Serviço não existe mais
                    </option>
                    <option value="incorrect-information">
                      Informação incorreta
                    </option>
                    <option value="commercial-content">
                      Conteúdo comercial
                    </option>
                    <option value="inappropriate-content">
                      Conteúdo inadequado
                    </option>
                    <option value="possible-fraud">Possível fraude</option>
                    <option value="other">Outro</option>
                  </select>
                </label>

                <label className="report-field">
                  <span>Descreva o problema</span>

                  <textarea
                    value={reportDescription}
                    onChange={(event) =>
                      setReportDescription(event.target.value)
                    }
                    placeholder="Explique o que você encontrou..."
                    rows={5}
                  />
                </label>

                <div className="report-modal-actions">
                  <button
                    type="button"
                    className="cancel-report-button"
                    onClick={() => setReportModalOpen(false)}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="submit-report-button">
                    Enviar denúncia
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
