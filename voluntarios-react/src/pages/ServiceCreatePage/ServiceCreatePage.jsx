import { ArrowLeft, HeartHandshake, Save } from "lucide-react";
import { useState } from "react";
import {
  SERVICE_CATEGORIES,
  SERVICE_MODALITIES,
} from "./ServiceDTO/ServiceDTO";
import {
  sanitizeServiceForm,
  validateContactRequired,
  validateServiceField,
  validateServiceForm,
} from "./ServiceCreatePageValidator";
import "./ServiceCreatePage.css";

const INITIAL_FORM = {
  title: "",
  category: "",
  modality: "",
  city: "",
  neighborhood: "",
  description: "",
  whatsapp: "",
  instagram: "",
  website: "",
};

const CONTACT_FIELDS = ["whatsapp", "instagram", "website"];

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <small id={id} className="service-create-form__error">
      {message}
    </small>
  );
}

export default function ServiceCreatePage({ onBackHome, onSubmitService }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  function updateField(field, value) {
    const nextForm = {
      ...form,
      [field]: value,
    };

    setForm(nextForm);

    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    const fieldError = validateServiceField(field, value);

    setErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
        [field]: fieldError,
      };

      if (CONTACT_FIELDS.includes(field)) {
        nextErrors.contact = validateContactRequired(nextForm);
      }

      return nextErrors;
    });
  }

  function handleBlur(field) {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    const fieldError = validateServiceField(field, form[field]);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: fieldError,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateServiceForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      setTouchedFields({
        title: true,
        category: true,
        modality: true,
        city: true,
        neighborhood: true,
        description: true,
        whatsapp: true,
        instagram: true,
        website: true,
      });

      return;
    }

    const now = new Date().toISOString();

    const newService = {
      ...sanitizeServiceForm(form),
      status: "aprovado",
      createdAt: now,
      updatedAt: now,
    };

    console.log("Serviço cadastrado:", newService);

    if (onSubmitService) {
      onSubmitService(newService);
    }

    alert("Serviço cadastrado com sucesso!");

    setForm(INITIAL_FORM);
    setErrors({});
    setTouchedFields({});
  }

  function shouldShowError(field) {
    return touchedFields[field] && errors[field];
  }

  return (
    <main className="service-create-page">
      <div className="service-create-page__container">
        <button
          className="service-create-page__back-button"
          type="button"
          onClick={onBackHome}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <section className="service-create-page__hero">
          <div className="service-create-page__icon">
            <HeartHandshake size={32} />
          </div>

          <span>Cadastro voluntário</span>

          <h1>Cadastrar serviço voluntário</h1>

          <p>
            Preencha as informações abaixo para cadastrar um serviço gratuito ou
            voluntário para a comunidade.
          </p>
        </section>

        <form
          className="service-create-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <section className="service-create-form__section">
            <div>
              <span>Informações principais</span>
              <h2>Dados do serviço</h2>
            </div>

            <div className="service-create-form__grid">
              <label className="service-create-form__full-field">
                Nome do serviço <strong>*</strong>
                <input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  onBlur={() => handleBlur("title")}
                  placeholder="Ex: Aula gratuita de violão"
                  aria-invalid={Boolean(shouldShowError("title"))}
                  aria-describedby="title-error"
                />
                <FieldError
                  id="title-error"
                  message={shouldShowError("title")}
                />
              </label>

              <label>
                Categoria <strong>*</strong>
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  onBlur={() => handleBlur("category")}
                  aria-invalid={Boolean(shouldShowError("category"))}
                  aria-describedby="category-error"
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>

                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <FieldError
                  id="category-error"
                  message={shouldShowError("category")}
                />
              </label>

              <label>
                Tipo de atendimento <strong>*</strong>
                <select
                  value={form.modality}
                  onChange={(event) =>
                    updateField("modality", event.target.value)
                  }
                  onBlur={() => handleBlur("modality")}
                  aria-invalid={Boolean(shouldShowError("modality"))}
                  aria-describedby="modality-error"
                >
                  <option value="" disabled>
                    Selecione o tipo
                  </option>

                  {SERVICE_MODALITIES.map((modality) => (
                    <option key={modality} value={modality}>
                      {modality}
                    </option>
                  ))}
                </select>
                <FieldError
                  id="modality-error"
                  message={shouldShowError("modality")}
                />
              </label>

              <label>
                Cidade <strong>*</strong>
                <input
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  onBlur={() => handleBlur("city")}
                  placeholder="Ex: Belo Horizonte, MG"
                  aria-invalid={Boolean(shouldShowError("city"))}
                  aria-describedby="city-error"
                />
                <FieldError id="city-error" message={shouldShowError("city")} />
              </label>

              <label>
                Bairro <strong>*</strong>
                <input
                  value={form.neighborhood}
                  onChange={(event) =>
                    updateField("neighborhood", event.target.value)
                  }
                  onBlur={() => handleBlur("neighborhood")}
                  placeholder="Ex: São Gabriel"
                  aria-invalid={Boolean(shouldShowError("neighborhood"))}
                  aria-describedby="neighborhood-error"
                />
                <FieldError
                  id="neighborhood-error"
                  message={shouldShowError("neighborhood")}
                />
              </label>

              <label className="service-create-form__full-field">
                Descrição <strong>*</strong>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  onBlur={() => handleBlur("description")}
                  placeholder="Explique como o serviço funciona, quem pode participar e como entrar em contato."
                  rows="5"
                  aria-invalid={Boolean(shouldShowError("description"))}
                  aria-describedby="description-error"
                />
                <FieldError
                  id="description-error"
                  message={shouldShowError("description")}
                />
              </label>
            </div>
          </section>

          <section className="service-create-form__section">
            <div>
              <span>Contato</span>
              <h2>Canais de atendimento</h2>
            </div>

            <p className="service-create-form__helper">
              Preencha pelo menos um dos campos abaixo: WhatsApp, Instagram ou
              site. <strong>*</strong>
            </p>

            <FieldError id="contact-error" message={errors.contact} />

            <div className="service-create-form__grid">
              <label>
                WhatsApp
                <input
                  value={form.whatsapp}
                  onChange={(event) =>
                    updateField("whatsapp", event.target.value)
                  }
                  onBlur={() => handleBlur("whatsapp")}
                  placeholder="Ex: (31) 99999-9999"
                  aria-invalid={Boolean(shouldShowError("whatsapp"))}
                  aria-describedby="whatsapp-error"
                />
                <FieldError
                  id="whatsapp-error"
                  message={shouldShowError("whatsapp")}
                />
              </label>

              <label>
                Instagram
                <input
                  value={form.instagram}
                  onChange={(event) =>
                    updateField("instagram", event.target.value)
                  }
                  onBlur={() => handleBlur("instagram")}
                  placeholder="Ex: @projeto.social"
                  aria-invalid={Boolean(shouldShowError("instagram"))}
                  aria-describedby="instagram-error"
                />
                <FieldError
                  id="instagram-error"
                  message={shouldShowError("instagram")}
                />
              </label>

              <label className="service-create-form__full-field">
                Site ou outro link
                <input
                  value={form.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                  onBlur={() => handleBlur("website")}
                  placeholder="Ex: https://meuprojeto.com.br"
                  aria-invalid={Boolean(shouldShowError("website"))}
                  aria-describedby="website-error"
                />
                <FieldError
                  id="website-error"
                  message={shouldShowError("website")}
                />
              </label>
            </div>
          </section>

          <div className="service-create-form__actions">
            <button
              className="service-create-form__cancel"
              type="button"
              onClick={onBackHome}
            >
              Cancelar
            </button>

            <button className="service-create-form__save" type="submit">
              <Save size={18} />
              Salvar serviço
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}