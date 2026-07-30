import React from "react";
import "../ModalityOption/ModalityOption.css";
import { Check } from "lucide-react";

export function ModalityOption({
  name,
  value,
  checked,
  onChange,
  icon,
  title,
  description,
}) {
  return (
    <label
      className={`modality-option ${
        checked ? "modality-option--selected" : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <div className="modality-option-icon">{icon}</div>

      <strong>{title}</strong>
      <span>{description}</span>

      <div className="modality-option-check">
        {checked && <Check size={14} />}
      </div>
    </label>
  );
}
