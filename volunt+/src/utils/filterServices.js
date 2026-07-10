export function filterServices(services, filters) {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return services.filter((service) => {
    const searchableContent = [
      service.title,
      service.description,
      service.category,
      service.city,
      service.neighborhood,
      service.modality,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch || searchableContent.includes(normalizedSearch);

    const matchesCategory =
      filters.category === "Todas" || service.category === filters.category;

    const matchesModality =
      filters.modality === "Todos" || service.modality === filters.modality;

    return matchesSearch && matchesCategory && matchesModality;
  });
}
