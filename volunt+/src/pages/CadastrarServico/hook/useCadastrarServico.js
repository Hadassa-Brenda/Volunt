import { useState } from "react";
import { initialFormData, steps } from "../constants/CadastrarServicoConst";

export function useCadastrarServico() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.title.trim())
          newErrors.title = "Informe o título.";

        if (!formData.category)
          newErrors.category = "Selecione uma categoria.";

        if (formData.description.trim().length < 30)
          newErrors.description =
            "Descrição deve possuir no mínimo 30 caracteres.";

        break;

      case 2:
        if (!formData.modality)
          newErrors.modality = "Selecione uma modalidade.";

        if (
          formData.modality !== "Online" &&
          !formData.city.trim()
        ) {
          newErrors.city = "Informe a cidade.";
        }

        break;

      case 3:
        const hasContact =
          formData.whatsapp ||
          formData.instagram ||
          formData.email ||
          formData.website;

        if (!hasContact)
          newErrors.contact =
            "Informe pelo menos um contato.";

        break;

      case 4:
        if (!formData.freeService)
          newErrors.freeService =
            "Confirme que é gratuito.";

        if (!formData.acceptTerms)
          newErrors.acceptTerms =
            "Aceite os termos.";

        break;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep((step) =>
      Math.min(step + 1, steps.length)
    );
  };

  const previousStep = () => {
    setErrors({});
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  return {
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
  };
}