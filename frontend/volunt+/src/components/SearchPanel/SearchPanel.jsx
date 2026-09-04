import { useState } from "react";
import { Search, SlidersHorizontal, Tag } from "lucide-react";

import { CATEGORIAS } from "../../types/enum/Categories";
import { SERVICE_MODALITIES } from "../../types/enum/Modalities";
import MultiSelect from "../MultiSelect.tsx/MultiSelect";
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
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "MG", label: "Belo Horizonte" },
    { value: "PR", label: "Curitiba" },
    { value: "RS", label: "Porto Alegre" },
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
        <MultiSelect
          label="Localização"
          width="200px"
          value={filters.location}
          options={LOCATION_FILTER_OPTIONS}
          onChange={(event) => onFilterChange("location", event.target.value)}
        />
        <MultiSelect
          label="Categoria"
          width="200px"
          value={filters.category}
          options={CATEGORIAS}
          onChange={(event) => onFilterChange("category", event.target.value)}
        />

        <MultiSelect
          label="Modalidade"
          width="200px"
          value={filters.modality}
          options={SERVICE_MODALITIES.map((modality) => ({
            value: modality.value,
            label: modality.label,
          }))}
          onChange={(event) => onFilterChange("modality", event.target.value)}
        />
        <Button className="search-panel__search-button" type="button">
          Buscar
        </Button>

        <Button
          className="search-panel__advanced-button"
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
