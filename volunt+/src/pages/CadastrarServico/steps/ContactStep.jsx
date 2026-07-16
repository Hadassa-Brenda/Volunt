import { FormField } from "components/FormField/FormField";
import { MessageCircle } from "lucide-react";

export function ContactStep({ formData, errors, onChange }) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 3 de 4</span>
        <h2>Informações de contato</h2>
        <p>
          Informe pelo menos um canal para que as pessoas possam falar com você.
        </p>
      </div>

      <div className="form-fields-grid">
        <FormField
          label="WhatsApp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={onChange}
          placeholder="Ex.: (31) 99999-9999"
        />

        <FormField
          label="Instagram"
          name="instagram"
          value={formData.instagram}
          onChange={onChange}
          placeholder="Ex.: @projetoaprender"
        />

        <FormField
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Ex.: contato@projeto.org"
          error={errors.email}
        />

        <FormField
          label="Site ou outro link"
          name="website"
          type="url"
          value={formData.website}
          onChange={onChange}
          placeholder="Ex.: https://www.projeto.org"
        />
      </div>

      {errors.contact && (
        <div className="general-form-error">{errors.contact}</div>
      )}

      <div className="form-information-box">
        <MessageCircle size={20} />

        <p>
          Esses contatos poderão aparecer publicamente na página do serviço após
          a aprovação.
        </p>
      </div>
    </section>
  );
}
