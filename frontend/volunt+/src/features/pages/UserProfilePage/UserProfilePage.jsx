import { useMemo } from "react";
import { ArrowLeft, Edit3, Flag, Mail, MapPin, MessageCircle, Plus, ShieldCheck, UserRound } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import "./UserProfilePage.css";

const providerProfile = {
  fullName: "Projeto Aprender",
  email: "contato@projetoaprender.org",
  whatsapp: "(31) 99999-9999",
  city: "Belo Horizonte",
  state: "MG",
  profileType: "Projeto social",
  bio: "Iniciativa dedicada ao desenvolvimento educacional de crianças e adolescentes por meio de aulas e acompanhamento voluntário.",
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("volunt-user") || "null");
  const isOwnProfile = !id;
  const user = isOwnProfile ? storedUser : providerProfile;
  const reports = JSON.parse(localStorage.getItem("volunt-reports") || "[]");
  const publishedServices = useMemo(
    () => isOwnProfile ? servicesDTO.slice(0, 2) : servicesDTO.filter((service) => service.provider === "Projeto Aprender"),
    [isOwnProfile],
  );

  if (isOwnProfile && !user) {
    return <main className="profile-page"><Header/><section className="profile-login-required"><UserRound size={42}/><h1>Entre para acessar seu perfil</h1><p>Faça login para acompanhar seus serviços e denúncias.</p><Link className="profile-primary-button" to="/login">Entrar na plataforma</Link></section><Footer/></main>;
  }

  const name = user.fullName || user.name || "Usuário Voluntá+";
  return <main className="profile-page">
    <Header />
    <div className="profile-container">
      <button className="back-button" type="button" onClick={() => navigate(-1)}><ArrowLeft size={18}/>Voltar</button>
      <section className="profile-cover">
        <div className="profile-avatar">{name.slice(0, 2).toUpperCase()}</div>
        <div className="profile-identity"><span>{user.profileType || "Voluntário"}</span><h1>{name}</h1><p>{user.bio || "Pessoa participante da comunidade Voluntá+, conectando habilidades a iniciativas que geram impacto social."}</p><div className="profile-contact"><span><MapPin size={16}/>{[user.city, user.state].filter(Boolean).join(" - ") || "Localização não informada"}</span><span><Mail size={16}/>{user.email}</span>{user.whatsapp && <span><MessageCircle size={16}/>{user.whatsapp}</span>}</div></div>
        {isOwnProfile && <button className="profile-outline-button" type="button"><Edit3 size={17}/>Editar perfil</button>}
      </section>

      <section className="profile-stats"><div><strong>{publishedServices.length}</strong><span>Serviços publicados</span></div><div><strong>{isOwnProfile ? reports.length : 0}</strong><span>Denúncias enviadas</span></div><div><strong>Ativo</strong><span>Status do perfil</span></div></section>

      <div className="profile-content-grid">
        <section className="profile-panel"><div className="profile-panel-title"><div><h2>{isOwnProfile ? "Meus serviços" : "Serviços publicados"}</h2><p>Oportunidades cadastradas por este perfil.</p></div>{isOwnProfile && <Link to="/cadastrar-servico"><Plus size={17}/>Novo serviço</Link>}</div>
          <div className="profile-services">{publishedServices.length ? publishedServices.map(service => <article key={service.id}><img src={service.image} alt=""/><div><span>{service.category}</span><h3>{service.title}</h3><p><MapPin size={15}/>{service.city} · {service.modality}</p></div><Link to={`/detalhes-servico/${service.id}`}>Ver</Link></article>) : <p className="profile-empty">Nenhum serviço publicado até o momento.</p>}</div>
        </section>

        <aside className="profile-side">
          <section><ShieldCheck/><h3>Perfil da comunidade</h3><p>Confira as informações antes de combinar qualquer atividade ou atendimento.</p></section>
          {isOwnProfile && <section><Flag/><h3>Minhas denúncias</h3><p>{reports.length ? `${reports.length} denúncia(s) registrada(s) neste dispositivo.` : "Você ainda não enviou denúncias."}</p><Link to="/denuncias">Consultar histórico</Link></section>}
        </aside>
      </div>
    </div><Footer/>
  </main>;
}
