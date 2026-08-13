import { useMemo, useState } from "react";
import { ArrowLeft, Check, Edit3, Flag, Mail, MapPin, MessageCircle, Plus, ShieldCheck, UserRound, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import "./UserProfilePage.css";
import "./UserProfileEdit.css";

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
  const isOwnProfile = !id;
  const storedUser = JSON.parse(localStorage.getItem("volunt-user") || "null");
  const [user, setUser] = useState(() => isOwnProfile ? storedUser : providerProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(() => ({ fullName: storedUser?.fullName || storedUser?.name || "", email: storedUser?.email || "", whatsapp: storedUser?.whatsapp || "", profileType: storedUser?.profileType || "Voluntário", city: storedUser?.city || "", state: storedUser?.state || "", bio: storedUser?.bio || "" }));
  const reports = JSON.parse(localStorage.getItem("volunt-reports") || "[]");
  const publishedServices = useMemo(
    () => isOwnProfile ? servicesDTO.slice(0, 2) : servicesDTO.filter((service) => service.provider === "Projeto Aprender"),
    [isOwnProfile],
  );
  const updateField = ({ target: { name, value } }) => setForm(current => ({ ...current, [name]: value }));
  const saveProfile = event => { event.preventDefault(); const updated={...storedUser,...form,name:form.fullName}; localStorage.setItem("volunt-user",JSON.stringify(updated)); setUser(updated); setEditing(false); setSaved(true); window.setTimeout(()=>setSaved(false),2500); };

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
        {isOwnProfile && <button className="profile-outline-button" type="button" onClick={() => setEditing(true)}><Edit3 size={17}/>Editar perfil</button>}
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
      {saved && <div className="profile-toast"><Check size={18}/>Perfil atualizado com sucesso</div>}
    </div><Footer/>
    {editing && <div className="profile-edit-overlay" onMouseDown={() => setEditing(false)}><section className="profile-edit-modal" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onMouseDown={event => event.stopPropagation()}><header><div><span>MINHA CONTA</span><h2 id="edit-profile-title">Editar perfil</h2><p>Mantenha suas informações atualizadas.</p></div><button type="button" onClick={() => setEditing(false)} aria-label="Fechar"><X/></button></header><form onSubmit={saveProfile}><label className="profile-edit-full">Nome completo<strong>*</strong><input required name="fullName" value={form.fullName} onChange={updateField}/></label><label>E-mail<strong>*</strong><input required type="email" name="email" value={form.email} onChange={updateField}/></label><label>WhatsApp<input name="whatsapp" value={form.whatsapp} onChange={updateField} placeholder="(31) 99999-9999"/></label><label>Tipo de perfil<select name="profileType" value={form.profileType} onChange={updateField}><option>Voluntário</option><option>Pessoa física</option><option>Instituição</option><option>Projeto social</option></select></label><label>Cidade<input name="city" value={form.city} onChange={updateField}/></label><label>Estado<input name="state" value={form.state} onChange={updateField} maxLength="2"/></label><label className="profile-edit-full">Sobre você<textarea name="bio" value={form.bio} onChange={updateField} maxLength="300" rows="4" placeholder="Conte um pouco sobre você ou sua iniciativa..."/><small>{form.bio.length}/300 caracteres</small></label><div className="profile-edit-actions profile-edit-full"><button type="button" onClick={() => setEditing(false)}>Cancelar</button><button type="submit"><Check size={17}/>Salvar alterações</button></div></form></section></div>}
  </main>;
}
