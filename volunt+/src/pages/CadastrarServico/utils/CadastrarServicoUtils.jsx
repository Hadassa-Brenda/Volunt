import {steps} from "../constants/CadastrarServicoConst";
import {useMemo} from "react";

export const validateStep = () => {
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

export const goToNextStep = () => {
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

export const goToPreviousStep = () => {
    setErrors({});

    setCurrentStep((currentStepValue) =>
      Math.max(currentStepValue - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };