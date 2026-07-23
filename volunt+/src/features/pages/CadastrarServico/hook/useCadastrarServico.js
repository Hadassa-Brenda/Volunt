import { useState } from "react";
import { initialFormData, steps } from "../types/CadastrarServicoConst";

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
        if (!formData.title.trim()) newErrors.title = "Informe o título.";

        if (!formData.category) newErrors.category = "Selecione uma categoria.";

        if (formData.description.trim().length < 30)
          newErrors.description =
            "Descrição deve possuir no mínimo 30 caracteres.";

        break;

      case 2:
        if (!formData.modality)
          newErrors.modality = "Selecione uma modalidade.";

        if (formData.modality !== "Online" && !formData.city.trim()) {
          newErrors.city = "Informe a cidade.";
        }

        break;

      case 3:
        const hasContact =
          formData.whatsapp ||
          formData.instagram ||
          formData.email ||
          formData.website;

        if (!hasContact) newErrors.contact = "Informe pelo menos um contato.";

        break;

      case 4:
        if (!formData.freeService)
          newErrors.freeService = "Confirme que é gratuito.";

        if (!formData.acceptTerms) newErrors.acceptTerms = "Aceite os termos.";

        break;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const previousStep = () => {
    setErrors({});
    setCurrentStep((step) => Math.max(step - 1, 1));
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

  const resetForm = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
    setSubmitted(false);
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

    handleImageChange,
    removeImage,
    handleSubmit,
    resetForm,
  };
}
