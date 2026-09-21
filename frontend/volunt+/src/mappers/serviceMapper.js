export function mapServices({
  services,
  usuarios,
  categorias,
  localizacoes,
  contatos,
  avaliacoes,
  agendamentos,
}) {
  return services.map((service) => {
    const serviceReviews = avaliacoes.filter(
      (avaliacao) => String(avaliacao.idServico) === String(service.id),
    );

    const ratingSum = serviceReviews.reduce(
      (sum, avaliacao) => sum + Number(avaliacao.nota || 0),
      0,
    );

    const ratingAverage = serviceReviews.length
      ? Number((ratingSum / serviceReviews.length).toFixed(1))
      : 0;

    const mappedLocation =
      service.localizacao ||
      (service.cidade || service.estado || service.bairro
        ? {
            cep: service.cep,
            cidade: service.cidade,
            estado: service.estado,
            bairro: service.bairro,
          }
        : undefined);

    const mappedContact =
      service.contato ||
      (service.whatsapp || service.telefone || service.instagram || service.site
        ? {
            telefone: service.whatsapp || service.telefone,
            instagram: service.instagram,
            site: service.site,
          }
        : undefined);

    const mappedSchedules = agendamentos.filter(
      (agendamento) => String(agendamento.idServico) === String(service.id),
    );

    const serviceSchedules = mappedSchedules.length
      ? mappedSchedules.map((schedule) => ({
          ...schedule,
          diaSemana: Array.isArray(schedule.diaSemana)
            ? schedule.diaSemana[0]
            : schedule.diaSemana,
          turno: Array.isArray(schedule.turno)
            ? schedule.turno[0]
            : schedule.turno,
        }))
      : service.diaDaSemana || service.turno
        ? [
            {
              diaSemana: Array.isArray(service.diaDaSemana)
                ? service.diaDaSemana[0]
                : service.diaDaSemana,
              turno: Array.isArray(service.turno)
                ? service.turno[0]
                : service.turno,
            },
          ]
        : [];

    return {
      ...service,

      usuario: usuarios.find(
        (usuario) => String(usuario.id) === String(service.idUsuario),
      ),

      categoria: categorias.find(
        (categoria) => String(categoria.id) === String(service.idCategoria),
      ),

      localizacao:
        mappedLocation ||
        localizacoes.find(
        (localizacao) =>
          String(localizacao.id) === String(service.idLocalizacao),
        ),

      contato:
        mappedContact ||
        contatos.find(
          (contato) => String(contato.idServico) === String(service.id),
        ),

      avaliacoes: serviceReviews,

      avaliacaoMedia: ratingAverage,

      quantidadeAvaliacoes: serviceReviews.length,

      agendamentos: serviceSchedules,
    };
  });
}
