import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function SuccessContent({ onCreateAnother }) {
  const navigate = useNavigate();

  return (
    <section className="service-success">
      <div className="service-success-icon">
        <CheckCircle2 size={52} />
      </div>

      <span>Cadastro concluído</span>
      <p className="service-success-message">
        Seu serviço foi publicado com sucesso.
      </p>
      <div className="service-success-actions">
        <button
          type="button"
          className="secondary-action-button"
          onClick={onCreateAnother}
        >
          Cadastrar outro serviço
        </button>

        <Link to="/meus-servicos" className="primary-action-button">
          Ver meus serviços
          <ArrowRight size={18} />
        </Link>

        <button
          type="button"
          className="secondary-action-button"
          onClick={() => navigate("/")}
        >
          Voltar para o início
        </button>
      </div>
    </section>
  );
}
