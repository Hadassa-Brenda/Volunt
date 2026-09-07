export const initialFormData = {
  name: "",
  descricao: "",
  modalities: "",
  categorias: "",

  image: "",

  cep: "",
  estado: "",
  cidade: "",
  bairro: "",

  diaSemana: "",
  turno: "",

  site: "",
  instagram: "",
  whatsapp: "",
  telefone: "",
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

  description: "Confira as informações antes de enviar para análise.",
};
