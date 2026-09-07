import { Turno } from "types/enum/Turno";
import { DiaSemana } from "types/enum/DiaSemana";

export const AgendarServico = [
  {
    id: 1,
    idServico: 1,
    turno: Turno[0].value,
    diaSemana: DiaSemana[0].value,
    dataCriacao: Date.now(),
  },

  {
    id: 2,
    idServico: 2,
    turno: Turno[1].value,
    diaSemana: DiaSemana[1].value,
    dataCriacao: Date.now(),
  },

  {
    id: 3,
    idServico: 3,
    turno: Turno[2].value,
    diaSemana: DiaSemana[2].value,
    dataCriacao: Date.now(),
  },

  {
    id: 4,
    idServico: 4,
    turno: Turno[0].value,
    diaSemana: DiaSemana[3].value,
    dataCriacao: Date.now(),
  },

  {
    id: 5,
    idServico: 5,
    turno: Turno[1].value,
    diaSemana: DiaSemana[4].value,
    dataCriacao: Date.now(),
  },

  {
    id: 6,
    idServico: 6,
    turno: Turno[2].value,
    diaSemana: DiaSemana[5].value,
    dataCriacao: Date.now(),
  },

  {
    id: 7,
    idServico: 1,
    turno: Turno[1].value,
    diaSemana: DiaSemana[2].value,
    dataCriacao: Date.now(),
  },

  {
    id: 8,
    idServico: 2,
    turno: Turno[0].value,
    diaSemana: DiaSemana[4].value,
    dataCriacao: Date.now(),
  },
];
