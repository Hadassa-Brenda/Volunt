import {
  BarChart3,
  Edit3,
  Eye,
  Flag,
  Heart,
  MoreHorizontal,
  Plus,
  Settings,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import "./MyServicesPage.css";

const status = ["Publicado", "Em análise", "Pausado", "Recusado"];
export default function MyServicesPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("volunt-user") || "null");
  const name = user?.fullName || user?.name || "Maria Silva";
  return (
    <main className="user-dashboard">
      <aside className="user-sidebar">
        <Link className="user-sidebar-brand" to="/">
          ♡ <strong>Voluntá+</strong>
        </Link>
        <div className="user-summary">
          <div>{name.slice(0, 2).toUpperCase()}</div>
          <strong>{name}</strong>
          <Link to="/perfil">Ver perfil</Link>
        </div>
        <nav>
          <Link to="/perfil">
            <UserRound />
            Meu perfil
          </Link>
          <Link className="active" to="/meus-servicos">
            <BarChart3 />
            Meus serviços
          </Link>
          <Link to="/explorar">
            <Heart />
            Favoritos
          </Link>
          <Link to="/cadastrar-servico">
            <Plus />
            Criar serviço
          </Link>
          <Link to="/configuracoes">
            <Settings />
            Configurações
          </Link>
          <Link to="/denuncias">
            <Flag />
            Denúncias
          </Link>
        </nav>
      </aside>
      <section className="user-dashboard-main">
        <header>
          <div>
            <h1>Meus serviços</h1>
            <p>Gerencie os serviços que você cadastrou.</p>
          </div>
          <Link to="/cadastrar-servico">
            <Plus />
            Novo serviço
          </Link>
        </header>
        <div className="service-tabs">
          <button className="active">Todos</button>
          <button>Em análise</button>
          <button>Publicados</button>
          <button>Pausados</button>
          <button>Recusados</button>
        </div>
        <section className="management-list">
          {servicesDTO.slice(0, 4).map((service, index) => (
            <article key={service.id}>
              <img src={service.image} alt="" />
              <div className="management-info">
                <h2>{service.title}</h2>
                <p>
                  Publicado em{" "}
                  {new Date(service.publishedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <span className={`status status-${index}`}>{status[index]}</span>
              <button
                onClick={() => navigate(`/detalhes-servico/${service.id}`)}
              >
                <Eye />
                Ver
              </button>
              <button>
                <Edit3 />
                Editar
              </button>
              <button className="more">
                <MoreHorizontal />
              </button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
