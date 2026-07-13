
export function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
  fullWidth = false,
  disabled = false,
}) {
  return (
    <label
      className={`form-field ${
        fullWidth ? "form-field--full" : ""
      }`}
    >
      <span>
        {label} {required && <strong>*</strong>}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
        disabled={disabled}
      />

      {error && (
        <small className="field-error">{error}</small>
      )}
    </label>
  );
}