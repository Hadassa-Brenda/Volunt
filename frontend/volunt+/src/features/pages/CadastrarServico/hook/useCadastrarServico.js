import { useState } from "react";

import { initialFormData, steps } from "../types/CadastrarServicoConst";

import { servicesDTO } from "../../../../types/DTOs/serviceDTO";

export function useCadastrarServico() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "cep") {
      const cepLimpo = value.replace(/\D/g, "").slice(0, 8);

      const cepFormatado = cepLimpo.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");

      setFormData((current) => ({
        ...current,
        cep: cepFormatado,
      }));

      setErrors((current) => ({
        ...current,
        cep: "",
      }));

      if (cepLimpo.length < 8) {
        setFormData((current) => ({
          ...current,
          cep: cepFormatado,
          estado: "",
          cidade: "",
          bairro: "",
        }));

        return;
      }

      buscarCep(cepLimpo);

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro na consulta do CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        setErrors((current) => ({
          ...current,
          cep: "CEP não encontrado.",
        }));

        setFormData((current) => ({
          ...current,
          estado: "",
          cidade: "",
          bairro: "",
        }));

        return;
      }

      setFormData((current) => ({
        ...current,

        cep: cepLimpo.replace(/^(\d{5})(\d{3})$/, "$1-$2"),

        estado: data.uf || "",

        cidade: data.localidade || "",

        bairro: data.bairro || "",
      }));

      setErrors((current) => ({
        ...current,
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
      }));
    } catch (error) {
      console.error("Erro ao consultar CEP:", error);

      setErrors((current) => ({
        ...current,
        cep: "Não foi possível consultar o CEP.",
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      const name = formData.name || "";

      const descricao = formData.descricao || "";

      if (!name.trim()) {
        newErrors.name = "Informe o título.";
      }

      if (!formData.categorias) {
        newErrors.categorias = "Selecione uma categoria.";
      }

      if (descricao.trim().length < 30) {
        newErrors.descricao = "Descrição deve possuir no mínimo 30 caracteres.";
      }
    }

    if (currentStep === 2) {
      if (!formData.modalities) {
        newErrors.modalities = "Selecione uma modalidade.";
      }

      const isOnline = formData.modalities === "Online";

      if (!isOnline) {
        const cep = (formData.cep || "").trim();

        const estado = (formData.estado || "").trim();

        const cidade = (formData.cidade || "").trim();

        const bairro = (formData.bairro || "").trim();

        if (!cep) {
          newErrors.cep = "Informe o CEP.";
        }

        if (!estado) {
          newErrors.estado = "Informe o CEP para preencher o estado.";
        }

        if (!cidade) {
          newErrors.cidade = "Informe o CEP para preencher a cidade.";
        }

        if (!bairro) {
          newErrors.bairro = "Informe o CEP para preencher o bairro.";
        }
      }

      if (!formData.diaSemana) {
        newErrors.diaSemana = "Selecione o dia da semana.";
      }

      if (!formData.turno) {
        newErrors.turno = "Selecione o turno.";
      }
    }

    if (currentStep === 3) {
      const whatsapp = (formData.whatsapp || "").trim();

      const instagram = (formData.instagram || "").trim();

      const telefone = (formData.telefone || "").trim();

      const site = (formData.site || "").trim();

      const hasContact = whatsapp || instagram || telefone || site;

      if (!hasContact) {
        newErrors.contact = "Informe pelo menos um contato.";
      }
    }

    setErrors(newErrors);

    console.log("Validação da etapa:", currentStep);

    console.log("formData:", formData);

    console.log("erros:", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    const isValid = validateStep();

    if (!isValid) {
      return;
    }

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

    setFormData((current) => ({
      ...current,
      image: file,
    }));

    setErrors((current) => ({
      ...current,
      image: "",
    }));
  };

  const removeImage = () => {
    setFormData((current) => ({
      ...current,
      image: "",
    }));

    setErrors((current) => ({
      ...current,
      image: "",
    }));
  };

  const salvarServico = () => {
    try {
      const storedServices = localStorage.getItem("volunt-services");

      let services = [];

      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);

        if (Array.isArray(parsedServices)) {
          services = parsedServices;
        }
      }

      const storedUser = JSON.parse(
        localStorage.getItem("volunt-user") || "null",
      );

      const idUsuario = storedUser?.id;

      if (!idUsuario) {
        setErrors((current) => ({
          ...current,
          submit: "Usuário não identificado. Faça login novamente.",
        }));

        console.error("Nenhum usuário encontrado em volunt-user.");

        return null;
      }

      const ids = [
        ...services.map((service) => Number(service.id) || 0),

        ...servicesDTO.map((service) => Number(service.id) || 0),
      ];

      const nextId = Math.max(...ids, 0) + 1;

      const novoServico = {
        id: nextId,

        name: formData.name,

        descricao: formData.descricao,

        modalities: formData.modalities,

        idCategoria: Number(formData.categorias),

        idUsuario: Number(idUsuario),

        idLocalizacao: null,

        status: 0,

        providerImage: "",

        diaDaSemana: formData.diaSemana,

        turno: formData.turno,

        avaliacao: 0,

        publicationDate: new Date().toISOString(),

        cep: formData.cep || "",

        estado: formData.estado || "",

        cidade: formData.cidade || "",

        bairro: formData.bairro || "",

        whatsapp: formData.whatsapp || "",

        telefone: formData.telefone || "",

        instagram: formData.instagram || "",

        site: formData.site || "",
      };

      const updatedServices = [...services, novoServico];

      localStorage.setItem("volunt-services", JSON.stringify(updatedServices));

      console.log("Serviço salvo com sucesso:", novoServico);

      console.log("Usuário responsável:", idUsuario);

      return novoServico;
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);

      setErrors((current) => ({
        ...current,
        submit: "Não foi possível salvar o serviço.",
      }));

      return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateStep();

    if (!isValid) {
      return;
    }

    const novoServico = salvarServico();

    if (!novoServico) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
    });

    setErrors({});

    setCurrentStep(1);

    setSubmitted(false);
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

    buscarCep,

    validateStep,

    nextStep,

    previousStep,

    handleImageChange,

    removeImage,

    handleSubmit,

    resetForm,

    salvarServico,
  };
}
