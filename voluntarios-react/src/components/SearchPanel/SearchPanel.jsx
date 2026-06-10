import { MapPin, Search, SlidersHorizontal, Tag } from 'lucide-react';

import { CATEGORY_FILTER_OPTIONS } from '../../constants/categories';
import { LOCATION_OPTIONS, MODALITY_OPTIONS } from '../../constants/serviceOptions';
import SelectField from '../SelectField/SelectField';
import './SearchPanel.css';

export default function SearchPanel({ filters, onFilterChange }) {
  return (
    <section className="search-panel" id="explorar">
      <label className="search-panel__input">
        <Search size={20} />
        <input
          value={filters.search}
          onChange={(event) => onFilterChange('search', event.target.value)}
          placeholder="Buscar serviços, ex: aula de violão, reforço..."
        />
      </label>

      <SelectField
        icon={MapPin}
        label="Localização"
        value="Belo Horizonte, MG"
        options={LOCATION_OPTIONS}
        onChange={() => {}}
      />

      <SelectField
        icon={Tag}
        label="Categoria"
        value={filters.category}
        options={CATEGORY_FILTER_OPTIONS}
        onChange={(value) => onFilterChange('category', value)}
      />

      <SelectField
        label="Tipo"
        value={filters.modality}
        options={MODALITY_OPTIONS}
        onChange={(value) => onFilterChange('modality', value)}
      />

      <button className="search-panel__search-button" type="button">
        Buscar
      </button>

      <button className="search-panel__advanced-button" type="button">
        <SlidersHorizontal size={18} />
        Filtros avançados
      </button>
    </section>
  );
}
