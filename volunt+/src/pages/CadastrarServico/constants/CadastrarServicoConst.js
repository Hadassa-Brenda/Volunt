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
