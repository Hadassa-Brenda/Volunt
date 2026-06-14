import { MapPin, SlidersHorizontal, Tag } from "lucide-react";
import { CATEGORY_FILTER_OPTIONS } from "../../constants/categories";
import { MODALITY_OPTIONS } from "../../constants/serviceOptions";
import SelectField from "../SelectField/SelectField";
import "./SearchPanel.css";
import Button from "../Button/Button";

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

      <Button className="search-panel__search-button">
        Buscar
      </Button>
     
      <Button
        className="search-panel__advanced-button"
        icon={<SlidersHorizontal size={18} />}
      >
        Filtros avançados
      </Button>
    </section>
  );
}
