import React, { useMemo, useState, useEffect } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { Header } from "../../../components";
import Footer from "../../../layouts/Footer/Footer";
import "./CatalogoServicos.css";
import { ServiceCard } from "../../../components/ServiceCard/ServiceCard";
import { initialFilters } from "./constants/forms/initialFilters";
import { servicesMock } from "./constants/forms/serviceMock";
import { checkPublicationDate } from "./utils/CatalogoServicosUtils";
import { FilterSelect } from "../../../components/FilterSelect/FilterSelect";
import { BasicPagination } from "components/Pagination/BasicPagination";

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
        : [...currentFavorites, serviceId],
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
        !filters.neighborhood || service.neighborhood === filters.neighborhood;

      const matchesProviderType =
        !filters.providerType || service.providerType === filters.providerType;

      const matchesPublicationDate = checkPublicationDate(
        service.publishedAt,
        filters.publicationDate,
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

  const itemsPerPage = 6;

  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;


  useEffect(() => {
    setPage(1);
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
                  {filteredServices
                  .slice(start, end)
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isFavorite={favorites.includes(service.id)}
                      onFavorite={() => toggleFavorite(service.id)}
                    />
                ))}
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
                 <BasicPagination
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={8}
                    totalItems={filteredServices.length}
                /> 
                </div>
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
