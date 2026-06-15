import { useState } from "react";
import { MapPin, Search, SlidersHorizontal, Tag } from "lucide-react";

import {
  CATEGORY_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
} from "../../constants/categories";
import { MODALITY_OPTIONS } from "../../constants/serviceOptions";

import SelectField from "../SelectField/SelectField";
import Button from "../Button/Button";
import ServiceModal from "../ServiceModal/ServiceModal";

import { DEFAULT_FORM } from "../ServiceModal/ServiceModalConstantes";

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
          icon={MapPin}
          label="Localização"
          value={filters.location}
          options={LOCATION_FILTER_OPTIONS}
          onChange={(value) => onFilterChange("location", value)}
        />

        <SelectField
          icon={Tag}
          label="Categoria"
          value={filters.category}
          options={CATEGORY_FILTER_OPTIONS}
          onChange={(value) => onFilterChange("category", value)}
        />

        <SelectField
          label="Modalidade"
          value={filters.modality}
          options={MODALITY_OPTIONS}
          onChange={(value) => onFilterChange("modality", value)}
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
