export function mapServices({
  services,
  usuarios,
  categorias,
  localizacoes,
  contatos,
  avaliacoes,
  agendamentos,
}) {
  return services.map((service) => ({
    ...service,

    usuario: usuarios.find((usuario) => usuario.id === service.idUsuario),

    categoria: categorias.find(
      (categoria) => categoria.id === service.idCategoria,
    ),

    localizacao: localizacoes.find(
      (localizacao) => localizacao.id === service.idLocalizacao,
    ),

    contato: contatos.find((contato) => contato.idServico === service.id),

    avaliacoes: avaliacoes.filter(
      (avaliacao) => avaliacao.idServico === service.id,
    ),

    agendamentos: agendamentos.filter(
      (agendamento) => agendamento.idServico === service.id,
    ),
  }));
}
