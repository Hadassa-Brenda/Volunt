import { GENDER_OPTIONS } from "types/enum/Gender";
import { TipoUsuario } from "types/enum/TipoUsuario";
import { PROFILE_TYPES } from "types/enum/ProfileTypes";

export const userDTO = [
  {
    id: 1,
    fullName: "João da Silva",
    email: "joao@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[0].value,
    dataNascimento: "2004-02-21T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },

  {
    id: 2,
    fullName: "Maria Oliveira",
    email: "maria@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "1998-08-15T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },

  {
    id: 3,
    fullName: "Carlos Mendes",
    email: "carlos@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[0].value,
    dataNascimento: "1992-11-03T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },

  {
    id: 4,
    fullName: "Ana Beatriz",
    email: "ana@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "2001-04-27T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },

  {
    id: 5,
    fullName: "Pedro Henrique",
    email: "pedro@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[0].value,
    dataNascimento: "1987-01-10T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },

  {
    id: 6,
    fullName: "Juliana Costa",
    email: "juliana@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "1995-06-19T00:00:00.000Z",
    perfilUsuario: PROFILE_TYPES[0].value,
    password: "12981922",
  },
];
