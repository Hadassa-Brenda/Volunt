import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import Header from "../../../../layouts/Header/Header";
import Footer from "../../../../layouts/Footer/Footer";
import Button from "../../../../components/Button/Button";

import { getServiceById } from "../../../../service/serviceService";

import {
  initialFormData,
  steps,
} from "../../CadastrarServico/types/CadastrarServicoConst";

import { Stepper } from "features/pages/CadastrarServico/components/Stepper/Stepper";

import { FormStepContent } from "features/pages/CadastrarServico/components/FormStepContent/FormStepContent";

import "./EditServicePage.css";
import "../../../../styles/global.css";

export default function EditServicePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [id]);

  function loadService() {
    try {
      const service = getServiceById(id);

      if (!service) {
        alert("Serviço não encontrado.");

        navigate("/meus-servicos");

        return;
      }

      console.log("SERVIÇO MAPEADO:", service);

      console.log("CATEGORIA:", service.categoria);

      console.log("LOCALIZAÇÃO:", service.localizacao);

      console.log("CONTATO:", service.contato);

      console.log("AGENDAMENTOS:", service.agendamentos);

      const agendamento = service.agendamentos?.[0];

      setFormData({
        ...initialFormData,

        title: service.name || "",

        description: service.descricao || "",

        category: service.categoria?.id ?? service.idCategoria ?? "",

        modality: service.modalities ?? "",

        city: service.localizacao?.cidade || "",

        neighborhood: service.localizacao?.bairro || "",

        schedule: agendamento
          ? `${agendamento.diaSemana} - ${agendamento.turno}`
          : "",

        whatsapp: service.contato?.whatsapp || "",

        instagram: service.contato?.instagram || "",

        email: service.contato?.email || "",

        website: service.contato?.website || "",

        image: null,

        imagePreview: service.providerImage || "",

        freeService: true,

        acceptTerms: true,
      });
    } catch (error) {
      console.error("Erro ao carregar serviço:", error);

      alert("Não foi possível carregar o serviço.");

      navigate("/meus-servicos");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,

      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validateCurrentStep() {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title?.trim()) {
        newErrors.title = "Informe o título.";
      }

      if (!formData.category) {
        newErrors.category = "Selecione uma categoria.";
      }

      if (
        !formData.description?.trim() ||
        formData.description.trim().length < 30
      ) {
        newErrors.description =
          "Descrição deve possuir no mínimo 30 caracteres.";
      }
    }

    if (currentStep === 2) {
      if (!formData.modality) {
        newErrors.modality = "Selecione uma modalidade.";
      }

      if (formData.modality !== "Online" && !formData.city?.trim()) {
        newErrors.city = "Informe a cidade.";
      }
    }

    if (currentStep === 3) {
      const hasContact =
        formData.whatsapp ||
        formData.instagram ||
        formData.email ||
        formData.website;

      if (!hasContact) {
        newErrors.contact = "Informe pelo menos um contato.";
      }
    }

    if (currentStep === 4) {
      if (!formData.freeService) {
        newErrors.freeService = "Confirme que é gratuito.";
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Aceite os termos.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((current) => Math.min(current + 1, steps.length));
  }

  function previousStep() {
    setErrors({});

    setCurrentStep((current) => Math.max(current - 1, 1));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        image: "Selecione um arquivo de imagem válido.",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "A imagem deve ter no máximo 5 MB.",
      }));

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((current) => ({
      ...current,

      image: file,

      imagePreview: previewUrl,
    }));

    setErrors((current) => ({
      ...current,
      image: "",
    }));
  }

  function removeImage() {
    setFormData((current) => ({
      ...current,

      image: null,

      imagePreview: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    try {
      const storedServices = localStorage.getItem("volunt-services");

      const services = storedServices ? JSON.parse(storedServices) : [];

      const updatedServices = services.map((service) => {
        if (Number(service.id) !== Number(id)) {
          return service;
        }

        return {
          ...service,

          /*
           * Informações básicas
           */
          name: formData.title,

          descricao: formData.description,

          idCategoria: Number(formData.category),

          modalities: formData.modality,

          status: service.status,

          providerImage: formData.imagePreview || service.providerImage,

          city: formData.city,

          neighborhood: formData.neighborhood,

          schedule: formData.schedule,

          whatsapp: formData.whatsapp,

          instagram: formData.instagram,

          email: formData.email,

          website: formData.website,

          freeService: formData.freeService,

          acceptTerms: formData.acceptTerms,
        };
      });

      localStorage.setItem("volunt-services", JSON.stringify(updatedServices));

      alert("Serviço atualizado com sucesso!");

      navigate("/meus-servicos");
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);

      alert("Não foi possível salvar as alterações.");
    }
  }

  if (loading) {
    return (
      <main className="edit-service-page">
        <Header />

        <section className="edit-service-loading">
          <p>Carregando serviço...</p>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="edit-service-page">
      <Header />

      <div className="edit-service-back">
        <Button
          className="back-button"
          onClick={() => navigate("/meus-servicos")}
          icon={<ArrowLeft size={18} />}
        >
          Voltar
        </Button>
      </div>

      <section className="edit-service-container">
        <header className="edit-service-heading">
          <span>Edição de serviço</span>

          <h1>Edite seu serviço voluntário</h1>

          <p>
            Atualize as informações para manter seu serviço sempre correto e
            atualizado.
          </p>
        </header>

        <Stepper currentStep={currentStep} steps={steps} />

        <form className="edit-service-form" onSubmit={handleSubmit}>
          <div className="edit-service-card">
            <FormStepContent
              currentStep={currentStep}

              formData={formData}

              errors={errors}

              onChange={handleChange}

              onImageChange={handleImageChange}

              onRemoveImage={removeImage}

              onEditStep={setCurrentStep}
            />
          </div>

          <div className="edit-service-actions">
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
                Salvar alterações
              </button>
            )}
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
