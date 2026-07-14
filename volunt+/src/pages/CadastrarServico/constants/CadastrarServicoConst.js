export const initialFormData = {
  title: "",
  category: "",
  description: "",
  image: null,
  imagePreview: "",

  modality: "",
  city: "",
  neighborhood: "",
  schedule: "",

  whatsapp: "",
  instagram: "",
  email: "",
  website: "",

  freeService: false,
  acceptTerms: false,
};

export const steps = [
  {
    id: 1,
    title: "Informações",
    description: "Dados principais",
  },
  {
    id: 2,
    title: "Atendimento",
    description: "Local e modalidade",
  },
  {
    id: 3,
    title: "Contato",
    description: "Canais de contato",
  },
  {
    id: 4,
    title: "Revisão",
    description: "Confira os dados",
  },
];

export const reviewTexts = {
  step: "Etapa 4 de 4",

  title: "Revise seu serviço",

  description:
    "Confira as informações antes de enviar para análise.",

  freeService:
    "Declaro que este serviço é gratuito ou voluntário.",

  acceptTerms:
    "Confirmo que as informações são verdadeiras e aceito os termos de uso da plataforma.",

  warning: {
    title: "O que acontece depois?",

    description:
      "O serviço será enviado para moderação com o status 'Pendente'. Ele só ficará disponível publicamente após a aprovação.",
  },
};