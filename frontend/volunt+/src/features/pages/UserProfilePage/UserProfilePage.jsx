import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRightLeft,
  CalendarDays,
  Check,
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
import { DiaSemana } from "../../../types/enum/DiaSemana";
import { Turno } from "../../../types/enum/Turno";

import SingleSelect from "components/SingleSelect.tsx/SingleSelect";
import GenericTextField from "components/TextField/TextField";
import DataPicker from "components/DataPicker/DataPicker";

import "./UserProfilePage.css";
import "./UserProfileEdit.css";

function getOptionLabel(options, value) {
  const normalizedValue = Array.isArray(value) ? value[0] : value;

  if (!normalizedValue) {
    return "";
  }

  const option = options.find(
    (item) =>
      String(item.value).toLowerCase() ===
        String(normalizedValue).toLowerCase() ||
      String(item.label).toLowerCase() ===
        String(normalizedValue).toLowerCase(),
  );

  return option?.label || String(normalizedValue);
}

export default function UserProfilePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const profileId = id ? Number(id) : null;

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("volunt-user") || "null");
    } catch {
      return null;
    }
  }, []);

  const isOwnProfile =
    !profileId || Number(storedUser?.id) === Number(profileId);

  const profileUser = useMemo(() => {
    if (isOwnProfile && storedUser) {
      return storedUser;
    }

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

    return userDTO.find((user) => Number(user.id) === Number(profileId));
  }, [profileId, isOwnProfile, storedUser]);

  const [user, setUser] = useState(profileUser);

  const [editing, setEditing] = useState(false);

  const [changingProfile, setChangingProfile] = useState(false);

  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: profileUser?.fullName || "",
    email: profileUser?.email || "",
    perfilUsuario: profileUser?.perfilUsuario ?? PROFILE_TYPES[0]?.value ?? "",
    dataNascimento: profileUser?.dataNascimento
      ? profileUser.dataNascimento.split("T")[0]
      : "",
  });

  useEffect(() => {
    setUser(profileUser);
  }, [profileUser]);

  useEffect(() => {
    if (!profileUser) {
      return;
    }

    setForm({
      fullName: profileUser.fullName || "",
      email: profileUser.email || "",
      perfilUsuario: profileUser.perfilUsuario ?? PROFILE_TYPES[0]?.value ?? "",
      dataNascimento: profileUser.dataNascimento
        ? profileUser.dataNascimento.split("T")[0]
        : "",
    });
  }, [profileUser]);

  const isOfertante = user?.perfilUsuario === "PF";

  const isPessoaJuridica = user?.tipoUsuario === "PJ";

  const profileOptions = PROFILE_TYPES.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const allServices = useMemo(() => {
    return getServices();
  }, []);

  const publishedServices = useMemo(() => {
    if (!user?.id || !isOfertante) {
      return [];
    }

    return allServices.filter(
      (service) => Number(service.idUsuario) === Number(user.id),
    );
  }, [allServices, user?.id, isOfertante]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleLogout() {
    localStorage.removeItem("volunt-user");

    setUser(null);

    navigate("/");
  }

  function switchProfile() {
    if (!user || isPessoaJuridica) {
      return;
    }

    const updatedUser = {
      ...user,
      perfilUsuario: user.perfilUsuario === "PF" ? "BF" : "PF",
    };

    localStorage.setItem("volunt-user", JSON.stringify(updatedUser));

    try {
      const users = JSON.parse(localStorage.getItem("volunt-users") || "[]");
      const updatedUsers = users.some(
        (item) => Number(item.id) === Number(updatedUser.id),
      )
        ? users.map((item) =>
            Number(item.id) === Number(updatedUser.id) ? updatedUser : item,
          )
        : [...users, updatedUser];

      localStorage.setItem("volunt-users", JSON.stringify(updatedUsers));
    } catch {
      localStorage.setItem("volunt-users", JSON.stringify([updatedUser]));
    }

    setUser(updatedUser);
    setChangingProfile(false);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function saveProfile(event) {
    event.preventDefault();

    if (!user) {
      return;
    }

    const updatedUser = {
      ...user,

      fullName: form.fullName,

      email: form.email,

      perfilUsuario: user.tipoUsuario === "PJ" ? "PF" : form.perfilUsuario,

      dataNascimento: form.dataNascimento
        ? `${form.dataNascimento}T00:00:00.000Z`
        : null,
    };

    localStorage.setItem("volunt-user", JSON.stringify(updatedUser));

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

    setUser(updatedUser);

    setEditing(false);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

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
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

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

              {!isPessoaJuridica && (
                <button
                  className="profile-switch-button"
                  type="button"
                  onClick={() => setChangingProfile(true)}
                >
                  <ArrowRightLeft size={17} />
                  Trocar perfil
                </button>
              )}

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

        <div
          className={
            isOfertante
              ? "profile-content-grid"
              : "profile-content-grid profile-content-grid-single"
          }
        >
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

                    const schedule = service.agendamentos?.[0];
                    const scheduleLabel = schedule
                      ? [
                          getOptionLabel(DiaSemana, schedule.diaSemana),
                          getOptionLabel(Turno, schedule.turno),
                        ]
                          .filter(Boolean)
                          .join(" • ")
                      : "Horário não informado";

                    return (
                      <article key={service.id}>
                        <div className="profile-service-image">
                          <img
                            src={
                              service.providerImage ||
                              `https://picsum.photos/400/300?random=${service.id}`
                            }
                            alt={service.name}
                          />
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

                          <p>
                            <CalendarDays size={15} />

                            {scheduleLabel}
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

        {saved && (
          <div className="profile-toast">
            <Check size={18} />
            Perfil atualizado com sucesso
          </div>
        )}
      </div>

      <Footer />

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

            <form onSubmit={saveProfile}>
              <GenericTextField
                width="300px"
                label="Nome completo"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Ex: Luiz Carlos dos Santos"
              />

              <GenericTextField
                width="300px"
                label="E-mail"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="Ex: seuemail@gmail.com"
              />

              <SingleSelect
                label="Tipo de perfil"
                width="310px"
                value={form.perfilUsuario}
                onChange={(value) => updateField("perfilUsuario", value)}
                options={profileOptions}
                disabled={isPessoaJuridica}
              />

              {isPessoaJuridica && (
                <div className="profile-notification-container">
                  <div className="profile-info-message">
                    <span>
                      Contas de Pessoa Jurídica podem atuar somente como
                      ofertante. Para atuar como beneficiário, será necessário
                      criar uma nova conta como Pessoa Física.
                    </span>
                  </div>
                </div>
              )}
              {!isPessoaJuridica && (
                <DataPicker
                  label="Data de nascimento"
                  width="310px"
                  value={form.dataNascimento}
                  onChange={(value) => updateField("dataNascimento", value)}
                />
              )}
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

      {changingProfile && isOwnProfile && (
        <div
          className="profile-edit-overlay"
          onMouseDown={() => setChangingProfile(false)}
        >
          <section
            className="profile-edit-modal profile-switch-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="switch-profile-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>CONFIGURAÇÃO DE PERFIL</span>

                <h2 id="switch-profile-title">Trocar perfil</h2>

                <p>
                  Você está trocando de {perfilUsuarioLabel.toLowerCase()} para{" "}
                  {user.perfilUsuario === "PF" ? "beneficiário" : "ofertante"}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setChangingProfile(false)}
                aria-label="Fechar"
              >
                <X />
              </button>
            </header>

            <div className="profile-switch-content">
              <p>Seus dados e sua conta continuarão salvos.</p>

              <ul>
                <li>Seus dados pessoais não serão apagados.</li>
                <li>Suas avaliações continuarão vinculadas à conta.</li>
                <li>Você poderá trocar de perfil novamente depois.</li>
              </ul>
            </div>

            <div className="profile-edit-actions profile-edit-full">
              <button type="button" onClick={() => setChangingProfile(false)}>
                Cancelar
              </button>

              <button type="button" onClick={switchProfile}>
                <Check size={17} />
                Confirmar troca
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
