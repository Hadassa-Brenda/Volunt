import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ImagePlus,
  MapPin,
  MessageCircle,
  Monitor,
  Upload,
  X
} from "lucide-react";

import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import {initialFormData, steps} from "../CadastrarServico/constants/CadastrarServicoConst"
import { FormField } from "components/FormField/FormField";
import "../CadastrarServico/CadastrarServico.css";
import {Stepper} from "../../components/Stepper/Stepper";

export default function CadastrarServico() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

   const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Informe o título do serviço.";
      }

      if (!formData.category) {
        newErrors.category = "Selecione uma categoria.";
      }

      if (formData.description.trim().length < 30) {
        newErrors.description =
          "A descrição deve ter pelo menos 30 caracteres.";
      }
    }

    if (currentStep === 2) {
      if (!formData.modality) {
        newErrors.modality = "Selecione a modalidade.";
      }

      if (
        formData.modality !== "Online" &&
        !formData.city.trim()
      ) {
        newErrors.city = "Informe a cidade.";
      }
    }

    if (currentStep === 3) {
      const hasContact =
        formData.whatsapp.trim() ||
        formData.instagram.trim() ||
        formData.email.trim() ||
        formData.website.trim();

      if (!hasContact) {
        newErrors.contact =
          "Informe pelo menos uma forma de contato.";
      }

      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Informe um e-mail válido.";
      }
    }

    if (currentStep === 4) {
      if (!formData.freeService) {
        newErrors.freeService =
          "Confirme que o serviço é gratuito.";
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms =
          "Você precisa aceitar os termos.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

   const goToNextStep = () => {
    if (!validateStep()) {
      return;
    }

    setCurrentStep((currentStepValue) =>
      Math.min(currentStepValue + 1, steps.length)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 const goToPreviousStep = () => {
    setErrors({});

    setCurrentStep((currentStepValue) =>
      Math.max(currentStepValue - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: "Selecione um arquivo de imagem válido.",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        image: "A imagem deve ter no máximo 5 MB.",
      }));

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((currentData) => {
      if (currentData.imagePreview) {
        URL.revokeObjectURL(currentData.imagePreview);
      }

      return {
        ...currentData,
        image: file,
        imagePreview: previewUrl,
      };
    });

    setErrors((currentErrors) => ({
      ...currentErrors,
      image: "",
    }));
  };

  const removeImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData((currentData) => ({
      ...currentData,
      image: null,
      imagePreview: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateStep()) {
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      modality: formData.modality,
      city: formData.city,
      neighborhood: formData.neighborhood,
      schedule: formData.schedule,
      whatsapp: formData.whatsapp,
      instagram: formData.instagram,
      email: formData.email,
      website: formData.website,
      image: formData.image,
      status: "pending",
    };

    console.log("Serviço enviado:", payload);

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
    setSubmitted(false);
  };

  return (
    <main className="create-service-page">
      <Header />
      <section className="create-service-container">
        {submitted ? (
          <SuccessContent
            serviceTitle={formData.title}
            onCreateAnother={resetForm}
          />
        ) : (
          <>
            <header className="create-service-heading">
              <span>Cadastro de serviço</span>

              <h1>Cadastre um serviço voluntário</h1>

              <p>
                Compartilhe uma iniciativa gratuita e ajude mais pessoas
                a encontrá-la.
              </p>
            </header>

            <Stepper
              currentStep={currentStep}
              steps={steps}
            />

            <form
              className="create-service-form"
              onSubmit={handleSubmit}
            >
              <div className="create-service-card">
                {currentStep === 1 && (
                  <BasicInformationStep
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                    onRemoveImage={removeImage}
                  />
                )}

                {currentStep === 2 && (
                  <AttendanceStep
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                  />
                )}

                {currentStep === 3 && (
                  <ContactStep
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                  />
                )}

                {currentStep === 4 && (
                  <ReviewStep
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onEditStep={setCurrentStep}
                  />
                )}
              </div>

              <div className="create-service-actions">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="secondary-action-button"
                    onClick={goToPreviousStep}
                  >
                    <ArrowLeft size={18} />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    className="primary-action-button"
                    onClick={goToNextStep}
                  >
                    Próximo
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="primary-action-button"
                  >
                    <Check size={18} />
                    Enviar para análise
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}

function BasicInformationStep({
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
        <p>
          Explique de forma clara qual serviço será oferecido.
        </p>
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
          label="Categoria"
          name="category"
          value={formData.category}
          onChange={onChange}
          error={errors.category}
          required
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
            <small>
              Mínimo recomendado: 30 caracteres
            </small>

            <small>{formData.description.length} caracteres</small>
          </div>

          {errors.description && (
            <small className="field-error">
              {errors.description}
            </small>
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

              <p>
                Clique para selecionar ou arraste uma imagem até aqui.
              </p>

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

function AttendanceStep({
  formData,
  errors,
  onChange,
}) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 2 de 4</span>
        <h2>Como será o atendimento?</h2>
        <p>
          Informe a modalidade, localização e horários disponíveis.
        </p>
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

          <p>
            Como o serviço é online, cidade e bairro não são
            obrigatórios.
          </p>
        </div>
      )}
    </section>
  );
}

function ContactStep({
  formData,
  errors,
  onChange,
}) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 3 de 4</span>
        <h2>Informações de contato</h2>
        <p>
          Informe pelo menos um canal para que as pessoas possam
          falar com você.
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
        <div className="general-form-error">
          {errors.contact}
        </div>
      )}

      <div className="form-information-box">
        <MessageCircle size={20} />

        <p>
          Esses contatos poderão aparecer publicamente na página do
          serviço após a aprovação.
        </p>
      </div>
    </section>
  );
}

function ReviewStep({
  formData,
  errors,
  onChange,
  onEditStep,
}) {
  return (
    <section className="form-step">
      <div className="form-step-header">
        <span>Etapa 4 de 4</span>
        <h2>Revise seu serviço</h2>
        <p>
          Confira as informações antes de enviar para análise.
        </p>
      </div>

      <div className="review-layout">
        <article className="review-service-card">
          <div className="review-service-image">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt={formData.title}
              />
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
            <ReviewItem
              label="Título"
              value={formData.title}
            />

            <ReviewItem
              label="Categoria"
              value={formData.category}
            />

            <ReviewItem
              label="Descrição"
              value={formData.description}
            />
          </ReviewSection>

          <ReviewSection
            title="Atendimento"
            onEdit={() => onEditStep(2)}
          >
            <ReviewItem
              label="Modalidade"
              value={formData.modality}
            />

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

          <ReviewSection
            title="Contato"
            onEdit={() => onEditStep(3)}
          >
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

          <span>
            Declaro que este serviço é gratuito ou voluntário.
          </span>
        </label>

        {errors.freeService && (
          <small className="field-error">
            {errors.freeService}
          </small>
        )}

        <label className="confirmation-checkbox">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={onChange}
          />

          <span>
            Confirmo que as informações são verdadeiras e aceito os
            termos de uso da plataforma.
          </span>
        </label>

        {errors.acceptTerms && (
          <small className="field-error">
            {errors.acceptTerms}
          </small>
        )}
      </div>

      <div className="review-warning">
        <strong>O que acontece depois?</strong>

        <p>
          O serviço será enviado para moderação com o status
          “Pendente”. Ele só ficará disponível publicamente após a
          aprovação.
        </p>
      </div>
    </section>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
}) {
  return (
    <label className="form-field">
      <span>
        {label} {required && <strong>*</strong>}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      >
        <option value="">Selecione uma opção</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <small className="field-error">{error}</small>
      )}
    </label>
  );
}


function ReviewSection({ title, onEdit, children }) {
  return (
    <section className="review-section">
      <div className="review-section-header">
        <h3>{title}</h3>

        <button type="button" onClick={onEdit}>
          Editar
        </button>
      </div>

      <div className="review-section-content">{children}</div>
    </section>
  );
}

function SuccessContent({ serviceTitle, onCreateAnother }) {
  return (
    <section className="service-success">
      <div className="service-success-icon">
        <CheckCircle2 size={52} />
      </div>

      <span>Cadastro concluído</span>

      <h1>Serviço enviado para análise!</h1>

      <p>
        O serviço <strong>{serviceTitle}</strong> foi cadastrado e
        agora será revisado pela equipe da plataforma.
      </p>

      <div className="service-success-status">
        <span>Status atual</span>
        <strong>Pendente de aprovação</strong>
      </div>

      <div className="service-success-actions">
        <button
          type="button"
          className="secondary-action-button"
          onClick={onCreateAnother}
        >
          Cadastrar outro serviço
        </button>

        <a
          href="/meus-servicos"
          className="primary-action-button"
        >
          Ver meus serviços
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}