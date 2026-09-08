import { Nota } from "types/enum/Nota";
import { userDTO } from "./userDTO";

export const AvaliacaoDTO = [
  {
    id: 1,
    idServico: 1,
    idUsuario: userDTO[0].id,
    usuario: userDTO[0],
    comentario: "Excelente serviço, muito atencioso e prestativo.",
    dataAvaliacao: "2026-01-20",
    nota: Nota[4],
  },
  {
    id: 2,
    idServico: 2,
    idUsuario: userDTO[1].id,
    usuario: userDTO[1],
    comentario: "Gostei bastante da experiência.",
    dataAvaliacao: "2026-01-25",
    nota: Nota[3],
  },
  {
    id: 3,
    idServico: 3,
    idUsuario: userDTO[2].id,
    usuario: userDTO[2],
    comentario: "Foi muito útil e ajudou bastante.",
    dataAvaliacao: "2026-02-02",
    nota: Nota[4],
  },
  {
    id: 3,
    idServico: 3,
    idUsuario: userDTO[2].id,
    usuario: userDTO[2],
    comentario: "pessimo",
    dataAvaliacao: "2026-02-02",
    nota: Nota[3],
  },
  {
    id: 4,
    idServico: 4,
    idUsuario: userDTO[3].id,
    usuario: userDTO[3],
    comentario: "Bom atendimento, mas pode melhorar em alguns pontos.",
    dataAvaliacao: "2026-02-10",
    nota: Nota[2],
  },
  {
    id: 5,
    idServico: 5,
    idUsuario: userDTO[4].id,
    usuario: userDTO[4],
    comentario: "Ótimo serviço, recomendo.",
    dataAvaliacao: "2026-02-18",
    nota: Nota[4],
  },
  {
    id: 6,
    idServico: 6,
    idUsuario: userDTO[5].id,
    usuario: userDTO[5],
    comentario: "Experiência muito boa e profissional.",
    dataAvaliacao: "2026-02-25",
    nota: Nota[4],
  },
  {
    id: 7,
    idServico: 1,
    idUsuario: userDTO[1].id,
    usuario: userDTO[1],
    comentario: "Excelente explicação e muita paciência.",
    dataAvaliacao: "2026-03-05",
    nota: Nota[4],
  },
  {
    id: 8,
    idServico: 2,
    idUsuario: userDTO[2].id,
    usuario: userDTO[2],
    comentario: "Atendeu às expectativas.",
    dataAvaliacao: "2026-03-12",
    nota: Nota[3],
  },
  {
    id: 9,
    idServico: 7,
    comentario: "Atividade bem organizada e acessível para iniciantes.",
    dataAvaliacao: "2026-03-18",
    nota: Nota[4], // 5
  },
  {
    id: 10,
    idServico: 8,
    comentario: "As crianças gostaram muito dos treinos.",
    dataAvaliacao: "2026-03-22",
    nota: Nota[4], // 5
  },
  {
    id: 11,
    idServico: 9,
    comentario: "Recebi orientações importantes para procurar emprego.",
    dataAvaliacao: "2026-03-28",
    nota: Nota[3], // 4
  },
  {
    id: 12,
    idServico: 10,
    comentario: "As aulas são didáticas e fáceis de acompanhar.",
    dataAvaliacao: "2026-04-03",
    nota: Nota[4], // 5
  },
  {
    id: 13,
    idServico: 11,
    comentario: "Ajudou bastante na minha escrita e interpretação.",
    dataAvaliacao: "2026-04-09",
    nota: Nota[3], // 4
  },
  {
    id: 14,
    idServico: 12,
    comentario: "Projeto muito importante para a comunidade.",
    dataAvaliacao: "2026-04-15",
    nota: Nota[4], // 5
  },
  {
    id: 15,
    idServico: 13,
    comentario: "Atendimento acolhedor, respeitoso e profissional.",
    dataAvaliacao: "2026-04-21",
    nota: Nota[4], // 5
  },
  {
    id: 16,
    idServico: 14,
    comentario: "A equipe explicou tudo com muita clareza.",
    dataAvaliacao: "2026-04-27",
    nota: Nota[3], // 4
  },
  {
    id: 17,
    idServico: 15,
    comentario: "Recebi todo o apoio necessário durante a adoção.",
    dataAvaliacao: "2026-05-02",
    nota: Nota[4], // 5
  },
  {
    id: 18,
    idServico: 16,
    comentario: "As orientações foram boas, mas poderiam ser mais detalhadas.",
    dataAvaliacao: "2026-05-08",
    nota: Nota[2], // 3
  },
  {
    id: 19,
    idServico: 17,
    comentario: "O reparo foi realizado com bastante cuidado.",
    dataAvaliacao: "2026-05-14",
    nota: Nota[3], // 4
  },
  {
    id: 20,
    idServico: 18,
    comentario: "Atendimento cuidadoso e muito atencioso com os idosos.",
    dataAvaliacao: "2026-05-20",
    nota: Nota[4], // 5
  },
  {
    id: 21,
    idServico: 19,
    comentario: "Oficina divertida, organizada e com receitas acessíveis.",
    dataAvaliacao: "2026-05-26",
    nota: Nota[4], // 5
  },
  {
    id: 22,
    idServico: 20,
    comentario: "Ótima iniciativa para aprender sobre cultivo de alimentos.",
    dataAvaliacao: "2026-06-01",
    nota: Nota[4], // 5
  },
];
