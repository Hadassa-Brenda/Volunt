import "./Stepper.css";
import { useStepper } from "./hook/useStepper";
import { Check } from "lucide-react";

export function Stepper({ currentStep, steps }) {
  const { progress } = useStepper(currentStep, steps);
  return (
    <section className="service-stepper">
      <div className="service-stepper-line">
        <div
          className="service-stepper-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="service-stepper-items">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={`service-stepper-item ${
                isActive ? "service-stepper-item--active" : ""
              } ${isCompleted ? "service-stepper-item--completed" : ""}`}
            >
              <div className="service-stepper-number">
                {isCompleted ? <Check size={17} /> : step.id}
              </div>

              <div>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
