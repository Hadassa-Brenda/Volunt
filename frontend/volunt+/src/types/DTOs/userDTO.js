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
    dataNascimento: "21-02-2004",
    perfilUsuario: PROFILE_TYPES[0].value,
  },

  {
    id: 2,
    fullName: "Maria Oliveira",
    email: "maria@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "15-08-1998",
    perfilUsuario: PROFILE_TYPES[0].value,
  },

  {
    id: 3,
    fullName: "Carlos Mendes",
    email: "carlos@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[0].value,
    dataNascimento: "03-11-1992",
    perfilUsuario: PROFILE_TYPES[0].value,
  },

  {
    id: 4,
    fullName: "Ana Beatriz",
    email: "ana@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "27-04-2001",
    perfilUsuario: PROFILE_TYPES[0].value,
  },

  {
    id: 5,
    fullName: "Pedro Henrique",
    email: "pedro@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[0].value,
    dataNascimento: "10-01-1987",
    perfilUsuario: PROFILE_TYPES[0].value,
  },

  {
    id: 6,
    fullName: "Juliana Costa",
    email: "juliana@email.com",
    tipoUsuario: TipoUsuario[0].value,
    genero: GENDER_OPTIONS[1].value,
    dataNascimento: "19-06-1995",
    perfilUsuario: PROFILE_TYPES[0].value,
  },
];
