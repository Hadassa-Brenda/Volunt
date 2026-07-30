import { ChevronDown } from "lucide-react";

export function FilterSelect({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
}) {
  return (
    <label className="filter-field">
      <span>{label}</span>

      <div className="filter-select-wrapper">
        <select name={name} value={value} onChange={onChange}>
          <option value="">{defaultOption}</option>

          {options.map((option) => {
            const optionValue =
              typeof option === "string" ? option : option.value;

            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <ChevronDown size={16} />
      </div>
    </label>
  );
}
