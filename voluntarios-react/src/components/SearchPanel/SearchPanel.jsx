import { MapPin, SlidersHorizontal, Tag } from "lucide-react";

import { CATEGORY_FILTER_OPTIONS } from "../../constants/categories";
import { MODALITY_OPTIONS } from "../../constants/serviceOptions";
import SelectField from "../SelectField/SelectField";
import "./SearchPanel.css";

export default function SearchPanel({ filters, onFilterChange }) {
  return (
    <section className="search-panel" id="explorar">
      <SelectField
        icon={MapPin}
        label="Localização"
        value="Belo Horizonte, MG"
        options={CATEGORY_FILTER_OPTIONS}
        onChange={() => {}}
      />

      <SelectField
        icon={Tag}
        label="Categoria"
        value={filters.category}
        options={CATEGORY_FILTER_OPTIONS}
        onChange={(value) => onFilterChange("category", value)}
      />

      <SelectField
        label="Tipo"
        value={filters.modality}
        options={MODALITY_OPTIONS}
        onChange={(value) => onFilterChange("modality", value)}
      />

      <button className="search-panel__search-button" type="button">
        <span style={{ fontWeight: "bold", color: "white", fontSize: "12px" }}>
          Buscar
        </span>
      </button>

      <button
        className="search-panel__advanced-button"
        type="button"
        style={{ fontSize: "12px" }}
      >
        <SlidersHorizontal size={18} />
        Filtros avançados
      </button>
    </section>
  );
}
