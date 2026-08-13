import {
  HeartHandshake,
  Users,
  Search,
  HandHelping,
  ArrowRight,
  BadgeInfo,
  ArrowLeft,
} from "lucide-react";
import "./AboutVolunteering.css";
import "../UserRegisterPage/UserRegisterPage";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";

export default function AboutVolunteering() {
  const navigate = useNavigate();
  return (
    <main className="about-volunteering">
      <header className="user-register-page__topbar">
        <div style={{ padding: "10px" }}>
          <Button
            className="back-button"
            type="button"
            onClick={() => navigate("/")}
            icon={<ArrowLeft size={18} />}
            children={"Voltar"}
          />
        </div>
      </header>
      <section className="about-volunteering__hero">
        <div className="about-volunteering__hero-content">
          <span className="about-volunteering__badge">Sobre o projeto</span>

          <h1>
            Voluntariado que conecta
            <span> quem quer ajudar </span>
            com quem precisa de apoio
          </h1>

          <p>
            Este projeto foi criado para aproximar pessoas, iniciativas e
            serviços voluntários, funcionando como uma ponte entre quem pode
            oferecer ajuda e quem precisa dela. A proposta é reunir informações
            de forma clara, acessível e organizada, fortalecendo a comunidade
            por meio da solidariedade.
          </p>

          <div className="about-volunteering__hero-actions">
            <a
              href="#como-funciona"
              className="about-volunteering__primary-button"
            >
              Entender como funciona
              <ArrowRight size={18} />
            </a>

            <a
              href="#proposito"
              className="about-volunteering__secondary-button"
            >
              Ver propósito do projeto
            </a>
          </div>
        </div>

        <div className="about-volunteering__hero-panel">
          <div className="about-volunteering__hero-card">
            <div className="about-volunteering__hero-icon">
              <HeartHandshake size={26} />
            </div>
            <h3>Conectar</h3>
            <p>
              Aproximamos voluntários, instituições e pessoas que precisam de
              apoio.
            </p>
          </div>

          <div className="about-volunteering__hero-card">
            <div className="about-volunteering__hero-icon">
              <BadgeInfo size={26} />
            </div>
            <h3>Informar</h3>
            <p>
              Organizamos informações para facilitar a busca por serviços
              voluntários.
            </p>
          </div>

          <div className="about-volunteering__hero-card">
            <div className="about-volunteering__hero-icon">
              <Users size={26} />
            </div>
            <h3>Fortalecer a comunidade</h3>
            <p>
              Incentivamos a colaboração e o cuidado coletivo por meio do
              voluntariado.
            </p>
          </div>
        </div>
      </section>

      <section className="about-volunteering__section">
        <div className="about-volunteering__section-header">
          <span>Por que esse projeto existe?</span>
          <h2>Uma plataforma pensada para gerar impacto social</h2>
          <p>
            Muitas vezes, existem pessoas dispostas a ajudar e, ao mesmo tempo,
            pessoas ou instituições precisando desse apoio — mas essa conexão
            nem sempre acontece de forma simples. O projeto surgiu justamente
            para diminuir essa distância.
          </p>
        </div>

        <div className="about-volunteering__benefits">
          <article className="about-volunteering__benefit-card">
            <div className="about-volunteering__benefit-icon">
              <Search size={22} />
            </div>
            <h3>Facilitar o acesso à informação</h3>
            <p>
              Reunimos oportunidades e serviços voluntários em um só lugar,
              tornando a busca mais prática, rápida e clara.
            </p>
          </article>

          <article className="about-volunteering__benefit-card">
            <div className="about-volunteering__benefit-icon">
              <HandHelping size={22} />
            </div>
            <h3>Promover solidariedade</h3>
            <p>
              O projeto valoriza a ajuda mútua, incentivando a participação de
              pessoas que desejam contribuir com seu tempo, conhecimento e
              cuidado.
            </p>
          </article>

          <article className="about-volunteering__benefit-card">
            <div className="about-volunteering__benefit-icon">
              <Users size={22} />
            </div>
            <h3>Fortalecer vínculos comunitários</h3>
            <p>
              Quando a comunidade se conecta, surgem redes de apoio mais fortes,
              humanas e capazes de transformar realidades.
            </p>
          </article>
        </div>
      </section>

      <section
        className="about-volunteering__section about-volunteering__section--alt"
        id="como-funciona"
      >
        <div className="about-volunteering__section-header">
          <span>Como funciona</span>
          <h2>Uma ponte entre quem pode ajudar e quem precisa de ajuda</h2>
          <p>
            A ideia central do projeto é servir como um elo de conexão,
            divulgação e orientação para facilitar o encontro entre oferta e
            necessidade.
          </p>
        </div>

        <div className="about-volunteering__steps">
          <article className="about-volunteering__step-card">
            <div className="about-volunteering__step-number">1</div>
            <h3>Organiza informações</h3>
            <p>
              A plataforma reúne serviços e iniciativas voluntárias de forma
              mais estruturada e fácil de consultar.
            </p>
          </article>

          <article className="about-volunteering__step-card">
            <div className="about-volunteering__step-number">2</div>
            <h3>Conecta pessoas</h3>
            <p>
              Quem deseja ajudar encontra oportunidades. Quem precisa de apoio
              encontra caminhos e contatos.
            </p>
          </article>

          <article className="about-volunteering__step-card">
            <div className="about-volunteering__step-number">3</div>
            <h3>Gera impacto social</h3>
            <p>
              Ao facilitar essa conexão, o projeto contribui para uma comunidade
              mais acolhedora, participativa e solidária.
            </p>
          </article>
        </div>
      </section>

      <section className="about-volunteering__purpose" id="proposito">
        <div className="about-volunteering__purpose-content">
          <span>Nosso propósito</span>
          <h2>Mais do que divulgar serviços, queremos aproximar pessoas</h2>
          <p>
            O voluntariado tem o poder de transformar vidas — tanto de quem
            recebe quanto de quem ajuda. Por isso, este projeto busca oferecer
            um espaço informativo e acolhedor, capaz de conectar necessidades
            reais a pessoas dispostas a fazer a diferença.
          </p>

          <blockquote>
            “Ser uma ponte entre quem pode ajudar e quem precisa de ajuda,
            fortalecendo a comunidade por meio da informação, da empatia e da
            ação voluntária.”
          </blockquote>
        </div>
      </section>
    </main>
  );
}
