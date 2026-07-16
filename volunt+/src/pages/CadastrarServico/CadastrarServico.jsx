import React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import {
  initialFormData,
  steps,
  reviewTexts,
} from "../CadastrarServico/constants/CadastrarServicoConst";
import "../CadastrarServico/CadastrarServico.css";
import { Stepper } from "../../components/Stepper/Stepper";
import { ReviewStep } from "../../components/ReviewStep/ReviewStep";
import { useNavigate } from "react-router-dom";
import { useCadastrarServico } from "./hook/useCadastrarServico";
import { BasicInformationStep } from "../CadastrarServico/steps/BasicInformationStep";
import { ContactStep } from "./steps/ContactStep";
import { AttendanceStep } from "./steps/AttendanceStep";
import { SuccessContent } from "./steps/SuccessContent";

export default function CadastrarServico() {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    errors,
    submitted,
    setSubmitted,
    setFormData,
    setCurrentStep,
    setErrors,
    handleChange,
    validateStep,
    nextStep,
    previousStep,
  } = useCadastrarServico();

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
      <button
        className="login-page__back-button"
        type="button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Voltar
      </button>
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
                Compartilhe uma iniciativa gratuita e ajude mais pessoas a
                encontrá-la.
              </p>
            </header>

            <Stepper currentStep={currentStep} steps={steps} />

            <form className="create-service-form" onSubmit={handleSubmit}>
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
                    texts={reviewTexts}
                  />
                )}
              </div>

              <div className="create-service-actions">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="secondary-action-button"
                    onClick={previousStep}
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
                    onClick={nextStep}
                  >
                    Próximo
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button type="submit" className="primary-action-button">
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
