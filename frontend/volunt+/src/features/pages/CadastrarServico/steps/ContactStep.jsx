import { FormField } from "components/FormField/FormField";

function formatPhone(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) {
    return numbers.replace(/^(\d{0,2})/, "($1");
  }

  if (numbers.length <= 7) {
    return numbers.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  }

  return numbers.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function ContactStep({ formData, errors, onChange }) {
  const handlePhoneChange = (event) => {
    const formattedValue = formatPhone(event.target.value);

    onChange({
      ...event,
      target: {
        ...event.target,
        name: "whatsapp",
        value: formattedValue,
      },
    });
  };

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
        {/* WHATSAPP */}

        <FormField
          label="WhatsApp"
          name="whatsapp"
          value={formData.whatsapp || ""}
          onChange={handlePhoneChange}
          placeholder="Ex.: (31) 99999-9999"
          error={errors.whatsapp}
        />

        {/* INSTAGRAM */}

        <FormField
          label="Instagram"
          name="instagram"
          value={formData.instagram || ""}
          onChange={onChange}
          placeholder="Ex.: @projetoaprender"
          error={errors.instagram}
        />

        {/* TELEFONE */}

        <FormField
          label="Telefone"
          name="telefone"
          value={formData.telefone || ""}
          onChange={onChange}
          placeholder="Ex.: (31) 3333-3333"
          error={errors.telefone}
        />

        {/* SITE */}

        <FormField
          label="Site ou outro link"
          name="site"
          type="url"
          value={formData.site || ""}
          onChange={onChange}
          placeholder="Ex.: https://www.projeto.org"
          error={errors.site}
        />
      </div>

      {errors.contact && (
        <div className="general-form-error">{errors.contact}</div>
      )}
    </section>
  );
}
