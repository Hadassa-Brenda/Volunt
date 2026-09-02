import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";

import FieldError from "../../../components/FieldError/FieldError";
import { register } from "../../pages/UserRegisterPage/services/authService";
import {
  INITIAL_USER_REGISTER_FORM,
  REGISTER_IMAGES,
} from "./types/userRegisterConsts";
import { GENDER_OPTIONS } from "../../../types/enum/Gender";

import { PROFILE_TYPES } from "types/enum/ProfileTypes";
import "../../../styles/global.css";
import { validateField, validateForm } from "./Utils/userRegisterValidation";
import "./UserRegisterPage.css";
import SingleSelect from "components/SingleSelect.tsx/SingleSelect";
import GenericTextField from "components/TextField/TextField";
import DataPicker from "components/DataPicker/DataPicker";

export default function UserRegisterPage({ onSubmitUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_USER_REGISTER_FORM);
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
  // const fetchCep = async (e) => {
  //   const cep = e.target.value.replace(/\D/g, "");

  //   setForm((prev) => ({
  //     ...prev,
  //     cep,
  //   }));

  //   if (cep.length !== 8) return;

  //   try {
  //     const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //     const data = await res.json();

  //     if (data.erro) {
  //       throw new Error("CEP não encontrado");
  //     }

  //     setForm((prev) => ({
  //       ...prev,
  //       cep,
  //       bairro: data.bairro,
  //       city: data.localidade,
  //       state: data.uf,
  //     }));
  //   } catch (err) {
  //     console.error("Erro:", err);
  //   }
  // };

  function shouldShowError(field) {
    return touchedFields[field] && errors[field];
  }

  function markAllFieldsAsTouched() {
    setTouchedFields({
      fullName: true,
      email: true,
      whatsapp: true,
      profileType: true,
      dataNascimento: true,
      gender: true,
      confirmPassword: true,
      acceptTerms: true,
    });
  }

  function resetForm() {
    setForm(INITIAL_USER_REGISTER_FORM);
    setErrors({});
    setTouchedFields({});
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      markAllFieldsAsTouched();
      return;
    }

    try {
      const data = await register(
        form.email,
        form.profileType,
        form.confirmPassword,
        form.password,
        form.fullName,
        form.dataNascimento,
        form.gender,
      );
      sessionStorage.setItem("token", data.token);
      if (onSubmitUser) {
        onSubmitUser(data.user);
      }
      navigate("/");
    } catch (_) {
      alert("E-mail ou senha inválidos.");
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
          className="back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", margin: "0", fontWeight: "bold" }}>
            Cadastre-se no Voluntá+
          </h1>
        </div>
      </header>

      <section className="user-register-page__content">
        <form className="user-register-form" onSubmit={handleSubmit} noValidate>
          <div className="user-register-form__title">
            <div>
              <UserPlus size={26} />
            </div>

            <div>
              <h2>Informações de cadastro</h2>
              <p>
                Crie uma conta para cadastrar serviços voluntários, encontrar
                ações sociais e participar da comunidade.
              </p>
            </div>
          </div>

          <div className="user-register-form__grid">
            <GenericTextField
              label="Nome completo"
              value={form.fullName}
              onChange={(value) => updateField("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="Ex: Luiz Carlos dos Santos"
              error={Boolean(shouldShowError("fullName"))}
              helperText={shouldShowError("fullName")}
            />
            <GenericTextField
              label="E-mail"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              onBlur={() => handleBlur("email")}
              placeholder="Ex: seuemail@gmail.com"
              error={Boolean(shouldShowError("email"))}
              helperText={shouldShowError("email")}
            />
          </div>
          <div className="user-register-form_select">
            <SingleSelect
              label="Gênero"
              width="260px"
              value={form.gender || ""}
              onChange={(value) => updateField("gender", value)}
              options={GENDER_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              onBlur={() => handleBlur("gender")}
              error={Boolean(shouldShowError("gender"))}
            />
            <DataPicker label="Data de nascimento" width="260px" />
            <SingleSelect
              label="Tipo de perfil"
              value={form.profileType || ""}
              width="260px"
              onChange={(value) => updateField("profileType", value)}
              options={PROFILE_TYPES.map((profileType) => ({
                value: profileType.value,
                label: profileType.label,
              }))}
              onBlur={() => handleBlur("profileType")}
              error={Boolean(shouldShowError("profileType"))}
            />
          </div>
          <div className="user-register-form__grid">
            <GenericTextField
              label="Senha"
              type="password"
              value={form.password}
              onChange={(value) => updateField("password", value)}
              onBlur={() => handleBlur("password")}
              placeholder="Mínimo 8 caracteres"
              error={Boolean(shouldShowError("password"))}
              helperText={shouldShowError("password")}
            />
            <GenericTextField
              label="Confirmar senha"
              type="password"
              value={form.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              placeholder="Mínimo 8 caracteres"
              error={Boolean(shouldShowError("confirmPassword"))}
              helperText={shouldShowError("confirmPassword")}
            />
          </div>
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
              onClick={handleSubmit}
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
