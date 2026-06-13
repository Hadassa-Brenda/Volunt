import { ArrowLeft, Heart, Lock, Mail, Search } from "lucide-react";
import { useState } from "react";

import "../LoginPages/LoginPages.css";

export default function LoginPage({ onBackHome }) {
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

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Login:", form);
  }

  return (
    <main className="login-page">
      <section className="login-page__left">
        <button
          className="login-page__back-button"
          type="button"
          onClick={onBackHome}
          style={{
            width: "fit-content",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
            border: "1px solid #dfe4ef",
            borderRadius: "999px",
            padding: "10px 16px",
            background: "#ffffff",
            color: "#081035",
            fontSize: "14px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 12px 28px rgba(15, 20, 55, 0.08)",
          }}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <a className="login-page__logo" href="#top">
          <div>
            <Heart size={22} fill="currentColor" />
          </div>

          <span>Voluntários</span>
        </a>

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
            Ainda não tem conta? <a href="#cadastro">Criar conta</a>
          </p>
        </form>
      </section>
    </main>
  );
}