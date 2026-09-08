import { SERVICE_MODALITIES } from "types/enum/Modalities";
import { DiaSemana } from "types/enum/DiaSemana";
import { Turno } from "types/enum/Turno";
import { LocalizacaoDTO } from "./localizacaoDTO";
import { CategoriaDTO } from "./categoriaDTO";
import { userDTO } from "./userDTO";
import { SERVICE_STATUS } from "types/enum/Status";
import { ContatoDTO } from "./contatoDTO";
import { AvaliacaoDTO } from "./avaliacaoDTO";

export const servicesDTO = [
  {
    id: 1,
    name: "Reforço escolar gratuito",
    descricao: "Aulas de reforço para alunos do ensino fundamental.",
    modalities: SERVICE_MODALITIES[0].value, // presencial
    idCategoria: CategoriaDTO[0].id, // educação
    idUsuario: userDTO[0].id, // masculino
    idLocalizacao: LocalizacaoDTO[0].id, // minas belo horizonte
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[0].value, //segunda
    turno: Turno[0].value, //manha
    avaliacao: AvaliacaoDTO[0], //1
    publicationDate: new Date(),
    contato: ContatoDTO[0],
  },

  {
    id: 2,
    name: "Aula de matemática",
    descricao: "Aulas de matemática para estudantes do ensino médio.",
    modalities: SERVICE_MODALITIES[1].value,
    idCategoria: CategoriaDTO[0].id,
    idUsuario: userDTO[1].id,
    idLocalizacao: LocalizacaoDTO[1].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[1].value,
    turno: Turno[1].value,
    avaliacao: AvaliacaoDTO[1], //1
    publicationDate: new Date(),
    contato: ContatoDTO[1],
  },

  {
    id: 3,
    name: "Aula de informática",
    descricao: "Introdução à informática, computadores e tecnologia.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[2].id,
    idUsuario: userDTO[2].id,
    idLocalizacao: LocalizacaoDTO[2].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[2].value,
    turno: Turno[2].value,
    avaliacao: AvaliacaoDTO[2],
    publicationDate: new Date(),
    avaliacao: AvaliacaoDTO[2], //1
    contato: ContatoDTO[1],
  },

  {
    id: 4,
    name: "Aulas de violão",
    descricao: "Aulas gratuitas de violão para iniciantes.",
    modalities: SERVICE_MODALITIES[2].value,
    idCategoria: CategoriaDTO[1].id,
    idUsuario: userDTO[3].id,
    idLocalizacao: LocalizacaoDTO[3].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[3].value,
    turno: Turno[0].value,
    avaliacao: AvaliacaoDTO[3], //1
    publicationDate: new Date(),
    contato: ContatoDTO[2],
  },

  {
    id: 5,
    name: "Oficina de canto",
    descricao: "Oficina de canto para jovens e adultos.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[1].id,
    idUsuario: userDTO[4].id,
    idLocalizacao: LocalizacaoDTO[4].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[4].value,
    turno: Turno[1].value,
    avaliacao: AvaliacaoDTO[4], //1
    publicationDate: new Date(),
    contato: ContatoDTO[1],
  },

  {
    id: 6,
    name: "Introdução à programação",
    descricao: "Curso introdutório de programação para iniciantes.",
    modalities: SERVICE_MODALITIES[1].value,
    idCategoria: CategoriaDTO[2].id,
    idUsuario: userDTO[5].id,
    idLocalizacao: LocalizacaoDTO[5].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[0].value,
    turno: Turno[2].value,
    avaliacao: AvaliacaoDTO[4], //1

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 7,
    name: "Treino funcional comunitário",
    descricao: "Atividades físicas gratuitas para a comunidade.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[3].id,
    idUsuario: userDTO[0].id,
    idLocalizacao: LocalizacaoDTO[6].id,
    avaliacao: AvaliacaoDTO[4], //1
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[1].value,
    turno: Turno[0].value,

    publicationDate: new Date(),
    contato: ContatoDTO[6],
  },

  {
    id: 8,
    name: "Futebol para crianças",
    descricao: "Treinos de futebol para crianças e adolescentes.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[3].id,
    avaliacao: AvaliacaoDTO[4], //1
    idUsuario: userDTO[1].id,
    idLocalizacao: LocalizacaoDTO[7].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[2].value,
    turno: Turno[1].value,
    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 9,
    name: "Orientação profissional",
    descricao: "Orientação para jovens em busca do primeiro emprego.",
    modalities: SERVICE_MODALITIES[1].value,
    idCategoria: CategoriaDTO[9].id,
    idUsuario: userDTO[2].id,
    avaliacao: AvaliacaoDTO[4], //1
    idLocalizacao: LocalizacaoDTO[0].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[3].value,
    turno: Turno[2].value,

    publicationDate: new Date(),
    contato: ContatoDTO[5],
  },

  {
    id: 10,
    name: "Curso de inglês",
    descricao: "Aulas de inglês para iniciantes e nível intermediário.",
    modalities: SERVICE_MODALITIES[2].value,
    idCategoria: CategoriaDTO[0].id,
    idUsuario: userDTO[3].id,
    avaliacao: AvaliacaoDTO[4], //1
    idLocalizacao: LocalizacaoDTO[1].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[4].value,
    turno: Turno[0].value,

    publicationDate: new Date(),
    contato: ContatoDTO[1],
  },

  {
    id: 11,
    name: "Aula de português",
    descricao: "Apoio em leitura, escrita e interpretação de textos.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[0].id,
    idUsuario: userDTO[4].id,
    avaliacao: AvaliacaoDTO[4], //1
    idLocalizacao: LocalizacaoDTO[2].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[5].value,
    turno: Turno[1].value,

    publicationDate: new Date(),
    contato: ContatoDTO[0],
  },

  {
    id: 12,
    name: "Doação de alimentos",
    descricao: "Arrecadação e distribuição de alimentos para famílias.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[5].id,
    avaliacao: AvaliacaoDTO[4], //1
    idUsuario: userDTO[5].id,
    idLocalizacao: LocalizacaoDTO[3].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[6].value,
    turno: Turno[2].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 13,
    name: "Atendimento psicológico",
    descricao: "Atendimento e acolhimento psicológico gratuito.",
    modalities: SERVICE_MODALITIES[1].value,
    idCategoria: CategoriaDTO[6].id,
    avaliacao: AvaliacaoDTO[4], //1
    idUsuario: userDTO[0].id,
    idLocalizacao: LocalizacaoDTO[4].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[0].value,
    turno: Turno[1].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 14,
    name: "Campanha de vacinação",
    descricao: "Orientação e apoio em campanhas de vacinação.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[6].id,
    idUsuario: userDTO[1].id,
    idLocalizacao: LocalizacaoDTO[5].id,
    avaliacao: AvaliacaoDTO[4], //1
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[1].value,
    turno: Turno[0].value,

    publicationDate: new Date(),
    contato: ContatoDTO[1],
  },

  {
    id: 15,
    name: "Adoção responsável de animais",
    descricao: "Apoio à adoção responsável de cães e gatos.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[7].id,
    idUsuario: userDTO[2].id,
    idLocalizacao: LocalizacaoDTO[6].id,
    avaliacao: AvaliacaoDTO[4], //1
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[2].value,
    turno: Turno[1].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 16,
    name: "Cuidados básicos com animais",
    descricao: "Orientações sobre alimentação e cuidados com pets.",
    modalities: SERVICE_MODALITIES[1].value,
    idCategoria: CategoriaDTO[7].id,
    idUsuario: userDTO[3].id,
    idLocalizacao: LocalizacaoDTO[7].id,
    avaliacao: AvaliacaoDTO[4], //1
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[3].value,
    turno: Turno[2].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 17,
    name: "Manutenção residencial",
    descricao: "Pequenos reparos e manutenção em residências.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[8].id,
    avaliacao: AvaliacaoDTO[4], //1
    idUsuario: userDTO[4].id,
    idLocalizacao: LocalizacaoDTO[0].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[4].value,
    turno: Turno[0].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 18,
    name: "Apoio para idosos",
    descricao: "Acompanhamento e auxílio em atividades do dia a dia.",
    modalities: SERVICE_MODALITIES[2].value,
    idCategoria: CategoriaDTO[9].id,
    idUsuario: userDTO[5].id,
    idLocalizacao: LocalizacaoDTO[1].id,
    status: SERVICE_STATUS[0].value,
    avaliacao: AvaliacaoDTO[4], //1
    providerImage: "",
    diaDaSemana: DiaSemana[5].value,
    turno: Turno[1].value,

    publicationDate: new Date(),
    contato: ContatoDTO[0],
  },

  {
    id: 19,
    name: "Oficina de culinária",
    descricao: "Oficina comunitária de culinária e alimentação saudável.",
    modalities: SERVICE_MODALITIES[0].value,
    idCategoria: CategoriaDTO[4].id,
    idUsuario: userDTO[0].id,
    avaliacao: AvaliacaoDTO[4], //1
    idLocalizacao: LocalizacaoDTO[2].id,
    status: SERVICE_STATUS[0].value,
    providerImage: "",
    diaDaSemana: DiaSemana[6].value,
    turno: Turno[2].value,

    publicationDate: new Date(),
    contato: ContatoDTO[4],
  },

  {
    id: 20,
    name: "Horta comunitária",
    descricao: "Projeto comunitário de cultivo de alimentos e hortaliças.",
    modalities: SERVICE_MODALITIES[2].value,
    idCategoria: CategoriaDTO[10].id,
    idUsuario: userDTO[1].id,
    avaliacao: AvaliacaoDTO[4], //1
    idLocalizacao: LocalizacaoDTO[3].id,
    status: SERVICE_STATUS[1].value,
    providerImage: "",
    diaDaSemana: DiaSemana[0].value,
    turno: Turno[0].value,

    publicationDate: new Date(),
  },
];
