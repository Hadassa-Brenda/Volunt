import React from "react";
import { X } from "lucide-react";

import MultiSelect from "../MultiSelect.tsx/MultiSelect";
import Button from "../Button/Button";

import { GENDER_OPTIONS } from "../../types/enum/Gender";
import { DiaSemana } from "../../types/enum/DiaSemana";
import { Turno } from "../../types/enum/Turno";
import { Nota } from "../../types/enum/Nota";

import "./ServiceModal.css";

const INITIAL_FILTERS = {
  genero: [],
  diaDaSemana: [],
  turno: [],
  avaliacao: [],
};

export default function ServiceModal({
  filters: initialFilters = INITIAL_FILTERS,
  onClose = () => {},
  onApplyFilters = () => {},
}) {
  const [filters, setFilters] = React.useState(INITIAL_FILTERS);

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

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

        {/* FILTROS */}
        <div className="advanced-filters-modal__grid">
          {/* GÊNERO */}
          <MultiSelect
            width="100%"
            label="Gênero"
            value={filters.genero}
            options={GENDER_OPTIONS}
            onChange={(event) =>
              handleFilterChange("genero", event.target.value)
            }
          />

          {/* DIA DA SEMANA */}
          <MultiSelect
            width="100%"
            label="Dia da semana"
            value={filters.diaDaSemana}
            options={DiaSemana}
            onChange={(event) =>
              handleFilterChange("diaDaSemana", event.target.value)
            }
          />

          {/* TURNO */}
          <MultiSelect
            width="100%"
            label="Turno"
            value={filters.turno}
            options={Turno}
            onChange={(event) =>
              handleFilterChange("turno", event.target.value)
            }
          />

          {/* NOTA */}
          <MultiSelect
            width="100%"
            label="Nota"
            value={filters.avaliacao}
            options={Nota.map((nota) => ({
              value: nota,
              label: nota.toString(),
            }))}
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
