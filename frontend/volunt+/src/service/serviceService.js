import { servicesDTO } from "../types/DTOs/serviceDTO";
import { userDTO } from "../types/DTOs/userDTO";
import { CategoriaDTO } from "../types/DTOs/categoriaDTO";
import { LocalizacaoDTO } from "../types/DTOs/localizacaoDTO";
import { ContatoDTO } from "../types/DTOs/contatoDTO";
import { AvaliacaoDTO } from "../types/DTOs/avaliacaoDTO";
import { AgendarServico } from "../types/DTOs/agendarServicoDTO";
import { SERVICE_STATUS } from "../types/enum/Status";
import { SERVICE_MODALITIES } from "../types/enum/Modalities";

import { mapServices } from "../mappers/serviceMapper";

function getStoredArray(key, fallback) {
  try {
    const storedValue = JSON.parse(localStorage.getItem(key) || "null");

    return Array.isArray(storedValue) ? storedValue : fallback;
  } catch {
    return fallback;
  }
}

function getServiceData() {
  return getStoredArray("volunt-services", servicesDTO).map((service) => ({
    ...service,
    modalities:
      service.modalities === "Online"
        ? SERVICE_MODALITIES[1].value
        : service.modalities === "Presencial"
          ? SERVICE_MODALITIES[0].value
          : service.modalities === "Ambos"
            ? SERVICE_MODALITIES[2].value
            : service.modalities,
    status:
      service.status === 0
        ? SERVICE_STATUS[0].value
        : service.status === 1
          ? SERVICE_STATUS[1].value
          : service.status || SERVICE_STATUS[0].value,
  }));
}

function getUserData() {
  const storedUsers = getStoredArray("volunt-users", []);
  const usersById = new Map(storedUsers.map((user) => [String(user.id), user]));

  userDTO.forEach((user) => {
    if (!usersById.has(String(user.id))) {
      usersById.set(String(user.id), user);
    }
  });

  return Array.from(usersById.values());
}

function getReviewData() {
  return [...AvaliacaoDTO, ...getStoredArray("volunt-avaliacoes", [])];
}

function mapStoredServices() {
  return mapServices({
    services: getServiceData(),
    usuarios: getUserData(),
    categorias: CategoriaDTO,
    localizacoes: LocalizacaoDTO,
    contatos: ContatoDTO,
    avaliacoes: getReviewData(),
    agendamentos: AgendarServico,
  });
}

export function getServices() {
  return mapStoredServices();
}

export function getServiceById(id) {
  const services = mapStoredServices();

  return services.find((service) => String(service.id) === String(id)) ?? null;
}
