import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  HeartHandshake,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";

import FieldError from "../../../components/FieldError/FieldError";

import {
  INITIAL_USER_REGISTER_FORM,
  REGISTER_IMAGES,
} from "./types/userRegisterConsts";

import { PROFILE_TYPES } from "types/enum/ProfileTypes";

import { validateField, validateForm } from "./Utils/userRegisterValidation";

import { sanitizeUserForm } from "./Utils/userRegisterSanitizer";

import "./UserRegisterPage.css";

export default function UserRegisterPage({ onSubmitUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_USER_REGISTER_FORM);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [cep, setCep] = useState({});

  function updateField(field, value) {
    const nextForm = {
      ...form,
      [field]: value,
    };

    setForm(nextForm);

    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    const fieldError = validateField(field, value, nextForm);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: fieldError,
    }));
  }

  function handleBlur(field) {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    const fieldError = validateField(field, form[field], form);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: fieldError,
    }));
  }

const fetchCep = async (e) => {
  const cep = e.target.value.replace(/\D/g, "");

  setForm((prev) => ({
    ...prev,
    cep,
  }));

  if (cep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    setForm((prev) => ({
      ...prev,
      cep,
      bairro: data.bairro,
      city: data.localidade,
      state: data.uf,
    }));
  } catch (err) {
    console.error("Erro:", err);
  }
};

  function shouldShowError(field) {
    return touchedFields[field] && errors[field];
  }

  function markAllFieldsAsTouched() {
    setTouchedFields({
      fullName: true,
      email: true,
      whatsapp: true,
      profileType: true,
      city: true,
      neighborhood: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
  }

  function resetForm() {
    setForm(INITIAL_USER_REGISTER_FORM);
    setErrors({});
    setTouchedFields({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      markAllFieldsAsTouched();
      return;
    }

    const newUser = {
      ...sanitizeUserForm(form),
      createdAt: new Date().toISOString(),
      role: "user",
      status: "active",
    };

    console.log("Usuário cadastrado:", newUser);

    if (onSubmitUser) {
      onSubmitUser(newUser);
    }

    alert("Cadastro realizado com sucesso!");

    resetForm();
  }

  return (
    <main className="user-register-page">
      <div className="user-register-page__background-photo user-register-page__background-photo--left">
        <img src={REGISTER_IMAGES.volunteer} alt="Ação voluntária" />
      </div>

      <div className="user-register-page__background-photo user-register-page__background-photo--right">
        <img src={REGISTER_IMAGES.community} alt="Comunidade reunida" />
      </div>

      <header className="user-register-page__topbar">
        <button
          className="user-register-page__back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <a className="user-register-page__brand" href="#top">
          <span className="user-register-page__brand-icon">
            <HeartHandshake size={24} />
          </span>

          <strong>Voluntá+</strong>
        </a>
      </header>

      <section className="user-register-page__content">
        <div className="user-register-page__heading">
          <span>Crie sua conta</span>

          <h1>Cadastre-se no Voluntá+</h1>

          <p>
            Crie uma conta para cadastrar serviços voluntários, encontrar ações
            sociais e participar da comunidade.
          </p>
        </div>

        <form className="user-register-form" onSubmit={handleSubmit} noValidate>
          <div className="user-register-form__title">
            <div>
              <UserPlus size={26} />
            </div>

            <div>
              <h2>Informações de cadastro</h2>
              <p>Preencha os dados principais para criar sua conta.</p>
            </div>
          </div>

          <div className="user-register-form__grid">
            <label className="user-register-form__full-field">
              Nome completo <strong>*</strong>
              <div className="user-register-form__input-icon">
                <UserRound size={18} />

                <input
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  onBlur={() => handleBlur("fullName")}
                  placeholder="Ex: Luiz Carlos dos Santos"
                  aria-invalid={Boolean(shouldShowError("fullName"))}
                  aria-describedby="fullName-error"
                />
              </div>
              <FieldError
                id="fullName-error"
                message={shouldShowError("fullName")}
              />
            </label>

            <label>
              E-mail <strong>*</strong>
              <div className="user-register-form__input-icon">
                <Mail size={18} />

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="Ex: seuemail@gmail.com"
                  aria-invalid={Boolean(shouldShowError("email"))}
                  aria-describedby="email-error"
                />
              </div>
              <FieldError id="email-error" message={shouldShowError("email")} />
            </label>
            <label className="user-register-form__input-icon">
              Tipo de perfil <strong>*</strong>
              <select
                value={form.profileType}
                onChange={(event) =>
                  updateField("profileType", event.target.value)
                }
                onBlur={() => handleBlur("profileType")}
                aria-invalid={Boolean(shouldShowError("profileType"))}
                aria-describedby="profileType-error"
              >
                <option value="" disabled>
                  Selecione como você quer usar a plataforma
                </option>

                {PROFILE_TYPES.map((profileType) => (
                  <option key={profileType} value={profileType}>
                    {profileType}
                  </option>
                ))}
              </select>
              <FieldError
                id="profileType-error"
                message={shouldShowError("profileType")}
              />
            </label>

             <label>
              CEP <strong>*</strong>
              <div className="user-register-form__input-icon">
                <Mail size={18} />
                <input
                  maxLength={8}
                  type="text"
                  value={form.cep}
                  onChange={fetchCep}
                  placeholder="Ex: 31222-203"
                  aria-invalid={Boolean(shouldShowError("CEP"))}
                />
              </div>
              <FieldError id="cep-error" message={shouldShowError("cep")} />
            </label>
              
          <label>
              Bairro <strong>*</strong>
              <div className="user-register-form__input-icon">
                <MapPin size={18} />
                <input
                 style={{color: "#676767"}}
                 readOnly
                 value={form.bairro}
                 onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      bairro: e.target.value,
                    }))
                  }
                  placeholder="Ex: Ouro Preto"
                  aria-invalid={Boolean(shouldShowError("bairro"))}
                  aria-describedby="bairro-error"
                />
              </div>
            </label>
            <label>
              Cidade <strong>*</strong>
              <div className="user-register-form__input-icon">
                <MapPin size={18} />
                <input
                 style={{color: "#676767"}}
                 readOnly
                 value={form.city}
                 onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      cidade: e.target.value,
                    }))
                  }
                  placeholder="Ex: Belo Horizonte, MG"
                  aria-invalid={Boolean(shouldShowError("city"))}
                  aria-describedby="city-error"
                />
              </div>
            </label>
            <label>
              Estado <strong>*</strong>
              <div className="user-register-form__input-icon">
                <MapPin size={18} />
                <input
                  style={{color: "#676767"}}
                  disabled
                  value={form.state}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      estado: e.target.value,
                    }))
                  }
                  placeholder="Ex: Minas Gerais"
                  aria-invalid={Boolean(shouldShowError("Minas Gerais"))}
                  aria-describedby="neighborhood-error"
                />
              </div>
            </label>
            <label>
              Senha <strong>*</strong>
              <div className="user-register-form__input-icon">
                <LockKeyhole size={18} />

                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  placeholder="Mínimo 8 caracteres"
                  aria-invalid={Boolean(shouldShowError("password"))}
                  aria-describedby="password-error"
                />
              </div>
              <FieldError
                id="password-error"
                message={shouldShowError("password")}
              />
            </label>

            <label>
              Confirmar senha <strong>*</strong>
              <div className="user-register-form__input-icon">
                <LockKeyhole size={18} />

                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    updateField("confirmPassword", event.target.value)
                  }
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Digite a senha novamente"
                  aria-invalid={Boolean(shouldShowError("confirmPassword"))}
                  aria-describedby="confirmPassword-error"
                />
              </div>
              <FieldError
                id="confirmPassword-error"
                message={shouldShowError("confirmPassword")}
              />
            </label>
          </div>

          <label className="user-register-form__terms">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(event) =>
                updateField("acceptTerms", event.target.checked)
              }
            />

            <span>
              Li e aceito os termos de uso e a política de privacidade da
              plataforma. <strong>*</strong>
            </span>
          </label>

          <FieldError
            id="acceptTerms-error"
            message={shouldShowError("acceptTerms")}
          />

          <div className="user-register-form__actions">
            <button
              className="user-register-form__secondary-button"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>

            <button
              className="user-register-form__primary-button"
              type="submit"
            >
              <UserPlus size={18} />
              Criar conta
            </button>
          </div>

          <div className="user-register-form__safe-message">
            <ShieldCheck size={17} />
            Seus dados serão usados apenas para acesso e contato na plataforma.
          </div>
        </form>
      </section>
    </main>
  );
}
