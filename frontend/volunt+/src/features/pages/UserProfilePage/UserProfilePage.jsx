import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Check,
  CircleAlert,
  Edit3,
  LogOut,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";

import { userDTO } from "../../../types/DTOs/userDTO";
import { getServices } from "../../../service/serviceService";

import { GENDER_OPTIONS } from "../../../types/enum/Gender";
import { TipoUsuario } from "../../../types/enum/TipoUsuario";
import { PROFILE_TYPES } from "../../../types/enum/ProfileTypes";

import SingleSelect from "components/SingleSelect.tsx/SingleSelect";
import GenericTextField from "components/TextField/TextField";
import DataPicker from "components/DataPicker/DataPicker";

import "./UserProfilePage.css";
import "./UserProfileEdit.css";

export default function UserProfilePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const profileId = id ? Number(id) : null;

  /*
   * Usuário atualmente logado.
   */
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("volunt-user") || "null");
    } catch {
      return null;
    }
  }, []);

  /*
   * Verifica se o perfil visualizado pertence
   * ao usuário atualmente logado.
   */
  const isOwnProfile =
    !profileId || Number(storedUser?.id) === Number(profileId);

  /*
   * Busca o usuário que será exibido na página.
   */
  const profileUser = useMemo(() => {
    /*
     * Se for o próprio perfil, utiliza o usuário logado.
     */
    if (isOwnProfile && storedUser) {
      return storedUser;
    }

    /*
     * Procura primeiro nos usuários armazenados localmente.
     */
    try {
      const localUsers = JSON.parse(
        localStorage.getItem("volunt-users") || "[]",
      );

      const localUser = localUsers.find(
        (user) => Number(user.id) === Number(profileId),
      );

      if (localUser) {
        return localUser;
      }
    } catch {}

    /*
     * Caso não encontre no localStorage,
     * procura no DTO de usuários.
     */
    return userDTO.find((user) => Number(user.id) === Number(profileId));
  }, [profileId, isOwnProfile, storedUser]);

  const [user, setUser] = useState(profileUser);

  const [editing, setEditing] = useState(false);

  const [saved, setSaved] = useState(false);

  /*
   * Formulário de edição.
   *
   * O tipoUsuario continua armazenado no estado
   * apenas para exibição/controle interno.
   * Ele NÃO será alterado no saveProfile.
   */
  const [form, setForm] = useState({
    fullName: profileUser?.fullName || "",

    email: profileUser?.email || "",

    tipoUsuario: profileUser?.tipoUsuario ?? TipoUsuario[0]?.value ?? "",

    genero: profileUser?.genero ?? GENDER_OPTIONS[0]?.value ?? "",

    perfilUsuario: profileUser?.perfilUsuario ?? PROFILE_TYPES[0]?.value ?? "",

    dataNascimento: profileUser?.dataNascimento
      ? profileUser.dataNascimento.split("T")[0]
      : "",
  });

  /*
   * Atualiza o usuário exibido.
   */
  useEffect(() => {
    setUser(profileUser);
  }, [profileUser]);

  /*
   * Atualiza o formulário quando o usuário muda.
   */
  useEffect(() => {
    if (!profileUser) {
      return;
    }

    setForm({
      fullName: profileUser.fullName || "",

      email: profileUser.email || "",

      tipoUsuario: profileUser.tipoUsuario ?? TipoUsuario[0]?.value ?? "",

      genero: profileUser.genero ?? GENDER_OPTIONS[0]?.value ?? "",

      perfilUsuario: profileUser.perfilUsuario ?? PROFILE_TYPES[0]?.value ?? "",

      dataNascimento: profileUser.dataNascimento
        ? profileUser.dataNascimento.split("T")[0]
        : "",
    });
  }, [profileUser]);

  /*
   * Verifica o tipo de perfil atual.
   *
   * BF = Beneficiário
   * PF = Ofertante
   */
  const isBeneficiario = user?.perfilUsuario === "BF";

  const isOfertante = user?.perfilUsuario === "PF";

  /*
   * Verifica se o usuário é Pessoa Jurídica.
   */
  const isPessoaJuridica = user?.tipoUsuario === "PJ";

  /*
   * Opções disponíveis para o tipo de perfil.
   *
   * Pessoa Física:
   * - Beneficiário
   * - Ofertante
   *
   * Pessoa Jurídica:
   * - Somente Ofertante
   */
  const profileOptions = useMemo(() => {
    if (isPessoaJuridica) {
      return PROFILE_TYPES.filter((option) => option.value === "PF").map(
        (option) => ({
          value: option.value,
          label: option.label,
        }),
      );
    }

    return PROFILE_TYPES.map((option) => ({
      value: option.value,
      label: option.label,
    }));
  }, [isPessoaJuridica]);

  /*
   * Serviços cadastrados.
   */
  const allServices = useMemo(() => {
    return getServices();
  }, []);

  /*
   * Serviços publicados pelo usuário.
   *
   * Somente ofertantes possuem serviços.
   */
  const publishedServices = useMemo(() => {
    if (!user?.id || !isOfertante) {
      return [];
    }

    return allServices.filter(
      (service) => Number(service.idUsuario) === Number(user.id),
    );
  }, [allServices, user?.id, isOfertante]);

  /*
   * Atualiza campos do formulário.
   */
  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /*
   * Logout.
   */
  function handleLogout() {
    localStorage.removeItem("volunt-user");

    setUser(null);

    navigate("/");
  }

  /*
   * Salva as alterações do perfil.
   */
  function saveProfile(event) {
    event.preventDefault();

    if (!user) {
      return;
    }

    /*
     * Pessoa Jurídica sempre será ofertante.
     *
     * Pessoa Física pode manter o perfil selecionado.
     *
     * tipoUsuario NÃO é alterado.
     */
    const updatedUser = {
      ...user,

      fullName: form.fullName,

      email: form.email,

      /*
       * O tipoUsuario original é preservado.
       */
      tipoUsuario: user.tipoUsuario,

      genero: form.genero,

      perfilUsuario: user.tipoUsuario === "PJ" ? "PF" : form.perfilUsuario,

      dataNascimento: form.dataNascimento
        ? `${form.dataNascimento}T00:00:00.000Z`
        : null,
    };

    /*
     * Atualiza o usuário logado.
     */
    localStorage.setItem("volunt-user", JSON.stringify(updatedUser));

    /*
     * Atualiza a lista de usuários.
     */
    try {
      const users = JSON.parse(localStorage.getItem("volunt-users") || "[]");

      const userExists = users.some(
        (item) => Number(item.id) === Number(updatedUser.id),
      );

      const updatedUsers = userExists
        ? users.map((item) =>
            Number(item.id) === Number(updatedUser.id) ? updatedUser : item,
          )
        : [...users, updatedUser];

      localStorage.setItem("volunt-users", JSON.stringify(updatedUsers));
    } catch {
      localStorage.setItem("volunt-users", JSON.stringify([updatedUser]));
    }

    /*
     * Atualiza o estado da página.
     */
    setUser(updatedUser);

    setEditing(false);

    setSaved(true);

    /*
     * Esconde a mensagem depois de 2,5 segundos.
     */
    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  /*
   * Usuário não encontrado.
   */
  if (!user) {
    return (
      <main className="profile-page">
        <Header />

        <section className="profile-login-required">
          <UserRound size={42} />

          <h1>Usuário não encontrado</h1>

          <p>Não foi possível encontrar este perfil.</p>

          <Link className="profile-primary-button" to="/">
            Voltar para o início
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  /*
   * Labels para exibição.
   */
  const tipoUsuarioLabel =
    TipoUsuario.find((item) => item.value === user.tipoUsuario)?.label ??
    "Não informado";

  const perfilUsuarioLabel =
    PROFILE_TYPES.find((item) => item.value === user.perfilUsuario)?.label ??
    "Não informado";

  const generoLabel =
    GENDER_OPTIONS.find((item) => item.value === user.genero)?.label ??
    "Não informado";

  const name = user.fullName || "Usuário Voluntá+";

  const formattedBirthDate = user.dataNascimento
    ? user.dataNascimento.split("T")[0].split("-").reverse().join("/")
    : "Não informado";

  return (
    <main className="profile-page">
      <Header />

      <div className="profile-container">
        {/* VOLTAR */}

        <button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        {/* CABEÇALHO DO PERFIL */}

        <section className="profile-cover">
          <div className="profile-avatar">{name.slice(0, 2).toUpperCase()}</div>

          <div className="profile-identity">
            <span>{perfilUsuarioLabel}</span>

            <h1>{name}</h1>

            <p>{tipoUsuarioLabel}</p>

            <div className="profile-contact">
              {user.email && (
                <span>
                  <Mail size={16} />

                  {user.email}
                </span>
              )}
            </div>
          </div>

          {/* AÇÕES DO PERFIL */}

          {isOwnProfile && (
            <div className="profile-actions">
              <button
                className="profile-outline-button"
                type="button"
                onClick={() => setEditing(true)}
              >
                <Edit3 size={17} />
                Editar perfil
              </button>

              <button
                className="profile-logout-button"
                type="button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Sair
              </button>
            </div>
          )}
        </section>

        {/* ESTATÍSTICAS */}

        {isOfertante && (
          <section className="profile-stats">
            <div>
              <strong>{publishedServices.length}</strong>

              <span>Serviços publicados</span>
            </div>

            <div>
              <strong>{tipoUsuarioLabel}</strong>

              <span>Tipo de usuário</span>
            </div>
          </section>
        )}

        {/* CONTEÚDO */}

        <div
          className={
            isOfertante
              ? "profile-content-grid"
              : "profile-content-grid profile-content-grid-single"
          }
        >
          {/* SERVIÇOS DO OFERTANTE */}

          {isOfertante && (
            <section className="profile-panel">
              <div className="profile-panel-title">
                <div>
                  <h2>
                    {isOwnProfile ? "Meus serviços" : "Serviços publicados"}
                  </h2>

                  <p>Serviços cadastrados por este usuário.</p>
                </div>

                {isOwnProfile && (
                  <Link to="/cadastrar-servico">
                    <Plus size={17} />
                    Novo serviço
                  </Link>
                )}
              </div>

              <div className="profile-services">
                {publishedServices.length > 0 ? (
                  publishedServices.map((service) => {
                    const location = service.localizacao
                      ? [
                          service.localizacao.bairro,

                          service.localizacao.cidade,

                          service.localizacao.estado,
                        ]
                          .filter(Boolean)
                          .join(" • ")
                      : "Localização não informada";

                    return (
                      <article key={service.id}>
                        <div className="profile-service-image">
                          <UserRound size={28} />
                        </div>

                        <div>
                          <span>
                            {service.categoria?.nome ?? "Sem categoria"}
                          </span>

                          <h3>{service.name}</h3>

                          <p>
                            <MapPin size={15} />

                            {location}
                          </p>
                        </div>

                        <Link to={`/detalhes-servico/${service.id}`}>Ver</Link>
                      </article>
                    );
                  })
                ) : (
                  <p className="profile-empty">
                    Nenhum serviço publicado até o momento.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* INFORMAÇÕES DO PERFIL */}

          <aside className="profile-side">
            <section>
              <ShieldCheck />

              <h3>Informações do perfil</h3>

              <p>
                <strong>Tipo:</strong> {tipoUsuarioLabel}
              </p>

              <p>
                <strong>Perfil:</strong> {perfilUsuarioLabel}
              </p>

              <p>
                <strong>Gênero:</strong> {generoLabel}
              </p>

              <p>
                <strong>Data de nascimento:</strong> {formattedBirthDate}
              </p>
            </section>
          </aside>
        </div>

        {/* MENSAGEM DE SUCESSO */}

        {saved && (
          <div className="profile-toast">
            <Check size={18} />
            Perfil atualizado com sucesso
          </div>
        )}
      </div>

      <Footer />

      {/* MODAL DE EDIÇÃO */}

      {editing && isOwnProfile && (
        <div
          className="profile-edit-overlay"
          onMouseDown={() => setEditing(false)}
        >
          <section
            className="profile-edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* CABEÇALHO DO MODAL */}

            <header>
              <div>
                <span>MINHA CONTA</span>

                <h2 id="edit-profile-title">Editar perfil</h2>

                <p>Mantenha suas informações atualizadas.</p>
              </div>

              <button
                type="button"
                onClick={() => setEditing(false)}
                aria-label="Fechar"
              >
                <X />
              </button>
            </header>

            {/* FORMULÁRIO */}

            <form onSubmit={saveProfile}>
              {/* NOME */}

              <GenericTextField
                width="300px"
                label="Nome completo"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Ex: Luiz Carlos dos Santos"
              />

              {/* E-MAIL */}

              <GenericTextField
                width="300px"
                label="E-mail"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="Ex: seuemail@gmail.com"
              />

              <SingleSelect
                label="Tipo de Usuário"
                width="310px"
                value={form.tipoUsuario}
                onChange={() => {}}
                options={TipoUsuario.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                disabled={isPessoaJuridica}
              />
              {/* GÊNERO */}

              <SingleSelect
                label="Gênero"
                width="310px"
                value={form.genero}
                onChange={(value) => updateField("genero", value)}
                options={GENDER_OPTIONS.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {/* TIPO DE PERFIL */}

              <SingleSelect
                label="Tipo de perfil"
                width="310px"
                value={form.perfilUsuario}
                onChange={(value) => updateField("perfilUsuario", value)}
                options={profileOptions}
                disabled={isPessoaJuridica}
              />

              {/* DATA DE NASCIMENTO */}

              <DataPicker
                label="Data de nascimento"
                width="310px"
                value={form.dataNascimento}
                onChange={(value) => updateField("dataNascimento", value)}
              />
              {isPessoaJuridica && (
                <div className="profile-notification-container">
                  <div className="profile-info-message">
                    <CircleAlert size={20} />
                    <span>
                      Contas de Pessoa Jurídica podem atuar somente como
                      ofertante. Para atuar como beneficiário, será necessário
                      criar uma nova conta como Pessoa Física.
                    </span>
                  </div>
                </div>
              )}
              {/* AÇÕES */}

              <div className="profile-edit-actions profile-edit-full">
                <button type="button" onClick={() => setEditing(false)}>
                  Cancelar
                </button>

                <button type="submit">
                  <Check size={17} />
                  Salvar alterações
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
