import { TIPO_LOCALIZACAO } from "types/enum/TipoLocalização";

export const LocalizacaoDTO = [
  {
    id: 1,
    bairro: "Ouro Preto",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "31310-422",
    tipoLocalizacao: TIPO_LOCALIZACAO[0].value,
  },

  {
    id: 2,
    bairro: "Pampulha",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "31270-000",
    tipoLocalizacao: TIPO_LOCALIZACAO[0].value,
  },

  {
    id: 3,
    bairro: "Centro",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "30110-000",
    tipoLocalizacao: TIPO_LOCALIZACAO[1].value,
  },

  {
    id: 4,
    bairro: "Savassi",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "30140-071",
    tipoLocalizacao: TIPO_LOCALIZACAO[0].value,
  },

  {
    id: 5,
    bairro: "Buritis",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "30575-000",
    tipoLocalizacao: TIPO_LOCALIZACAO[1].value,
  },

  {
    id: 6,
    bairro: "Santa Efigênia",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "30150-260",
    tipoLocalizacao: TIPO_LOCALIZACAO[0].value,
  },

  {
    id: 7,
    bairro: "Cidade Nova",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "31170-000",
    tipoLocalizacao: TIPO_LOCALIZACAO[1].value,
  },

  {
    id: 8,
    bairro: "Venda Nova",
    estado: "MG",
    cidade: "Belo Horizonte",
    cep: "31510-000",
    tipoLocalizacao: TIPO_LOCALIZACAO[0].value,
  },
];
