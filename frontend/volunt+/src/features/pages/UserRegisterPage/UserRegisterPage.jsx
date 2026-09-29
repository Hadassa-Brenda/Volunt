import { useEffect, useState } from "react";
import { useAuth, useSignUp } from "@clerk/react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";

import {
  INITIAL_USER_REGISTER_FORM,
  REGISTER_IMAGES,
} from "./types/userRegisterConsts";

import { GENDER_OPTIONS } from "../../../types/enum/Gender";
import { TipoUsuario } from "types/enum/TipoUsuario";
import { PROFILE_TYPES } from "types/enum/ProfileTypes";
import { getClerkErrorMessage } from "../LoginPages/utils/clerkAuthUtils";

import "../../../styles/global.css";

import {
  formatCnpj,
  validateField,
  validateIdentityForm,
} from "./Utils/userRegisterValidation";

import "./UserRegisterPage.css";

import SingleSelect from "components/SingleSelect.tsx/SingleSelect";
import GenericTextField from "components/TextField/TextField";
import DataPicker from "components/DataPicker/DataPicker";
import { saveVoluntUser } from "../../../utils/userProfileStorage";

const IDENTITY_FIELDS = new Set(["email", "password", "confirmPassword"]);

function getErrorMessage(error, fallbackMessage) {
  return getClerkErrorMessage(error, fallbackMessage);
}

