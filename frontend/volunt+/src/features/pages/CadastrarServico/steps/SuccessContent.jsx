import { CheckCircle2, ArrowRight } from "lucide-react";

export function SuccessContent({ serviceTitle, onCreateAnother }) {
  return (
    <section className="service-success">
      <div className="service-success-icon">
        <CheckCircle2 size={52} />
      </div>

      <span>Cadastro concluído</span>

      <h1>Serviço enviado para análise!</h1>

      <p>
        O serviço <strong>{serviceTitle}</strong> foi cadastrado e agora será
        revisado pela equipe da plataforma.
      </p>

      <div className="service-success-status">
        <span>Status atual</span>
        <strong>Pendente de aprovação</strong>
      </div>

      <div className="service-success-actions">
        <button
          type="button"
          className="secondary-action-button"
          onClick={onCreateAnother}
        >
          Cadastrar outro serviço
        </button>

        <a href="/explorar" className="primary-action-button">
          Ver meus serviços
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
