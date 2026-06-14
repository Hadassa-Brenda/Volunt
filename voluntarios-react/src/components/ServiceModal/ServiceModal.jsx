import { useState } from "react";
import { X } from "lucide-react";

import { SERVICE_CATEGORIES } from "../../constants/categories";
import { SERVICE_MODALITIES } from "../../constants/serviceOptions";
import "./ServiceModal.css";

export default function ServiceModal({ initialForm, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="service-modal" role="dialog" aria-modal="true">
      <form className="service-modal__content" onSubmit={handleSubmit}>
        <div className="service-modal__header">
          <div>
            <span>Novo serviço</span>
            <h2>Cadastrar serviço voluntário</h2>
          </div>

          <button type="button" onClick={onClose} aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        <div className="service-modal__form-grid">
          <label className="service-modal__full-field">
            Nome do serviço
            <input
              required
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Ex: Aula gratuita de violão"
            />
          </label>

          <label>
            Categoria
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
            >
              {SERVICE_CATEGORIES.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tipo
            <select
              value={form.modality}
              onChange={(event) => updateField("modality", event.target.value)}
            >
              {SERVICE_MODALITIES.map((modality) => (
                <option key={modality} value={modality}>
                  {modality}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cidade
            <input
              required
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Ex: Belo Horizonte, MG"
            />
          </label>

          <label>
            Bairro
            <input
              required
              value={form.neighborhood}
              onChange={(event) =>
                updateField("neighborhood", event.target.value)
              }
              placeholder="Ex: São Gabriel"
            />
          </label>

          <label className="service-modal__full-field">
            Descrição
            <textarea
              required
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Explique como o serviço funciona"
              rows="4"
            />
          </label>
        </div>

        <div className="service-modal__actions">
          <button
            className="service-modal__cancel"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button className="service-modal__save" type="submit">
            Salvar serviço
          </button>
        </div>
      </form>
    </div>
  );
}
