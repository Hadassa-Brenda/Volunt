import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { CATEGORIAS } from "../../types/enum/Categories";
import { SERVICE_MODALITIES } from "../../types/enum/Modalities";

import MultiSelect from "../MultiSelect.tsx/MultiSelect";
import Button from "../Button/Button";
import ServiceModal from "../ServiceModal/ServiceModal";
import {
  getLocationOptions,
  getCategoryOptions,
  getModalityOptions,
} from "utils/optionsUtils";

import "./SearchPanel.css";

export default function SearchPanel({
  filters,
  onFilterChange,
  onApplyFilters,
  data,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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
          value={filters.locations || []}
          options={getLocationOptions(data)}
          onChange={(event) => {
            onFilterChange("locations", event.target.value);
          }}
        />

        <MultiSelect
          label="Categoria"
          width="200px"
          value={filters.category || []}
          options={getCategoryOptions(data)}
          onChange={(event) => onFilterChange("category", event.target.value)}
        />

        <MultiSelect
          label="Modalidade"
          width="200px"
          value={filters.modality || []}
          options={getModalityOptions(data)}
          onChange={(event) => onFilterChange("modality", event.target.value)}
        />

        <Button
          className="search-panel__advanced-button"
          icon={<SlidersHorizontal size={18} />}
          type="button"
          onClick={() => setIsAdvancedOpen(true)}
        >
          Filtros avançados
        </Button>
      </section>

      {isAdvancedOpen && (
        <ServiceModal
          filters={filters}
          onClose={() => setIsAdvancedOpen(false)}
          onApplyFilters={(newFilters) => {
            onApplyFilters(newFilters);
            setIsAdvancedOpen(false);
          }}
          data={data}
        />
      )}
    </>
  );
}
