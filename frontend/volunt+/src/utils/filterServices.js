export function filterServices(services, filters) {
  const genero = filters?.genero ?? [];
  const diaDaSemana = filters?.diaDaSemana ?? [];
  const turno = filters?.turno ?? [];
  const avaliacao = filters?.avaliacao ?? [];

  return services.filter((service) => {
    /*
     * O serviço possui apenas o ID do usuário:
     *
     * service.idUsuario
     *
     * Mas o gênero está dentro do usuário.
     *
     * Se o mapper já criou service.usuario,
     * usamos ele aqui.
     */
    const usuario = service.usuario ?? {};

    const serviceGenero = usuario.genero;

    const serviceDiaDaSemana = service.diaDaSemana;

    const serviceTurno = service.turno;

    const serviceAvaliacao = service.avaliacao;

    /*
     * GÊNERO
     *
     * Se nenhum gênero foi selecionado,
     * não filtra.
     *
     * Caso tenha selecionado:
     *
     * genero = [1, 2]
     *
     * verifica se o gênero do serviço está
     * dentro desses valores.
     */
    const matchesGenero = genero.length === 0 || genero.includes(serviceGenero);

    /*
     * DIA DA SEMANA
     */
    const matchesDiaDaSemana =
      diaDaSemana.length === 0 || diaDaSemana.includes(serviceDiaDaSemana);

    /*
     * TURNO
     */
    const matchesTurno = turno.length === 0 || turno.includes(serviceTurno);

    /*
     * AVALIAÇÃO
     */
    const matchesAvaliacao =
      avaliacao.length === 0 || avaliacao.includes(serviceAvaliacao);

    return (
      matchesGenero && matchesDiaDaSemana && matchesTurno && matchesAvaliacao
    );
  });
}
