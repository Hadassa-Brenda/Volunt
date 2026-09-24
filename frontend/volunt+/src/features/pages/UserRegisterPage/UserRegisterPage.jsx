import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";

import {
  INITIAL_USER_REGISTER_FORM,
  REGISTER_IMAGES,
} from "./types/userRegisterConsts";

import { GENDER_OPTIONS } from "../../../types/enum/Gender";
import { TipoUsuario } from "types/enum/TipoUsuario";
import { PROFILE_TYPES } from "types/enum/ProfileTypes";

import "../../../styles/global.css";

import {
  formatCnpj,
  validateField,
  validateForm,
} from "./Utils/userRegisterValidation";

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
  const isPessoaJuridica = form.tipoUsuario === "PJ";
  const isPessoaFisica = form.tipoUsuario === "PF";

  function updateField(field, value) {
    const nextForm = {
      ...form,
      [field]: value,
    };

    if (field === "tipoUsuario" && value === "PJ") {
      nextForm.gender = "";
      nextForm.dataNascimento = "";
    }

    if (field === "tipoUsuario" && value === "PF") {
      nextForm.cnpj = "";
    }

    setForm(nextForm);

    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));

    const fieldError = validateField(field, nextForm[field], nextForm);

    setErrors((current) => ({
      ...current,
      [field]: fieldError,
      ...(field === "tipoUsuario"
        ? { cnpj: "", gender: "", dataNascimento: "" }
        : {}),
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
      cnpj: true,
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

      return;
    }

    const newUser = {
      id: Date.now(),

      fullName: form.fullName.trim(),

      email: form.email.trim(),

      tipoUsuario: form.tipoUsuario,

      cnpj: isPessoaJuridica
        ? form.cnpj.replace(/\D/g, "")
        : null,

      genero: isPessoaFisica ? form.gender : null,

      perfilUsuario: form.perfilUsuario,

      dataNascimento:
        isPessoaFisica ? form.dataNascimento || null : null,

      password: form.password,
    };

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

    if (onSubmitUser) {
      onSubmitUser(newUser);
    }

    alert("Cadastro realizado com sucesso!");

    resetForm();

    navigate("/");
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

        <h1 className="user-register-page__topbar-title">
          Cadastre-se no Voluntá+
        </h1>
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
              label="Tipo de Usuário"
              value={form.tipoUsuario || ""}
              onChange={(value) => updateField("tipoUsuario", value)}
              options={TipoUsuario.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              onBlur={() => handleBlur("tipoUsuario")}
              error={Boolean(shouldShowError("tipoUsuario"))}
              helperText={shouldShowError("tipoUsuario")}
            />

            {isPessoaJuridica && (
              <GenericTextField
                label="CNPJ"
                value={form.cnpj}
                onChange={(value) => updateField("cnpj", formatCnpj(value))}
                onBlur={() => handleBlur("cnpj")}
                placeholder="00.000.000/0000-00"
                error={Boolean(shouldShowError("cnpj"))}
                helperText={shouldShowError("cnpj")}
              />
            )}

            {isPessoaFisica && (
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
                helperText={shouldShowError("gender")}
              />
            )}

            {isPessoaFisica && (
              <DataPicker
                label="Data de nascimento"
                width="400px"
                value={form.dataNascimento}
                onChange={(value) => updateField("dataNascimento", value)}
                onBlur={() => handleBlur("dataNascimento")}
                error={Boolean(shouldShowError("dataNascimento"))}
                helperText={shouldShowError("dataNascimento")}
              />
            )}

            <SingleSelect
              label="Tipo de perfil"
              value={form.perfilUsuario || ""}
              onChange={(value) => updateField("perfilUsuario", value)}
              options={PROFILE_TYPES.map((profileType) => ({
                value: profileType.value,
                label: profileType.label,
              }))}
              onBlur={() => handleBlur("perfilUsuario")}
              error={Boolean(shouldShowError("perfilUsuario"))}
              helperText={shouldShowError("perfilUsuario")}
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
