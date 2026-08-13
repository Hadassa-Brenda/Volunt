import { ArrowLeft, Lock, Mail, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "./services/authService";
import "./LoginPages.css";
import "../../../styles/global.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await login(form.email, form.password);
      sessionStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-page__left">
        <header className="user-register-page__topbar">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/")}
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
          <span className="login-page__tag">Bem-vindo de volta</span>

          <h1>
            Entre para continuar <br />
            <span>ajudando</span> sua comunidade
          </h1>

          <p>
            Acesse sua conta para cadastrar serviços voluntários, encontrar
            oportunidades e se conectar com pessoas próximas.
          </p>
        </div>

        <div className="login-page__info-card">
          <Search size={22} />

          <div>
            <strong>Conecte-se com propósito</strong>
            <span>Encontre e ofereça ajuda de forma simples.</span>
          </div>
        </div>
      </section>

      <section className="login-page__right">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__header">
            <span>Login</span>
            <h2>Acessar conta</h2>
            <p>Informe seus dados para entrar na plataforma.</p>
          </div>

          <label className="login-card__field">
            E-mail
            <div>
              <Mail size={18} />

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
          </label>

          <label className="login-card__field">
            Senha
            <div>
              <Lock size={18} />

              <input
                required
                type="password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Digite sua senha"
              />
            </div>
          </label>

          <div className="login-card__options">
            <label>
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <a href="#recuperar-senha">Esqueci minha senha</a>
          </div>

          <button className="login-card__button" type="submit">
            Entrar
          </button>

          <p className="login-card__footer">
            Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
