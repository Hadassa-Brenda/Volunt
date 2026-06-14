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
import { useState } from "react";
import "../UserRegisterPage/UserRegisterPage.css";

const registerImages = {
  volunteer:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
  community:
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
};

const PROFILE_TYPES = [
  "Voluntário",
  "Projeto social / ONG",
  "Instituição",
  "Pessoa buscando ajuda",
];

const INITIAL_FORM = {
  fullName: "",
  email: "",
  whatsapp: "",
  profileType: "",
  city: "",
  neighborhood: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <small id={id} className="user-register-form__error">
      {message}
    </small>
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getOnlyNumbers(value) {
  return String(value || "").replace(/\D/g, "");
}

function validateField(field, value, form) {
  const textValue = String(value || "").trim();

  switch (field) {
    case "fullName":
      if (textValue.length < 3) {
        return "Informe seu nome completo.";
      }
      return "";

    case "email":
      if (!isValidEmail(textValue)) {
        return "Informe um e-mail válido.";
      }
      return "";

    case "whatsapp": {
      const numbers = getOnlyNumbers(textValue);

      if (!numbers) {
        return "Informe um WhatsApp para contato.";
      }

      if (numbers.length < 10 || numbers.length > 13) {
        return "Informe um WhatsApp válido com DDD.";
      }

      return "";
    }

    case "profileType":
      if (!textValue) {
        return "Selecione o tipo de perfil.";
      }
      return "";

    case "city":
      if (textValue.length < 2) {
        return "Informe sua cidade.";
      }
      return "";

    case "neighborhood":
      if (textValue.length < 2) {
        return "Informe seu bairro.";
      }
      return "";

    case "password":
      if (textValue.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
      }

      if (!/[A-Za-z]/.test(textValue) || !/[0-9]/.test(textValue)) {
        return "A senha deve ter letras e números.";
      }

      return "";

    case "confirmPassword":
      if (textValue !== form.password) {
        return "As senhas não conferem.";
      }
      return "";

    case "acceptTerms":
      if (!value) {
        return "Você precisa aceitar os termos para continuar.";
      }
      return "";

    default:
      return "";
  }
}

function validateForm(form) {
  const errors = {};

  Object.keys(form).forEach((field) => {
    const error = validateField(field, form[field], form);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

function sanitizeUserForm(form) {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    whatsapp: form.whatsapp.trim(),
    profileType: form.profileType,
    city: form.city.trim(),
    neighborhood: form.neighborhood.trim(),
  };
}

export default function UserRegisterPage({ onBackHome, onSubmitUser }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

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

  function shouldShowError(field) {
    return touchedFields[field] && errors[field];
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

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

    setForm(INITIAL_FORM);
    setErrors({});
    setTouchedFields({});
  }

  return (
    <main className="user-register-page">
      <div className="user-register-page__shape user-register-page__shape--one" />
      <div className="user-register-page__shape user-register-page__shape--two" />

      <div className="user-register-page__background-photo user-register-page__background-photo--left">
        <img src={registerImages.volunteer} alt="Ação voluntária" />
      </div>

      <div className="user-register-page__background-photo user-register-page__background-photo--right">
        <img src={registerImages.community} alt="Comunidade reunida" />
      </div>

      <header className="user-register-page__topbar">
        <button
          className="user-register-page__back-button"
          type="button"
          onClick={onBackHome}
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

            <label>
              WhatsApp <strong>*</strong>
              <div className="user-register-form__input-icon">
                <Phone size={18} />
                <input
                  type="tel"
                  inputMode="numeric"
                  value={form.whatsapp}
                  onChange={(event) =>
                    updateField("whatsapp", event.target.value)
                  }
                  onBlur={() => handleBlur("whatsapp")}
                  placeholder="Ex: (31) 98988-8283"
                  aria-invalid={Boolean(shouldShowError("whatsapp"))}
                  aria-describedby="whatsapp-error"
                />
              </div>
              <FieldError
                id="whatsapp-error"
                message={shouldShowError("whatsapp")}
              />
            </label>

            <label className="user-register-form__full-field">
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
              Cidade <strong>*</strong>
              <div className="user-register-form__input-icon">
                <MapPin size={18} />
                <input
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  onBlur={() => handleBlur("city")}
                  placeholder="Ex: Belo Horizonte, MG"
                  aria-invalid={Boolean(shouldShowError("city"))}
                  aria-describedby="city-error"
                />
              </div>
              <FieldError id="city-error" message={shouldShowError("city")} />
            </label>

            <label>
              Bairro <strong>*</strong>
              <div className="user-register-form__input-icon">
                <MapPin size={18} />
                <input
                  value={form.neighborhood}
                  onChange={(event) =>
                    updateField("neighborhood", event.target.value)
                  }
                  onBlur={() => handleBlur("neighborhood")}
                  placeholder="Ex: São Gabriel"
                  aria-invalid={Boolean(shouldShowError("neighborhood"))}
                  aria-describedby="neighborhood-error"
                />
              </div>
              <FieldError
                id="neighborhood-error"
                message={shouldShowError("neighborhood")}
              />
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
              onClick={onBackHome}
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
