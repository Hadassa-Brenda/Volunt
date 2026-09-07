import React from "react";
import { X } from "lucide-react";

import MultiSelect from "../MultiSelect.tsx/MultiSelect";
import Button from "../Button/Button";

import {
  getStateOptions,
  getLocationTypeOptions,
  getCategoryOptions,
  getGenderOptions,
  getDayWeekOptions,
  getShiftOptions,
  getScoreOptions,
} from "../../utils/optionsUtils";

import "./ServiceModal.css";

const INITIAL_FILTERS = {
  estado: [],
  tipoLocalizacao: [],
  categoria: [],
  genero: [],
  diaDaSemana: [],
  turno: [],
  avaliacao: [],
};

export default function ServiceModal({
  filters: initialFilters = INITIAL_FILTERS,
  onClose = () => {},
  onApplyFilters = () => {},
  data = [],
}) {
  const [filters, setFilters] = React.useState(initialFilters);

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }
  console.log(data, "ejdhedheud");

  function clearAdvancedFilters() {
    setFilters(INITIAL_FILTERS);
  }

  function handleApplyFilters() {
    onApplyFilters(filters);
    onClose();
  }

  React.useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="advanced-filters-modal" role="dialog" aria-modal="true">
      <div className="advanced-filters-modal__content">
        <div className="advanced-filters-modal__header">
          <div>
            <span>Busca avançada</span>

            <h2>Filtros avançados</h2>

            <p>Refine sua busca para encontrar serviços mais específicos.</p>
          </div>

          <button type="button" onClick={onClose} aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        <div className="advanced-filters-modal__grid">
          {/* ESTADO */}
          <MultiSelect
            width="100%"
            label="Estado"
            value={filters.estado}
            options={getStateOptions(data)}
            onChange={(event) =>
              handleFilterChange("estado", event.target.value)
            }
          />

          {/* TIPO DE LOCALIZAÇÃO */}
          <MultiSelect
            width="100%"
            label="Tipo de localização"
            value={filters.tipoLocalizacao}
            options={getLocationTypeOptions(data)}
            onChange={(event) =>
              handleFilterChange("tipoLocalizacao", event.target.value)
            }
          />

          {/* CATEGORIA */}
          <MultiSelect
            width="100%"
            label="Categoria"
            value={filters.categoria}
            options={getCategoryOptions(data)}
            onChange={(event) =>
              handleFilterChange("categoria", event.target.value)
            }
          />

          {/* GÊNERO */}
          <MultiSelect
            width="100%"
            label="Gênero"
            value={filters.genero}
            options={getGenderOptions(data)}
            onChange={(event) =>
              handleFilterChange("genero", event.target.value)
            }
          />

          {/* DIA DA SEMANA */}
          <MultiSelect
            width="100%"
            label="Dia da semana"
            value={filters.diaDaSemana}
            options={getDayWeekOptions(data)}
            onChange={(event) =>
              handleFilterChange("diaDaSemana", event.target.value)
            }
          />

          {/* TURNO */}
          <MultiSelect
            width="100%"
            label="Turno"
            value={filters.turno}
            options={getShiftOptions(data)}
            onChange={(event) =>
              handleFilterChange("turno", event.target.value)
            }
          />

          <MultiSelect
            width="100%"
            label="Avaliação"
            value={filters.avaliacao || []}
            options={getScoreOptions()}
            onChange={(event) =>
              handleFilterChange("avaliacao", event.target.value)
            }
          />
        </div>

        <div className="advanced-filters-modal__actions">
          <Button
            variant="secondary"
            type="button"
            onClick={clearAdvancedFilters}
          >
            Limpar filtros
          </Button>

          <Button type="button" onClick={handleApplyFilters}>
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
