import { servicesDTO } from "../types/DTOs/serviceDTO";
import { userDTO } from "../types/DTOs/userDTO";
import { CategoriaDTO } from "../types/DTOs/categoriaDTO";
import { LocalizacaoDTO } from "../types/DTOs/localizacaoDTO";
import { ContatoDTO } from "../types/DTOs/contatoDTO";
import { AvaliacaoDTO } from "../types/DTOs/avaliacaoDTO";
import { AgendarServico } from "../types/DTOs/agendarServicoDTO";

import { mapServices } from "../mappers/serviceMapper";
export function getServices() {
  return mapServices({
    services: servicesDTO,
    usuarios: userDTO,
    categorias: CategoriaDTO,
    localizacoes: LocalizacaoDTO,
    contatos: ContatoDTO,
    avaliacoes: AvaliacaoDTO,
    agendamentos: AgendarServico,
  });
}

export function getServiceById(id) {
  const services = mapServices({
    services: servicesDTO,
    usuarios: userDTO,
    categorias: CategoriaDTO,
    localizacoes: LocalizacaoDTO,
    contatos: ContatoDTO,
    avaliacoes: AvaliacaoDTO,
    agendamentos: AgendarServico,
  });

  return services.find((service) => String(service.id) === String(id)) ?? null;
}
