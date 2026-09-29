import { fetchServices, fetchServiceById, fetchReviews } from "../api/servicesApi";
import { mapServices } from "../mappers/serviceMapper";
import { CategoriaDTO } from "../types/DTOs/categoriaDTO";
import { fetchPublicUserProfile } from "../api/usersApi";

function mapRemoteServices(services) {
  return mapServices({
    services: services.map((service) => ({ ...service, idUsuario: service.ownerId })),
    usuarios: [],
    categorias: CategoriaDTO,
    localizacoes: [],
    contatos: [],
    avaliacoes: [],
    agendamentos: [],
  });
}

export async function getServices() {
  return mapRemoteServices(await fetchServices());
}

export async function getServiceById(id) {
  const [service, reviews] = await Promise.all([
    fetchServiceById(id),
    fetchReviews(id),
  ]);

  const owner = service.ownerId
    ? await fetchPublicUserProfile(service.ownerId).catch(() => null)
    : null;

  return mapRemoteServices([{
    ...service,
    usuario: owner ? {
      ...owner,
      fullName: owner.organizationName || owner.fullName,
    } : undefined,
    avaliacoes: reviews.map((review) => ({
      ...review,
      idServico: review.serviceId,
      idUsuario: review.authorId,
      dataAvaliacao: review.dataCriacao,
    })),
  }])[0];
}
