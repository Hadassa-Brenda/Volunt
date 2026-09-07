import { calculateAge } from "../utils/optionsUtils";

function matchesFilter(selectedValues, serviceValue) {
  if (!selectedValues?.length) {
    return true;
  }

  if (serviceValue === null || serviceValue === undefined) {
    return false;
  }

  return selectedValues.some(
    (selectedValue) => String(selectedValue) === String(serviceValue),
  );
}

export function filterServices(services = [], filters = {}) {
  return services.filter((service) => {
    if (filters.search?.trim()) {
      const search = filters.search.trim().toLowerCase();

      const matchesSearch =
        service.name?.toLowerCase().includes(search) ||
        service.descricao?.toLowerCase().includes(search);

      if (!matchesSearch) {
        return false;
      }
    }

    if (
      !matchesFilter(
        filters.locations,
        service.localizacao?.id ?? service.idLocalizacao,
      )
    ) {
      return false;
    }

    if (
      !matchesFilter(
        filters.category,
        service.categoria?.id ?? service.idCategoria,
      )
    ) {
      return false;
    }

    if (!matchesFilter(filters.modality, service.modalities)) {
      return false;
    }

    if (!matchesFilter(filters.state, service.localizacao?.estado)) {
      return false;
    }

    if (
      !matchesFilter(
        filters.typeLocalization,
        service.localizacao?.tipoLocalizacao,
      )
    ) {
      return false;
    }

    if (!matchesFilter(filters.genero, service.usuario?.genero)) {
      return false;
    }

    if (!matchesFilter(filters.providerType, service.usuario?.tipoUsuario)) {
      return false;
    }

    if (filters.dataNascimento?.length) {
      const idade = calculateAge(service.usuario?.dataNascimento);

      if (!matchesFilter(filters.dataNascimento, idade)) {
        return false;
      }
    }

    if (filters.diaDaSemana?.length) {
      const hasDay = service.agendamentos?.some(
        (agendamento) =>
          String(agendamento.diaSemana) === String(filters.diaDaSemana),
      );

      if (!hasDay) {
        return false;
      }
    }

    if (filters.turno?.length) {
      const hasShift = service.agendamentos?.some(
        (agendamento) => String(agendamento.turno) === String(filters.turno),
      );

      if (!hasShift) {
        return false;
      }
    }

    if (!matchesFilter(filters.avaliacao, service.avaliacao)) {
      return false;
    }

    return true;
  });
}
