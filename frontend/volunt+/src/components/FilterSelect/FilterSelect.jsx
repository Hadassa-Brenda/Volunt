import React from "react";

export function FilterSelect({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options = [],
}) {
  return (
    <div className="filter-select">
      <label htmlFor={name}>{label}</label>

      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">{defaultOption}</option>

        {options.map((option) => {
          const isObject = typeof option === "object";

          const optionValue = isObject ? option.value : option;

          const optionLabel = isObject ? option.label : option;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}
