import React from "react";
import CategoryList from "../../../components/CategoryList/CategoryList";
import { FormField } from "../../../components/FormField/FormField";
import { ImagePlus } from "lucide-react";
import SelectField from "components/SelectField/SelectField";

export function BasicInformationStep({
  formData,
  errors,
  onChange,
  onImageChange,
  onRemoveImage,
}) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 1 de 4</span>
        <h2>Informações principais</h2>
        <p>Explique de forma clara qual serviço será oferecido.</p>
      </div>

      <div className="form-fields-grid">
        <FormField
          label="Título do serviço"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Ex.: Reforço escolar gratuito"
          error={errors.title}
          required
          fullWidth
        />

        <SelectField
          width="420px"
          label="Categoria"
          name="category"
          value={formData.category}
          onChange={onChange}
          error={errors.category}
          options={[
            "Educação",
            "Música",
            "Tecnologia",
            "Esporte",
            "Alimentação",
            "Doações",
            "Saúde",
            "Animais",
            "Serviços gerais",
            "Apoio comunitário",
          ]}
        />

        <label className="form-field form-field--full">
          <span>
            Descrição <strong>*</strong>
          </span>

          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Explique o objetivo do serviço, quem pode participar e como funciona o atendimento."
            rows={7}
            className={errors.description ? "input-error" : ""}
          />

          <div className="textarea-information">
            <small>Mínimo recomendado: 30 caracteres</small>

            <small>{formData.description.length} caracteres</small>
          </div>

          {errors.description && (
            <small className="field-error">{errors.description}</small>
          )}
        </label>

        <div className="form-field form-field--full">
          <span>Foto do serviço</span>

          {!formData.imagePreview ? (
            <label className="image-upload-area">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onImageChange}
              />

              <div className="image-upload-icon">
                <ImagePlus size={28} />
              </div>

              <strong>Adicione uma imagem</strong>

              <p>Clique para selecionar ou arraste uma imagem até aqui.</p>

              <small>PNG, JPG ou WEBP, com até 5 MB</small>
            </label>
          ) : (
            <div className="image-preview">
              <img
                src={formData.imagePreview}
                alt="Pré-visualização do serviço"
              />

              <button
                type="button"
                onClick={onRemoveImage}
                aria-label="Remover imagem"
              >
                <X size={19} />
              </button>

              <div className="image-preview-information">
                <Upload size={17} />

                <div>
                  <strong>{formData.image?.name}</strong>
                  <span>Imagem selecionada</span>
                </div>
              </div>
            </div>
          )}

          {errors.image && (
            <small className="field-error">{errors.image}</small>
          )}
        </div>
      </div>
    </section>
  );
}
