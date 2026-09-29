import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRightLeft,
  Building2,
  CalendarDays,
  Check,
  Edit3,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useClerk, useUser as useClerkUser } from "@clerk/react";

import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";

import { userDTO } from "../../../types/DTOs/userDTO";
import { getServices } from "../../../service/serviceService";

import { GENDER_OPTIONS } from "../../../types/enum/Gender";
import { TipoUsuario } from "../../../types/enum/TipoUsuario";
import { PROFILE_TYPES } from "../../../types/enum/ProfileTypes";
import { DiaSemana } from "../../../types/enum/DiaSemana";
import { Turno } from "../../../types/enum/Turno";
import {
  getVoluntUserByClerkId,
  saveVoluntUser,
} from "../../../utils/userProfileStorage";
import { getClerkErrorMessage } from "../LoginPages/utils/clerkAuthUtils";
import "../../../styles/global.css";
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

function toInputValue(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function getLocationValue(location) {
  if (typeof location === "string") {
    return location;
  }

  if (!location || typeof location !== "object") {
    return "";
  }

  return [location.bairro, location.cidade, location.estado]
    .filter(Boolean)
    .join(", ");
}

function createProfileForm(profile, clerkName = "") {
  const isPessoaJuridica = profile?.tipoUsuario === "PJ";
  const isOfertante = isPessoaJuridica || profile?.perfilUsuario === "PF";

  return {
    accountName: clerkName || profile?.fullName || "",
    perfilUsuario: profile?.perfilUsuario ?? PROFILE_TYPES[0]?.value ?? "",
    genero: profile?.genero || "",
    dataNascimento: profile?.dataNascimento
      ? profile.dataNascimento.split("T")[0]
      : "",
    phone: isOfertante ? profile?.phone || "" : "",
    location: getLocationValue(profile?.location),
    availability: !isPessoaJuridica && !isOfertante
      ? toInputValue(profile?.availability)
      : "",
    organizationName: profile?.organizationName || "",
    organizationEmail: profile?.organizationEmail || "",
    cnpj: isPessoaJuridica ? profile?.cnpj || "" : "",
    description: profile?.description || "",
    logoUrl: profile?.logoUrl || "",
  };
}

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user: clerkUser, isLoaded: isClerkUserLoaded } = useClerkUser();

  const { id } = useParams();
  const profileId = id || null;
  const clerkUserId = clerkUser?.id || "";
  const clerkEmail =
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    "";
  const clerkName =
    clerkUser?.fullName ||
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ");

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("volunt-user") || "null");
    } catch {
      return null;
    }
  }, []);

  const storedUsers = useMemo(() => {
    try {
      const users = JSON.parse(localStorage.getItem("volunt-users") || "[]");
      return Array.isArray(users) ? users : [];
    } catch {
      return [];
    }
  }, []);

  const currentStoredProfile = useMemo(() => {
    if (!clerkUserId) {
      return null;
    }

    return (
      getVoluntUserByClerkId(clerkUserId) ||
      storedUsers.find(
        (item) =>
          clerkEmail && item.email?.toLowerCase() === clerkEmail.toLowerCase(),
      ) ||
      (storedUser &&
      ((storedUser.clerkUserId && storedUser.clerkUserId === clerkUserId) ||
        (clerkEmail &&
          storedUser.email?.toLowerCase() === clerkEmail.toLowerCase()))
        ? storedUser
        : null)
    );
  }, [clerkEmail, clerkUserId, storedUser, storedUsers]);

  const isOwnProfile =
    !profileId ||
    String(profileId) === String(clerkUserId) ||
    (currentStoredProfile &&
      String(profileId) === String(currentStoredProfile.id));

  const profileUser = useMemo(() => {
    if (isOwnProfile) {
      if (!clerkUser) {
        return null;
      }

      return {
        ...currentStoredProfile,
        id: currentStoredProfile?.id || null,
        clerkUserId,
        fullName: clerkName || currentStoredProfile?.fullName || "",
        email: clerkEmail || currentStoredProfile?.email || "",
        tipoUsuario: currentStoredProfile?.tipoUsuario || "PF",
        perfilUsuario:
          currentStoredProfile?.tipoUsuario === "PJ"
            ? PROFILE_TYPES[0].value
            : currentStoredProfile?.perfilUsuario ?? PROFILE_TYPES[0]?.value,
        organizationName:
          currentStoredProfile?.organizationName ||
          (currentStoredProfile?.tipoUsuario === "PJ"
            ? currentStoredProfile.fullName
            : ""),
      };
    }

    const localUser = storedUsers.find(
      (user) => String(user.id) === String(profileId),
    );

    return (
      localUser ||
      userDTO.find((user) => String(user.id) === String(profileId)) ||
      null
    );
  }, [
    clerkEmail,
    clerkName,
    clerkUser,
    clerkUserId,
    currentStoredProfile,
    isOwnProfile,
    profileId,
    storedUsers,
  ]);

  const [user, setUser] = useState(profileUser);

  const [editing, setEditing] = useState(false);

  const [changingProfile, setChangingProfile] = useState(false);

  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [form, setForm] = useState(() =>
    createProfileForm(profileUser, clerkName),
  );

  useEffect(() => {
    setUser(profileUser);
  }, [profileUser]);

  useEffect(() => {
    if (!profileUser) {
      return;
    }

    setForm(createProfileForm(profileUser, clerkName));
  }, [clerkName, profileUser]);

  const isPessoaJuridica = user?.tipoUsuario === "PJ";
  const isOfertante = isPessoaJuridica || user?.perfilUsuario === "PF";

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
    setProfileError("");
  }

  async function handleLogout() {
    await signOut({ redirectUrl: "/" });
  }

  function switchProfile() {
    if (!user || isPessoaJuridica) {
      return;
    }

    const updatedUser = {
      ...user,
      perfilUsuario: user.perfilUsuario === "PF" ? "BF" : "PF",
    };

    setUser(saveVoluntUser(updatedUser));
    setChangingProfile(false);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  async function saveProfile(event) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setProfileError("");

    try {
      const nameParts = form.accountName.trim().split(/\s+/).filter(Boolean);

      if (clerkUser && form.accountName.trim() !== clerkName) {
        await clerkUser.update({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
        });
      }

      const updatedUser = { ...user };
      delete updatedUser.interests;
      delete updatedUser.areasOfWork;
      delete updatedUser.availability;
      if (!isPessoaJuridica) {
        delete updatedUser.cnpj;
        delete updatedUser.organizationName;
        delete updatedUser.organizationEmail;
        delete updatedUser.description;
        delete updatedUser.logoUrl;
      } else {
        delete updatedUser.genero;
        delete updatedUser.dataNascimento;
      }
      if (!isOfertante) {
        delete updatedUser.phone;
      }

      Object.assign(updatedUser, {
        ...(isOfertante ? { phone: form.phone.trim() } : {}),
        location: form.location.trim(),
        ...(isPessoaJuridica
          ? {
              organizationName: form.organizationName.trim(),
              organizationEmail: form.organizationEmail.trim(),
              cnpj: form.cnpj.trim(),
              description: form.description.trim(),
              logoUrl: form.logoUrl.trim(),
              perfilUsuario: PROFILE_TYPES[0]?.value,
            }
          : {
              perfilUsuario: form.perfilUsuario,
              genero: form.genero,
              dataNascimento: form.dataNascimento
                ? `${form.dataNascimento}T00:00:00.000Z`
                : null,
              ...(!isOfertante
                ? { availability: form.availability.trim() }
                : {}),
            }),
      });

      setUser(saveVoluntUser(updatedUser));

      setEditing(false);

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      setProfileError(
        getClerkErrorMessage(
          error,
          "Não foi possível atualizar o perfil. Tente novamente.",
        ),
      );
    }
  }

  if (!user) {
    return (
      <main className="profile-page">
        <Header />

        <section className="profile-login-required">
          {isOwnProfile && !isClerkUserLoaded ? (
            <p>Carregando perfil...</p>
          ) : (
            <>
              <UserRound size={42} />

              <h1>Usuário não encontrado</h1>

              <p>Não foi possível encontrar este perfil.</p>

              <Link className="profile-primary-button" to="/">
                Voltar para o início
              </Link>
            </>
          )}
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

  const name =
    (isPessoaJuridica ? user.organizationName : user.fullName) ||
    "Usuário Voluntá+";

  const avatarUrl = isPessoaJuridica
    ? user.logoUrl
    : isOwnProfile
      ? clerkUser?.imageUrl
      : user.avatarUrl;

  const formattedBirthDate = user.dataNascimento
    ? user.dataNascimento.split("T")[0].split("-").reverse().join("/")
    : "Não informado";

  return (
    <main className="profile-page">
      <Header/>

      <div className="profile-container">
        <button
            className="user-register-page__back-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        <section className="profile-cover">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={isPessoaJuridica ? `Logo de ${name}` : `Foto de ${name}`} />
            ) : (
              name.slice(0, 2).toUpperCase()
            )}
          </div>

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
            {isOwnProfile && clerkUser && (
              <section className="profile-account-section">
                <ShieldCheck />
                <h3>Conta e autenticação</h3>
                <p>
                  <strong>Nome da conta:</strong> {clerkName || "Não informado"}
                </p>
                <p>
                  <strong>E-mail:</strong> {clerkEmail || "Não informado"}
                </p>
                <small>Gerenciada com segurança pelo Clerk.</small>
              </section>
            )}

            <section>
              {isPessoaJuridica ? <Building2 /> : <Heart />}
              <h3>
                Perfil Voluntá+ · {isPessoaJuridica ? "Organização" : "Pessoa Física"}
              </h3>

              {isPessoaJuridica ? (
                <>
                  <p><strong>CNPJ:</strong> {user.cnpj || "Não informado"}</p>
                  <p><strong>Telefone:</strong> {user.phone || "Não informado"}</p>
                  <p><strong>Localização:</strong> {getLocationValue(user.location) || "Não informada"}</p>
                  <p><strong>E-mail de contato:</strong> {user.organizationEmail || "Não informado"}</p>
                  {user.description && <p>{user.description}</p>}
                </>
              ) : (
                <>
                  <p><strong>Tipo:</strong> {tipoUsuarioLabel}</p>
                  <p><strong>Perfil:</strong> {perfilUsuarioLabel}</p>
                  <p><strong>Gênero:</strong> {generoLabel}</p>
                  <p><strong>Data de nascimento:</strong> {formattedBirthDate}</p>
                  <p><strong>Localização:</strong> {getLocationValue(user.location) || "Não informada"}</p>
                  {isOfertante ? (
                    <p><strong>Telefone:</strong> {user.phone || "Não informado"}</p>
                  ) : (
                    <p><strong>Disponibilidade:</strong> {user.availability || "Não informada"}</p>
                  )}
                </>
              )}
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
              <section className="profile-edit-section profile-edit-full">
                <h3>Conta e autenticação</h3>
                <p>Esses dados são mantidos pelo Clerk.</p>
                <div className="profile-edit-account-data">
                  <span><strong>E-mail:</strong> {clerkEmail || "Não informado"}</span>
                  <span><strong>ID:</strong> {clerkUserId}</span>
                </div>
                <GenericTextField
                  label="Nome da conta"
                  value={form.accountName}
                  onChange={(value) => updateField("accountName", value)}
                  placeholder="Nome e sobrenome"
                />
              </section>

              {isPessoaJuridica ? (
                <>
                  <GenericTextField
                    label="Nome da organização"
                    value={form.organizationName}
                    onChange={(value) => updateField("organizationName", value)}
                    placeholder="Nome público da organização"
                  />
                  <GenericTextField
                    label="CNPJ"
                    value={form.cnpj}
                    onChange={(value) => updateField("cnpj", value)}
                    placeholder="00.000.000/0000-00"
                  />
                  <GenericTextField
                    label="E-mail de contato"
                    type="email"
                    value={form.organizationEmail}
                    onChange={(value) => updateField("organizationEmail", value)}
                    placeholder="contato@organizacao.org.br"
                  />
                  <GenericTextField
                    label="Logo (URL da imagem)"
                    value={form.logoUrl}
                    onChange={(value) => updateField("logoUrl", value)}
                    placeholder="https://..."
                  />
                  <label className="profile-edit-custom-field profile-edit-full">
                    Descrição da organização
                    <textarea
                      rows="4"
                      value={form.description}
                      onChange={(event) => updateField("description", event.target.value)}
                      placeholder="Conte sobre a organização e suas oportunidades."
                    />
                  </label>
                </>
              ) : (
                <>
                  <SingleSelect
                    label="Tipo de perfil"
                    value={form.perfilUsuario}
                    onChange={(value) => updateField("perfilUsuario", value)}
                    options={profileOptions}
                  />
                  <SingleSelect
                    label="Gênero"
                    value={form.genero}
                    onChange={(value) => updateField("genero", value)}
                    options={GENDER_OPTIONS.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                  />
                  <DataPicker
                    label="Data de nascimento"
                    value={form.dataNascimento}
                    onChange={(value) => updateField("dataNascimento", value)}
                  />
                  {!isOfertante && (
                    <GenericTextField
                      label="Disponibilidade"
                      value={form.availability}
                      onChange={(value) => updateField("availability", value)}
                      placeholder="Dias e horários disponíveis"
                    />
                  )}
                </>
              )}

              {isOfertante && (
                <GenericTextField
                  label="Telefone de contato"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="(00) 00000-0000"
                />
              )}
              <GenericTextField
                label="Localização"
                value={form.location}
                onChange={(value) => updateField("location", value)}
                placeholder="Cidade, bairro e estado"
              />
              {profileError && (
                <p className="profile-edit-error profile-edit-full" role="alert">
                  {profileError}
                </p>
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
