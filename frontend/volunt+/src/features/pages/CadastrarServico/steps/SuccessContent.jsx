import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SuccessContent({ onCreateAnother }) {
  return (
    <section className="service-success">
      <div className="service-success-icon">
        <CheckCircle2 size={52} />
      </div>

      <span>Cadastro concluído</span>
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
      </div>
    </section>
  );
}
