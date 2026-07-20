import { ImagePlus, MapPin, Monitor } from "lucide-react";
import { ReviewItem } from "../../../../../components/ReviewItem/ReviewItem";
import { ReviewSection } from "../../steps/ReviewSection";

export function ReviewStep({ formData, errors, onChange, onEditStep, texts }) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>{texts.step}</span>
        <h2>{texts.title}</h2>
        <p>{texts.description}</p>
      </div>

      <div className="review-layout">
        <article className="review-service-card">
          <div className="review-service-image">
            {formData.imagePreview ? (
              <img src={formData.imagePreview} alt={formData.title} />
            ) : (
              <div className="review-image-placeholder">
                <ImagePlus size={34} />
                <span>Sem imagem</span>
              </div>
            )}

            <span>{formData.category}</span>
          </div>

          <div className="review-service-content">
            <h3>{formData.title}</h3>

            <p>{formData.description}</p>

            <div className="review-service-information">
              <span>
                <Monitor size={16} />
                {formData.modality}
              </span>

              {formData.modality !== "Online" && (
                <span>
                  <MapPin size={16} />
                  {[formData.neighborhood, formData.city]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              )}
            </div>
          </div>
        </article>

        <div className="review-sections">
          <ReviewSection
            title="Informações principais"
            onEdit={() => onEditStep(1)}
          >
            <ReviewItem label="Título" value={formData.title} />
            <ReviewItem label="Categoria" value={formData.category} />
            <ReviewItem label="Descrição" value={formData.description} />
          </ReviewSection>

          <ReviewSection title="Atendimento" onEdit={() => onEditStep(2)}>
            <ReviewItem label="Modalidade" value={formData.modality} />

            <ReviewItem
              label="Cidade"
              value={formData.city || "Não se aplica"}
            />

            <ReviewItem
              label="Bairro"
              value={formData.neighborhood || "Não informado"}
            />

            <ReviewItem
              label="Horários"
              value={formData.schedule || "Não informado"}
            />
          </ReviewSection>

          <ReviewSection title="Contato" onEdit={() => onEditStep(3)}>
            <ReviewItem
              label="WhatsApp"
              value={formData.whatsapp || "Não informado"}
            />

            <ReviewItem
              label="Instagram"
              value={formData.instagram || "Não informado"}
            />

            <ReviewItem
              label="E-mail"
              value={formData.email || "Não informado"}
            />

            <ReviewItem
              label="Site"
              value={formData.website || "Não informado"}
            />
          </ReviewSection>
        </div>
      </div>

      <div className="review-confirmations">
        <label className="confirmation-checkbox">
          <input
            type="checkbox"
            name="freeService"
            checked={formData.freeService}
            onChange={onChange}
          />

          <span>{texts.freeService}</span>
        </label>

        {errors.freeService && (
          <small className="field-error">{errors.freeService}</small>
        )}

        <label className="confirmation-checkbox">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={onChange}
          />

          <span>{texts.acceptTerms}</span>
        </label>

        {errors.acceptTerms && (
          <small className="field-error">{errors.acceptTerms}</small>
        )}
      </div>

      <div className="review-warning">
        <strong>{texts.warning.title}</strong>

        <p>{texts.warning.description}</p>
      </div>
    </section>
  );
}
