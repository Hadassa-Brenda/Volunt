import { useState } from "react";
import { Search, SlidersHorizontal, Tag } from "lucide-react";

import { SERVICE_CATEGORIES } from "../../types/enum/Categories";
import { SERVICE_MODALITIES } from "../../types/enum/Modalitires";
import SelectField from "../SelectField/SelectField";
import Button from "../Button/Button";
import ServiceModal from "../ServiceModal/ServiceModal";
import "./SearchPanel.css";

export default function SearchPanel({
  filters,
  onFilterChange,
  onSubmitService,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  function handleSubmitService(service) {
    if (onSubmitService) {
      onSubmitService(service);
    }

    setIsAdvancedOpen(false);
  }
  const LOCATION_FILTER_OPTIONS = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Porto Alegre",
  ];

  return (
    <>
      <section className="search-panel" id="explorar">
        <label className="search-panel__search-field">
          <Search size={18} />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(event) => onFilterChange("search", event.target.value)}
            placeholder="Buscar palavra-chave"
          />
        </label>
        <SelectField
          label="Localização"
          value={filters.location}
          options={LOCATION_FILTER_OPTIONS}
          onChange={(event) => onFilterChange("location", event.target.value)}
        />
        <SelectField
          label="Categoria"
          value={filters.category}
          options={SERVICE_CATEGORIES}
          onChange={(event) => onFilterChange("category", event.target.value)}
        />

        <SelectField
          label="Modalidade"
          value={filters.modality}
          options={SERVICE_MODALITIES}
          onChange={(event) => onFilterChange("modality", event.target.value)}
        />
        <Button className="search-panel__search-button" type="button">
          Buscar
        </Button>

        <Button
          className="search-panel__advanced-button"
          type="button"
          icon={<SlidersHorizontal size={18} />}
          onClick={() => setIsAdvancedOpen(true)}
        >
          Filtros avançados
        </Button>
      </section>

      {isAdvancedOpen && (
        <ServiceModal
          onClose={() => setIsAdvancedOpen(false)}
          onSubmit={handleSubmitService}
        />
      )}
    </>
  );
}
