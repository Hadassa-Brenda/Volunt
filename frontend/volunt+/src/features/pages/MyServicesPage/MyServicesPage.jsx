import {
  BarChart3,
  Edit3,
  Eye,
  Trash2,
  Plus,
  Settings,
  UserRound,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import "./MyServicesPage.css";
import { SERVICE_STATUS } from "../../../types/enum/Status";

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
          <Link to="/cadastrar-servico">
            <Plus />
            Criar serviço
          </Link>
          <Link to="/configuracoes">
            <LogOut />
            Sair
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
          <button>Ativo</button>
          <button>Inativo</button>
        </div>
        <section className="management-list">
          {servicesDTO.slice(0, 4).map((service, index) => (
            <article key={service.id}>
              <img src={service.image} alt="" />
              <div className="management-info">
                <h2>{service.name}</h2>
                <p>
                  Publicado em{" "}
                  {new Date(service.publishedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
                <span className={`status-${service.status}`}>
                 {SERVICE_STATUS.find((status) => status.value === service.status)?.label}
              </span>
              <div className="management-actions">
              <button style={{ background: " #8240f1", color: "white" }}
                onClick={() => navigate(`/detalhes-servico/${service.id}`)}
              >
                <Eye />
                Ver
              </button>
              <button style={{ background: " #8240f1", color: "white" }} >
                <Edit3 />
                Editar
              </button>
              <button style={{ background: " #8240f1", color: "white" }}>
                <Trash2 />
                Excluir
              </button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