export default function UserRegisterPage() {
  const navigate = useNavigate();
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { signUp, errors: clerkErrors, fetchStatus } = useSignUp();

  const [form, setForm] = useState({
    ...INITIAL_USER_REGISTER_FORM,
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [step, setStep] = useState("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [flowError, setFlowError] = useState("");
  const [flowMessage, setFlowMessage] = useState("");
  const [showClerkErrors, setShowClerkErrors] = useState(false);

  const isPessoaJuridica = form.tipoUsuario === "PJ";
  const isPessoaFisica = form.tipoUsuario === "PF";
  const isVerifyingEmail = step === "verifyEmail";
  const isSubmitting = fetchStatus === "fetching";

  useEffect(() => {
    if (isAuthLoaded && isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isAuthLoaded, isSignedIn, navigate]);

  function updateField(field, value) {
    const nextForm = {
      ...form,
      [field]: value,
    };

    if (field === "tipoUsuario" && value === "PJ") {
      nextForm.perfilUsuario = PROFILE_TYPES[0].value;
      nextForm.gender = "";
      nextForm.dataNascimento = "";
    }

    if (field === "tipoUsuario" && value === "PF") {
      nextForm.cnpj = "";
    }

    setForm(nextForm);
    setFlowError("");
    setFlowMessage("");
    setShowClerkErrors(false);

    if (!IDENTITY_FIELDS.has(field)) {
      return;
    }

    setTouchedFields((current) => ({
      ...current,
      [field]: true,
    }));

    const fieldError = validateField(field, nextForm[field], nextForm);

    setErrors((current) => ({
      ...current,
      [field]: fieldError,
      ...(field === "password" && touchedFields.confirmPassword
        ? {
            confirmPassword: validateField(
              "confirmPassword",
              nextForm.confirmPassword,
              nextForm,
            ),
          }
        : {}),
    }));
  }

  function handleBlur(field) {
    if (!IDENTITY_FIELDS.has(field)) {
      return;
    }

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

  function getFieldError(field) {
    const localError = touchedFields[field] && errors[field];

    if (localError) {
      return localError;
    }

    if (!showClerkErrors) {
      return "";
    }

    const clerkField = {
      email: clerkErrors.fields.emailAddress,
      password: clerkErrors.fields.password,
      verificationCode: clerkErrors.fields.code,
    }[field];

    return clerkField
      ? getErrorMessage(clerkField, "Não foi possível validar este campo.")
      : "";
  }

  function markIdentityFieldsAsTouched() {
    setTouchedFields((current) => ({
      ...current,
      email: true,
      password: true,
      confirmPassword: true,
    }));
  }

  function clearPasswords() {
    setForm((current) => ({
      ...current,
      password: "",
      confirmPassword: "",
    }));
    setTouchedFields((current) => ({
      ...current,
      password: false,
      confirmPassword: false,
    }));
    setErrors((current) => ({
      ...current,
      password: "",
      confirmPassword: "",
    }));
  }

  async function finalizeSignUp() {
    const { error } = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          setFlowError(
            "O Clerk solicitou uma etapa adicional antes de ativar a sessão.",
          );
          return;
        }

        const clerkUserId = session?.userId || signUp.createdUserId;

        if (clerkUserId) {
          saveVoluntUser({
            clerkUserId,
            fullName: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            tipoUsuario: form.tipoUsuario,
            perfilUsuario: form.perfilUsuario,
            cnpj: form.cnpj,
            genero: form.gender,
            dataNascimento: form.dataNascimento
              ? `${form.dataNascimento}T00:00:00.000Z`
              : null,
            organizationName: isPessoaJuridica ? form.fullName.trim() : "",
            organizationEmail: "",
            phone: "",
            location: "",
            interests: [],
            areasOfWork: [],
            availability: [],
            description: "",
            logoUrl: "",
          });
        }

        const destination = decorateUrl("/");

        if (/^https?:\/\//.test(destination)) {
          window.location.assign(destination);
          return;
        }

        navigate(destination, { replace: true });
      },
    });

    if (error) {
      setShowClerkErrors(true);
      setFlowError(
        getErrorMessage(
          error,
          "Não foi possível ativar sua sessão. Tente novamente.",
        ),
      );
    }
  }

  async function handleIdentitySubmit() {
    const validationErrors = validateIdentityForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      markIdentityFieldsAsTouched();
      return;
    }

    setFlowError("");
    setFlowMessage("");
    setShowClerkErrors(false);

    const { error } = await signUp.password({
      emailAddress: form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (error) {
      setShowClerkErrors(true);
      setFlowError(
        getErrorMessage(
          error,
          "Não foi possível criar sua identidade. Revise os dados e tente novamente.",
        ),
      );
      return;
    }

    const nameParts = form.fullName.trim().split(/\s+/).filter(Boolean);

    if (nameParts.length && typeof signUp.update === "function") {
      const { error: nameError } = await signUp.update({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
      });

      if (nameError) {
        setFlowMessage(
          "Sua conta foi criada. O nome continuará disponível no perfil Voluntá+.",
        );
      }
    }

    clearPasswords();

    if (signUp.status === "complete") {
      await finalizeSignUp();
      return;
    }

    if (signUp.unverifiedFields.includes("email_address")) {
      setStep("verifyEmail");

      const verification = await signUp.verifications.sendEmailCode();

      if (verification.error) {
        setShowClerkErrors(true);
        setFlowError(
          getErrorMessage(
            verification.error,
            "Não foi possível enviar o código de verificação.",
          ),
        );
        return;
      }
      return;
    }

    await signUp.reset();
    setFlowError(
      "O Clerk solicitou dados adicionais que não fazem parte deste cadastro.",
    );
  }

  async function handleVerificationSubmit() {
    const code = verificationCode.trim();

    if (!code) {
      setErrors((current) => ({
        ...current,
        verificationCode: "Informe o código recebido por e-mail.",
      }));
      setTouchedFields((current) => ({
        ...current,
        verificationCode: true,
      }));
      return;
    }

    setFlowError("");
    setFlowMessage("");
    setShowClerkErrors(false);

    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      setShowClerkErrors(true);
      setFlowError(
        getErrorMessage(
          error,
          "O código informado é inválido ou expirou. Tente novamente.",
        ),
      );
      return;
    }

    if (signUp.status !== "complete") {
      setFlowError(
        "A verificação foi recebida, mas o Clerk ainda não concluiu o cadastro.",
      );
      return;
    }

    await finalizeSignUp();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || !isAuthLoaded) {
      return;
    }

    try {
      if (isVerifyingEmail) {
        await handleVerificationSubmit();
      } else {
        await handleIdentitySubmit();
      }
    } catch (error) {
      setShowClerkErrors(true);
      setFlowError(
        getErrorMessage(
          error,
          "Não foi possível concluir o cadastro agora. Tente novamente.",
        ),
      );
    }
  }

  async function handleResendCode() {
    if (isSubmitting) {
      return;
    }

    setFlowError("");
    setFlowMessage("");
    setShowClerkErrors(false);

    try {
      const { error } = await signUp.verifications.sendEmailCode();

      if (error) {
        setShowClerkErrors(true);
        setFlowError(
          getErrorMessage(error, "Não foi possível reenviar o código."),
        );
        return;
      }

      setFlowMessage("Um novo código foi enviado para seu e-mail.");
    } catch (error) {
      setFlowError(
        getErrorMessage(error, "Não foi possível reenviar o código."),
      );
    }
  }

  async function handleChangeEmail() {
    if (isSubmitting) {
      return;
    }

    await signUp.reset();
    setStep("form");
    setVerificationCode("");
    setErrors({});
    setTouchedFields({ email: true });
    setFlowError("");
    setFlowMessage("");
    setShowClerkErrors(false);
  }

  const emailError = getFieldError("email");
  const passwordError = getFieldError("password");
  const confirmPasswordError = getFieldError("confirmPassword");
  const verificationCodeError = getFieldError("verificationCode");
  const clerkGlobalError = showClerkErrors
    ? clerkErrors.fields.captcha || clerkErrors.global?.[0]
    : null;
  const visibleFlowError =
    flowError ||
    (clerkGlobalError
      ? getErrorMessage(
          clerkGlobalError,
          "Não foi possível concluir o cadastro.",
        )
      : "");

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
        <form
          className={`user-register-form${isVerifyingEmail ? " user-register-form--verification" : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {isVerifyingEmail ? (
            <section
              className="user-register-form__verification-view"
              aria-labelledby="email-verification-title"
            >
              <div className="user-register-form__verification-icon">
                <ShieldCheck size={28} />
              </div>
              <span className="user-register-form__verification-eyebrow">
                CONFIRMAÇÃO DE CONTA
              </span>
              <h2 id="email-verification-title">Verifique seu e-mail</h2>
              <p>Enviamos um código de confirmação para o seu e-mail:</p>
              <strong className="user-register-form__verification-email">
                {form.email}
              </strong>
              <p>Digite o código de 6 dígitos para continuar.</p>

              <GenericTextField
                label="Código de verificação"
                value={verificationCode}
                onChange={(value) => {
                  setVerificationCode(value.replace(/\D/g, "").slice(0, 6));
                  setErrors((current) => ({
                    ...current,
                    verificationCode: "",
                  }));
                  setTouchedFields((current) => ({
                    ...current,
                    verificationCode: true,
                  }));
                  setFlowError("");
                  setShowClerkErrors(false);
                }}
                placeholder="______"
                autoComplete="one-time-code"
                inputMode="numeric"
                disabled={isSubmitting}
                error={Boolean(verificationCodeError)}
                helperText={verificationCodeError}
                width="320px"
              />

              {flowMessage && (
                <p className="user-register-form__status" role="status">
                  {flowMessage}
                </p>
              )}
              {visibleFlowError && (
                <p className="user-register-form__flow-error" role="alert">
                  {visibleFlowError}
                </p>
              )}

              <div className="user-register-form__verification-actions">
                <button
                  className="user-register-form__link-button"
                  type="button"
                  onClick={handleResendCode}
                  disabled={isSubmitting}
                >
                  Não recebeu o código? Reenviar código
                </button>
                <div className="user-register-form__actions">
                  <button
                    className="user-register-form__secondary-button"
                    type="button"
                    onClick={handleChangeEmail}
                    disabled={isSubmitting}
                  >
                    Alterar e-mail
                  </button>
                  <button
                    className="user-register-form__primary-button"
                    type="submit"
                    disabled={isSubmitting || !isAuthLoaded}
                  >
                    <UserPlus size={18} />
                    {isSubmitting ? "Verificando..." : "Confirmar código"}
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <>
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

              <fieldset
            className="user-register-form__fields"
            disabled={isVerifyingEmail || isSubmitting}
          >
            <div className="user-register-form__grid">
              <GenericTextField
                label="Nome completo"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Ex: Luiz Carlos dos Santos"
              />

              <GenericTextField
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                onBlur={() => handleBlur("email")}
                placeholder="Ex: seuemail@gmail.com"
                autoComplete="email"
                error={Boolean(emailError)}
                helperText={emailError}
              />

              <SingleSelect
                label="Tipo de Usuário"
                value={form.tipoUsuario || ""}
                onChange={(value) => updateField("tipoUsuario", value)}
                options={TipoUsuario.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />

              {isPessoaJuridica && (
                <GenericTextField
                  label="CNPJ"
                  value={form.cnpj}
                  onChange={(value) => updateField("cnpj", formatCnpj(value))}
                  placeholder="00.000.000/0000-00"
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
                />
              )}

              {isPessoaFisica && (
                <DataPicker
                  label="Data de nascimento"
                  width="400px"
                  value={form.dataNascimento}
                  onChange={(value) => updateField("dataNascimento", value)}
                />
              )}

              {isPessoaJuridica ? (
                <div className="user-register-form__profile-note">
                  <strong>Perfil da organização</strong>
                  <span>Ofertante de oportunidades de voluntariado</span>
                </div>
              ) : (
                <SingleSelect
                  label="Tipo de perfil"
                  value={form.perfilUsuario || ""}
                  onChange={(value) => updateField("perfilUsuario", value)}
                  options={PROFILE_TYPES.map((profileType) => ({
                    value: profileType.value,
                    label: profileType.label,
                  }))}
                />
              )}
            </div>

            <div className="user-register-form__grid">
              <GenericTextField
                label="Senha"
                type="password"
                value={form.password}
                onChange={(value) => updateField("password", value)}
                onBlur={() => handleBlur("password")}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                error={Boolean(passwordError)}
                helperText={passwordError}
              />

              <GenericTextField
                label="Confirmar senha"
                type="password"
                value={form.confirmPassword}
                onChange={(value) => updateField("confirmPassword", value)}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
              />
            </div>

            <div
              id="clerk-captcha"
              className="user-register-form__captcha"
              data-cl-theme="light"
              data-cl-size="flexible"
              data-cl-language="pt-BR"
            />
              </fieldset>

              {flowMessage && (
                <p className="user-register-form__status" role="status">
                  {flowMessage}
                </p>
              )}

              {visibleFlowError && (
                <p className="user-register-form__flow-error" role="alert">
                  {visibleFlowError}
                </p>
              )}

              <div className="user-register-form__actions">
                <button
                  className="user-register-form__secondary-button"
                  type="button"
                  onClick={() => navigate("/")}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>

                <button
                  className="user-register-form__primary-button"
                  type="submit"
                  disabled={isSubmitting || !isAuthLoaded}
                >
                  <UserPlus size={18} />
                  {isSubmitting ? "Processando..." : "Criar conta"}
                </button>
              </div>

              <div className="user-register-form__safe-message">
                <ShieldCheck size={17} />
                Sua senha é processada somente pelo Clerk e não é armazenada
                pelo Voluntá+.
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
