import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Monitor,
  Heart,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Header } from "../../components";
import Footer from "../../layouts/Footer/Footer";
import "../CatalogoServicos/CatalogoServicos.css";
import { initialFilters } from "../CatalogoServicos/constants/forms/initialFilters";
import { servicesMock } from "../CatalogoServicos/constants/forms/serviceMock";

export default function CatalogoServicos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sortOrder, setSortOrder] = useState("recent");
  const [favorites, setFavorites] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
  };

  const toggleFavorite = (serviceId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(serviceId)
        ? currentFavorites.filter((id) => id !== serviceId)
        : [...currentFavorites, serviceId]
    );
  };

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const result = servicesMock.filter((service) => {
      const matchesSearch =
        !normalizedSearch ||
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch) ||
        service.provider.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        !filters.category || service.category === filters.category;

      const matchesModality =
        !filters.modality || service.modality === filters.modality;

      const matchesCity = !filters.city || service.city === filters.city;

      const matchesNeighborhood =
        !filters.neighborhood ||
        service.neighborhood === filters.neighborhood;

      const matchesProviderType =
        !filters.providerType ||
        service.providerType === filters.providerType;

      const matchesPublicationDate = checkPublicationDate(
        service.publishedAt,
        filters.publicationDate
      );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesModality &&
        matchesCity &&
        matchesNeighborhood &&
        matchesProviderType &&
        matchesPublicationDate
      );
    });

    return [...result].sort((firstService, secondService) => {
      const firstDate = new Date(firstService.publishedAt);
      const secondDate = new Date(secondService.publishedAt);

      if (sortOrder === "oldest") {
        return firstDate - secondDate;
      }

      if (sortOrder === "alphabetical") {
        return firstService.title.localeCompare(secondService.title);
      }

      return secondDate - firstDate;
    });
  }, [searchTerm, filters, sortOrder]);

  return (
    <main className="catalog-page">
      <Header />

      <section className="catalog-container">
        <header className="catalog-heading">
          <div>
            <h1>Explorar serviços</h1>
            <p>Encontre iniciativas voluntárias perto de você.</p>
          </div>
        </header>

        <form
          className="catalog-search"
          onSubmit={(event) => event.preventDefault()}
        >
          <Search size={21} aria-hidden="true" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por serviço, palavra-chave ou responsável..."
            aria-label="Buscar serviços"
          />

          <button type="submit" aria-label="Pesquisar">
            <Search size={20} />
          </button>
        </form>

        <button
          className="mobile-filter-button"
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal size={19} />
          Filtros
        </button>

        <div className="catalog-layout">
          <aside
            className={`catalog-filters ${
              mobileFiltersOpen ? "catalog-filters--open" : ""
            }`}
          >
            <div className="filters-mobile-header">
              <h2>Filtros</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Fechar filtros"
              >
                <X size={22} />
              </button>
            </div>

            <div className="filters-header">
              <h2>Filtros</h2>

              <button type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>

            <FilterSelect
              label="Categoria"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              defaultOption="Todas as categorias"
              options={[
                "Educação",
                "Música",
                "Tecnologia",
                "Esporte",
                "Alimentação",
                "Doações",
                "Saúde",
                "Animais",
                "Serviços gerais",
                "Apoio comunitário",
              ]}
            />

            <FilterSelect
              label="Modalidade"
              name="modality"
              value={filters.modality}
              onChange={handleFilterChange}
              defaultOption="Todas"
              options={["Online", "Presencial", "Ambos"]}
            />

            <FilterSelect
              label="Cidade"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              defaultOption="Todas as cidades"
              options={["Belo Horizonte", "Contagem", "Betim"]}
            />

            <FilterSelect
              label="Bairro"
              name="neighborhood"
              value={filters.neighborhood}
              onChange={handleFilterChange}
              defaultOption="Todos os bairros"
              options={[
                "Centro",
                "Savassi",
                "Pampulha",
                "Venda Nova",
                "Barreiro",
                "Eldorado",
              ]}
            />

            <FilterSelect
              label="Tipo de responsável"
              name="providerType"
              value={filters.providerType}
              onChange={handleFilterChange}
              defaultOption="Todos"
              options={["ONG", "Projeto social", "Pessoa física"]}
            />

            <FilterSelect
              label="Data de publicação"
              name="publicationDate"
              value={filters.publicationDate}
              onChange={handleFilterChange}
              defaultOption="Qualquer data"
              options={[
                {
                  label: "Últimos 7 dias",
                  value: "7",
                },
                {
                  label: "Últimos 30 dias",
                  value: "30",
                },
                {
                  label: "Últimos 90 dias",
                  value: "90",
                },
              ]}
            />

            <button
              className="apply-filters-button"
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Aplicar filtros
            </button>
          </aside>

          {mobileFiltersOpen && (
            <button
              className="filters-overlay"
              type="button"
              aria-label="Fechar filtros"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}

          <section className="services-results">
            <div className="results-header">
              <p>
                <strong>{filteredServices.length}</strong>{" "}
                {filteredServices.length === 1
                  ? "serviço encontrado"
                  : "serviços encontrados"}
              </p>

              <label className="sort-select">
                <span>Ordenar por:</span>

                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <option value="recent">Mais recentes</option>
                  <option value="oldest">Mais antigos</option>
                  <option value="alphabetical">Ordem alfabética</option>
                </select>

                <ChevronDown size={16} />
              </label>
            </div>

            {filteredServices.length > 0 ? (
              <>
                <div className="services-grid">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isFavorite={favorites.includes(service.id)}
                      onFavorite={() => toggleFavorite(service.id)}
                    />
                  ))}
                </div>

                <nav
                  className="catalog-pagination"
                  aria-label="Paginação de serviços"
                >
                  <button type="button" disabled>
                    ‹
                  </button>

                  <button type="button" className="active">
                    1
                  </button>

                  <button type="button">2</button>
                  <button type="button">3</button>
                  <span>...</span>
                  <button type="button">10</button>
                  <button type="button">›</button>
                </nav>
              </>
            ) : (
              <div className="empty-results">
                <Search size={36} />

                <h2>Nenhum serviço encontrado</h2>

                <p>
                  Tente alterar os filtros ou buscar usando outras palavras.
                </p>

                <button type="button" onClick={clearFilters}>
                  Limpar busca e filtros
                </button>
              </div>
            )}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterSelect({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
}) {
  return (
    <label className="filter-field">
      <span>{label}</span>

      <div className="filter-select-wrapper">
        <select name={name} value={value} onChange={onChange}>
          <option value="">{defaultOption}</option>

          {options.map((option) => {
            const optionValue =
              typeof option === "string" ? option : option.value;

            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <ChevronDown size={16} />
      </div>
    </label>
  );
}

function ServiceCard({ service, isFavorite, onFavorite }) {
  return (
    <article className="service-card">
      <div className="service-card-image">
        <img src={service.image} alt="" />

        <button
          type="button"
          className={`favorite-button ${
            isFavorite ? "favorite-button--active" : ""
          }`}
          onClick={onFavorite}
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="service-card-content">
        <span
          className={`service-category service-category--${normalizeCategory(
            service.category
          )}`}
        >
          {service.category}
        </span>

        <h2>{service.title}</h2>

        <p className="service-description">{service.description}</p>

        <div className="service-card-information">
          <p>
            <MapPin size={16} />
            {service.city}, MG
          </p>

          <p>
            <Monitor size={16} />
            {service.modality}
          </p>
        </div>

        <div className="service-provider">
          <div>
            <span>Oferecido por</span>
            <strong>{service.provider}</strong>
          </div>

          <a href={`/servicos/${service.id}`}>Ver detalhes</a>
        </div>
      </div>
    </article>
  );
}

function normalizeCategory(category) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function checkPublicationDate(date, selectedPeriod) {
  if (!selectedPeriod) {
    return true;
  }

  const serviceDate = new Date(`${date}T00:00:00`);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate - serviceDate;
  const differenceInDays =
    differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays <= Number(selectedPeriod);
}