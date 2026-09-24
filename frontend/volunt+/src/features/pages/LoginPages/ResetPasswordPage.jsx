import { useMemo, useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { resetPassword } from "./services/authService";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token: paramToken } = useParams();
  const [searchParams] = useSearchParams();
  const tokenFromQuery = searchParams.get("token");
  const token = paramToken || tokenFromQuery || "";

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidToken = useMemo(() => Boolean(token), [token]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await resetPassword({
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setStatus({
        type: "success",
        message:
          response?.message ||
          "Senha redefinida com sucesso. Você já pode entrar na plataforma.",
      });

      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Não foi possível redefinir a senha.",
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
          <span className="login-page__tag">Acesso</span>
          <h1>
            Nova <span>senha</span>
          </h1>
          <p>
            Crie uma nova senha para continuar usando sua conta com segurança.
          </p>
        </div>
      </section>

      <section className="login-page__right">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__header">
            <span>Redefinir senha</span>
            <h2>Atualizar acesso</h2>
            <p>Preencha os campos abaixo para concluir a redefinição.</p>
          </div>

          {!isValidToken ? (
            <p className="login-card__error" role="alert">
              Token de redefinição inválido ou ausente. Solicite um novo link.
            </p>
          ) : (
            <>
              <label className="login-card__field">
                Nova senha
                <div>
                  <Lock size={18} />
                  <input
                    required
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    placeholder="Digite a nova senha"
                  />
                </div>
              </label>

              <label className="login-card__field">
                Confirmar senha
                <div>
                  <Lock size={18} />
                  <input
                    required
                    type="password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField("confirmPassword", event.target.value)
                    }
                    placeholder="Confirme a nova senha"
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
                {isSubmitting ? "Salvando..." : "Salvar nova senha"}
              </button>
            </>
          )}

          <p className="login-card__footer">
            Voltar para <Link to="/login">login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
