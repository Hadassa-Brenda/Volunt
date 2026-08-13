import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Flag,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import { servicesMock } from "../DetalhesServico/constants/forms/serviceMock";
import "./ReportPage.css";

const reasons = [
  "Contato não funciona",
  "Serviço não existe mais",
  "Informações falsas ou incorretas",
  "Conteúdo comercial ou cobrança",
  "Conteúdo ofensivo ou inadequado",
  "Possível fraude ou risco à segurança",
  "Outro motivo",
];

export default function ReportPage({ history = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const service = useMemo(
    () =>
      [...servicesMock, ...servicesDTO].find(
        (item) => String(item.id) === String(id),
      ),
    [id],
  );
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [protocol, setProtocol] = useState("");
  const reports = JSON.parse(localStorage.getItem("volunt-reports") || "[]");
  if (history)
    return (
      <main className="report-page">
        <Header />
        <div className="report-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Voltar
          </button>
          <div className="report-heading">
            <Flag />
            <div>
              <span>TRANSPARÊNCIA</span>
              <h1>Minhas denúncias</h1>
              <p>
                Registros enviados neste navegador durante a demonstração do
                MVP.
              </p>
            </div>
          </div>
          <section className="report-history">
            {reports.length ? (
              reports.map((item) => (
                <article key={item.protocol}>
                  <div>
                    <strong>{item.protocol}</strong>
                    <span>Em análise</span>
                  </div>
                  <h3>{item.serviceTitle}</h3>
                  <p>
                    {item.reason} ·{" "}
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </article>
              ))
            ) : (
              <div className="report-empty">
                <ShieldCheck />
                <h2>Nenhuma denúncia registrada</h2>
                <p>Quando você enviar uma denúncia, ela aparecerá aqui.</p>
                <Link to="/explorar">Explorar serviços</Link>
              </div>
            )}
          </section>
        </div>
        <Footer />
      </main>
    );
  if (!service)
    return (
      <main className="report-page">
        <Header />
        <div className="report-empty standalone">
          <AlertTriangle />
          <h1>Serviço não encontrado</h1>
          <Link to="/explorar">Voltar ao catálogo</Link>
        </div>
        <Footer />
      </main>
    );
  const submit = (e) => {
    e.preventDefault();
    const code = `VOL-${Date.now().toString().slice(-8)}`;
    const entry = {
      protocol: code,
      serviceId: service.id,
      serviceTitle: service.title,
      reason,
      description,
      contact,
      createdAt: new Date().toISOString(),
      status: "Em análise",
    };
    localStorage.setItem("volunt-reports", JSON.stringify([entry, ...reports]));
    setProtocol(code);
    setSent(true);
  };
  if (sent)
    return (
      <main className="report-page">
        <Header />
        <section className="report-success-page">
          <span>
            <CheckCircle2 />
          </span>
          <h1>Denúncia recebida</h1>
          <p>
            Obrigado por ajudar a manter o Voluntá+ seguro. Nossa equipe
            analisará as informações.
          </p>
          <div>
            <small>Protocolo</small>
            <strong>{protocol}</strong>
          </div>
          <Link className="report-primary" to="/denuncias">
            Acompanhar denúncias
          </Link>
          <Link to={`/detalhes-servico/${service.id}`}>Voltar ao serviço</Link>
        </section>
        <Footer />
      </main>
    );
  return (
    <main className="report-page">
      <Header />
      <div className="report-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Voltar
        </button>
        <div className="report-heading">
          <Flag />
          <div>
            <span>SEGURANÇA DA COMUNIDADE</span>
            <h1>Denunciar publicação</h1>
            <p>Informe o problema para que o conteúdo possa ser analisado.</p>
          </div>
        </div>
        <div className="report-layout">
          <form className="report-form" onSubmit={submit}>
            <div className="reported-service">
              <img src={service.image} alt="" />
              <div>
                <small>Você está denunciando</small>
                <strong>{service.title}</strong>
                <span>{service.provider}</span>
              </div>
            </div>
            <label>
              Qual é o motivo? <strong>*</strong>
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Selecione uma opção</option>
                {reasons.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Descreva o que aconteceu <strong>*</strong>
              <textarea
                required
                minLength={20}
                maxLength={1000}
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Forneça detalhes que ajudem na análise..."
              />
              <small>{description.length}/1000 caracteres</small>
            </label>
            <label>
              E-mail para retorno <span>(opcional)</span>
              <input
                type="email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="seuemail@exemplo.com"
              />
            </label>
            <label className="report-confirm">
              <input required type="checkbox" />
              <span>
                Confirmo que as informações fornecidas são verdadeiras de acordo
                com o meu conhecimento.
              </span>
            </label>
            <div className="report-actions">
              <button type="button" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button className="report-primary" type="submit">
                <Flag size={17} />
                Enviar denúncia
              </button>
            </div>
          </form>
          <aside className="report-guidance">
            <ShieldCheck />
            <h2>Sua denúncia é confidencial</h2>
            <p>
              O responsável pela publicação não terá acesso aos seus dados de
              contato.
            </p>
            <hr />
            <h3>O que acontece depois?</h3>
            <ol>
              <li>
                <b>1</b>Registramos sua denúncia.
              </li>
              <li>
                <b>2</b>A equipe revisa o conteúdo.
              </li>
              <li>
                <b>3</b>Medidas são tomadas quando necessário.
              </li>
            </ol>
            <div>
              <Info />
              <p>
                Em caso de risco imediato ou crime, procure as autoridades
                competentes.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
