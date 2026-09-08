import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";

import FieldError from "../../../components/FieldError/FieldError";

import {
  INITIAL_USER_REGISTER_FORM,
  REGISTER_IMAGES,
} from "./types/userRegisterConsts";

import { GENDER_OPTIONS } from "../../../types/enum/Gender";
import { TipoUsuario } from "types/enum/TipoUsuario";
import { PROFILE_TYPES } from "types/enum/ProfileTypes";

import "../../../styles/global.css";

import { validateField, validateForm } from "./Utils/userRegisterValidation";

import "./UserRegisterPage.css";

import SingleSelect from "components/SingleSelect.tsx/SingleSelect";
import GenericTextField from "components/TextField/TextField";
import DataPicker from "components/DataPicker/DataPicker";

export default function UserRegisterPage({ onSubmitUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ...INITIAL_USER_REGISTER_FORM,
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  function updateField(field, value) {
    const nextForm = {
      ...form,
      [field]: value,
    };

    setForm(nextForm);

    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));

    const fieldError = validateField(field, value, nextForm);

    setErrors((current) => ({
      ...current,
      [field]: fieldError,
    }));
  }

  function handleBlur(field) {
    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));

    const fieldError = validateField(field, form[field], form);

    setErrors((current) => ({
      ...current,
      [field]: fieldError,
    }));
  }

  function shouldShowError(field) {
    return touchedFields[field] && errors[field];
  }

  function markAllFieldsAsTouched() {
    setTouchedFields({
      fullName: true,
      email: true,
      gender: true,
      tipoUsuario: true,
      perfilUsuario: true,
      dataNascimento: true,
      password: true,
      confirmPassword: true,
    });
  }

  function resetForm() {
    setForm({
      ...INITIAL_USER_REGISTER_FORM,
    });

    setErrors({});
    setTouchedFields({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      markAllFieldsAsTouched();

      console.log("Erros de validação:", validationErrors);

      return;
    }

    const newUser = {
      id: Date.now(),

      fullName: form.fullName.trim(),

      email: form.email.trim(),

      tipoUsuario: form.tipoUsuario,

      genero: form.gender,

      perfilUsuario: form.perfilUsuario,

      dataNascimento: form.dataNascimento || null,

      password: form.password,
    };

    console.log("Novo usuário:", newUser);

    const storedUsers = JSON.parse(
      localStorage.getItem("volunt-users") || "[]",
    );

    const emailAlreadyExists = storedUsers.some(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase(),
    );

    if (emailAlreadyExists) {
      setErrors((current) => ({
        ...current,
        email: "Este e-mail já está cadastrado.",
      }));

      setTouchedFields((current) => ({
        ...current,
        email: true,
      }));

      return;
    }

    const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("volunt-users", JSON.stringify(updatedUsers));

    localStorage.setItem("volunt-user", JSON.stringify(newUser));

    console.log("Usuários salvos:", updatedUsers);

    console.log("Usuário atual:", newUser);

    if (onSubmitUser) {
      onSubmitUser(newUser);
    }

    alert("Cadastro realizado com sucesso!");

    resetForm();

    navigate(`/perfil/${newUser.id}`);
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
          <h1
            style={{
              fontSize: "24px",
              margin: "0",
              fontWeight: "bold",
            }}
          >
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

            <SingleSelect
              label="Gênero"
              width="400px"
              value={form.gender || ""}
              onChange={(value) => updateField("gender", value)}
              options={GENDER_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              onBlur={() => handleBlur("gender")}
              error={Boolean(shouldShowError("gender"))}
            />

            <SingleSelect
              label="Tipo de Usuário"
              width="400px"
              value={form.tipoUsuario || ""}
              onChange={(value) => updateField("tipoUsuario", value)}
              options={TipoUsuario.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              onBlur={() => handleBlur("tipoUsuario")}
              error={Boolean(shouldShowError("tipoUsuario"))}
            />

            <DataPicker
              label="Data de nascimento"
              width="400px"
              value={form.dataNascimento}
              onChange={(value) => updateField("dataNascimento", value)}
              onBlur={() => handleBlur("dataNascimento")}
            />

            <SingleSelect
              label="Tipo de perfil"
              width="400px"
              value={form.perfilUsuario || ""}
              onChange={(value) => updateField("perfilUsuario", value)}
              options={PROFILE_TYPES.map((profileType) => ({
                value: profileType.value,
                label: profileType.label,
              }))}
              onBlur={() => handleBlur("perfilUsuario")}
              error={Boolean(shouldShowError("perfilUsuario"))}
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
