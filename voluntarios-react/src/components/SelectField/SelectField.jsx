import './SelectField.css';

export default function SelectField({ icon: Icon, label, value, options, onChange }) {
  return (
    <label className="select-field">
      {Icon && <Icon className="select-field__icon" size={20} />}
      <span className="select-field__content">
        <small>{label}</small>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
