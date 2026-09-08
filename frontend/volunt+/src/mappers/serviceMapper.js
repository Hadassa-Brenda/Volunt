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

    return {
      ...service,

      usuario: usuarios.find(
        (usuario) => String(usuario.id) === String(service.idUsuario),
      ),

      categoria: categorias.find(
        (categoria) => String(categoria.id) === String(service.idCategoria),
      ),

      localizacao: localizacoes.find(
        (localizacao) =>
          String(localizacao.id) === String(service.idLocalizacao),
      ),

      contato: contatos.find(
        (contato) => String(contato.idServico) === String(service.id),
      ),

      avaliacoes: serviceReviews,

      avaliacaoMedia: ratingAverage,

      quantidadeAvaliacoes: serviceReviews.length,

      agendamentos: agendamentos.filter(
        (agendamento) => String(agendamento.idServico) === String(service.id),
      ),
    };
  });
}
