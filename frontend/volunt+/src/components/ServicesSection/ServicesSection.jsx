import {ServiceCard} from "../ServiceCard/ServiceCard";
import "./ServicesSection.css";

export default function ServicesSection({ services }) {
  return (
    <section className="services-section">
      <div className="services-section__title">
        <h2>Serviços em destaque</h2>
        <a href="#explorar">Ver todos →</a>
      </div>

      {services.length > 0 ? (
        <div className="services-section__grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="services-section__empty">
          <h3>Nenhum serviço encontrado</h3>
          <p>Tente remover filtros ou buscar por outro termo.</p>
        </div>
      )}
    </section>
  );
}
