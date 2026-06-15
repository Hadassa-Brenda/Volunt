import React from "react";
import { X } from "lucide-react";

import SelectField from "../SelectField/SelectField";
import Button from "../Button/Button";
import {
  TARGET_AUDIENCES,
  AGE_RANGES,
  AVAILABILITY_OPTIONS,
  PERIOD_OPTIONS,
  DEFAULT_FORM,
  GENEROS,
  LOCAL_DA_ATIVIDADE_OPTIONS,
} from "./ServiceModalConstantes";

import "./ServiceModal.css";

export default function ServiceModal({ onClose = () => {} }) {
  const [filters, setFilters] = React.useState(DEFAULT_FORM);
  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

  function clearAdvancedFilters() {
    handleFilterChange("targetAudience", "");
    handleFilterChange("ageRange", "");
    handleFilterChange("serviceFormat", "");
    handleFilterChange("availability", "");
    handleFilterChange("period", "");
    handleFilterChange("keyword", "");
  }

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
          <SelectField
            width="100%"
            label="Público atendido"
            value={filters.targetAudience || ""}
            options={TARGET_AUDIENCES}
            onChange={(value) => handleFilterChange("targetAudience", value)}
          />
          <SelectField
            width="100%"
            label="Faixa etária do Voluntário"
            value={filters.ageRange || ""}
            options={AGE_RANGES}
            onChange={(value) => handleFilterChange("ageRange", value)}
          />

          <SelectField
            width="100%"
            label="Disponibilidade"
            value={filters.availability || ""}
            options={AVAILABILITY_OPTIONS}
            onChange={(value) => handleFilterChange("availability", value)}
          />

          <SelectField
            width="100%"
            label="Período"
            value={filters.period || ""}
            options={PERIOD_OPTIONS}
            onChange={(value) => handleFilterChange("period", value)}
          />
          <SelectField
            width="100%"
            label="Gênero do Voluntário"
            value={filters.gender || ""}
            options={GENEROS}
            onChange={(value) => handleFilterChange("gender", value)}
          />
          <SelectField
            width="100%"
            label="Local da Atividade"
            value={filters.localDaAtividade || ""}
            options={LOCAL_DA_ATIVIDADE_OPTIONS}
            onChange={(value) => handleFilterChange("localDaAtividade", value)}
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

          <Button type="button" onClick={onClose}>
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
