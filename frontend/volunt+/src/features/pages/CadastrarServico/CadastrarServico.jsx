import React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { steps } from "./types/CadastrarServicoConst";
import "./CadastrarServico.css";
import { Stepper } from "./components/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useCadastrarServico } from "./hook/useCadastrarServico";
import { SuccessContent } from "./steps/SuccessContent";
import { FormStepContent } from "./components/FormStepContent/FormStepContent";
import "../../../styles/global.css"
import Button from "../../../components/Button/Button"

export default function CadastrarServico() {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    errors,
    submitted,
    setCurrentStep,
    handleChange,
    nextStep,
    previousStep,
    handleImageChange,
    removeImage,
    handleSubmit,
    resetForm,
  } = useCadastrarServico();
  
  return (
    <main className="create-service-page">
      <Header />
      <div style={{padding: "10px"}}>
      <Button
        className="back-button"
        onClick={() => navigate("/")}
        icon={<ArrowLeft size={18} />}
        children={"Voltar"}
      />
      </div>
      <section className="create-service-container">
        {submitted ? (
          <SuccessContent
            serviceTitle={formData.title}
            onCreateAnother={resetForm}
          />
        ) : (
          <>
            <header className="create-service-heading">
              <span>Cadastro de serviço</span>

              <h1>Cadastre um serviço voluntário</h1>

              <p>
                Compartilhe uma iniciativa gratuita e ajude mais pessoas a
                encontrá-la.
              </p>
            </header>

            <Stepper currentStep={currentStep} steps={steps} />

            <form className="create-service-form" onSubmit={handleSubmit}>
              <div className="create-service-card">
                <FormStepContent
                  currentStep={currentStep}
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onImageChange={handleImageChange}
                  onRemoveImage={removeImage}
                  onEditStep={setCurrentStep}
                />
              </div>

              <div className="create-service-actions">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="secondary-action-button"
                    onClick={previousStep}
                  >
                    <ArrowLeft size={18} />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    className="primary-action-button"
                    onClick={nextStep}
                  >
                    Próximo
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button type="submit" className="primary-action-button">
                    <Check size={18} />
                    Enviar para análise
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
