import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { requestPasswordReset } from "./services/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await requestPasswordReset(email);
      setStatus({
        type: "success",
        message:
          response?.message ||
          "Se esse e-mail estiver cadastrado, enviaremos instruções para redefinição de senha.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Não foi possível solicitar a recuperação da senha.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-page__left">
        <header className="user-register-page__topbar">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </header>

        <Link className="header__brand" to="/" aria-label="Voluntá+ início">
          <span className="header__brand-icon">♡</span>
          <strong>Voluntá+</strong>
        </Link>

        <div className="login-page__text">
          <span className="login-page__tag">Segurança</span>
          <h1>
            Recuperar <span>senha</span>
          </h1>
          <p>
            Digite seu e-mail para receber instruções de redefinição de senha.
          </p>
        </div>
      </section>

      <section className="login-page__right">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__header">
            <span>Esqueci minha senha</span>
            <h2>Redefinir acesso</h2>
            <p>Vamos te ajudar a recuperar sua conta.</p>
          </div>

          <label className="login-card__field">
            E-mail
            <div>
              <Mail size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
          </label>

          {status.message && (
            <p
              className={
                status.type === "success"
                  ? "login-card__success"
                  : "login-card__error"
              }
              role="alert"
            >
              {status.message}
            </p>
          )}

          <button
            className="login-card__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar link"}
          </button>

          <p className="login-card__footer">
            Lembrou a senha? <Link to="/login">Voltar para o login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
