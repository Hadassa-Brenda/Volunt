import React from "react";
import { ModalityOption } from "components/ModalityOption/ModalityOption";
import { FormField } from "../../../../components/FormField/FormField";
import { MapPin, Monitor, MessageCircle } from "lucide-react";

export function AttendanceStep({ formData, errors, onChange }) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 2 de 4</span>
        <h2>Como será o atendimento?</h2>
        <p>Informe a modalidade, localização e horários disponíveis.</p>
      </div>

      <div className="form-field form-field--full">
        <span>
          Modalidade <strong>*</strong>
        </span>

        <div className="modality-options">
          <ModalityOption
            name="modality"
            value="Online"
            checked={formData.modality === "Online"}
            onChange={onChange}
            icon={<Monitor size={23} />}
            title="Online"
            description="O atendimento acontece pela internet."
          />

          <ModalityOption
            name="modality"
            value="Presencial"
            checked={formData.modality === "Presencial"}
            onChange={onChange}
            icon={<MapPin size={23} />}
            title="Presencial"
            description="O atendimento acontece em um local físico."
          />

          <ModalityOption
            name="modality"
            value="Ambos"
            checked={formData.modality === "Ambos"}
            onChange={onChange}
            icon={<MessageCircle size={23} />}
            title="Ambos"
            description="Disponível online e presencialmente."
          />
        </div>

        {errors.modality && (
          <small className="field-error">{errors.modality}</small>
        )}
      </div>

      <div className="form-fields-grid">
        <FormField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="Ex.: Belo Horizonte"
          error={errors.city}
          required={formData.modality !== "Online"}
          disabled={formData.modality === "Online"}
        />

        <FormField
          label="Bairro"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={onChange}
          placeholder="Ex.: Centro"
          disabled={formData.modality === "Online"}
        />

        <FormField
          label="Horários disponíveis"
          name="schedule"
          value={formData.schedule}
          onChange={onChange}
          placeholder="Ex.: Segunda e quarta, das 14h às 18h"
          fullWidth
        />
      </div>

      {formData.modality === "Online" && (
        <div className="form-information-box">
          <Monitor size={20} />

          <p>Como o serviço é online, cidade e bairro não são obrigatórios.</p>
        </div>
      )}
    </section>
  );
}
