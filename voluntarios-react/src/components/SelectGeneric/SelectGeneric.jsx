import * as React from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "./SelectGeneric.css";

export default function SelectGeneric({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione uma opção",
  fullWidth = true,
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  showEmptyOption = true,
  emptyOptionLabel = "Todos",
  name,
  className = "",
}) {
  const generatedId = React.useId();

  const selectId = id || `select-${generatedId}`;
  const labelId = `${selectId}-label`;

  const selectClassName = [
    "select-generic",
    error ? "select-generic--error" : "",
    disabled ? "select-generic--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function handleChange(event) {
    onChange(event.target.value, event);
  }

  function getOptionValue(option) {
    if (typeof option === "string") {
      return option;
    }

    return option.value;
  }

  function getOptionLabel(option) {
    if (typeof option === "string") {
      return option;
    }

    return option.label || option.name;
  }

  return (
    <div className={selectClassName}>
      <FormControl
        className="select-generic__form-control"
        fullWidth={fullWidth}
        error={Boolean(error)}
        disabled={disabled}
        required={required}
      >
        <InputLabel id={labelId} className="select-generic__label">
          {label}
        </InputLabel>

        <Select
          id={selectId}
          name={name}
          labelId={labelId}
          value={value}
          label={label}
          onChange={handleChange}
          className="select-generic__select"
        >
          {showEmptyOption && (
            <MenuItem className="select-generic__menu-item" value="">
              {value === "" ? placeholder : emptyOptionLabel}
            </MenuItem>
          )}

          {options.map((option) => {
            const optionValue = getOptionValue(option);
            const optionLabel = getOptionLabel(option);

            return (
              <MenuItem
                className="select-generic__menu-item"
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </MenuItem>
            );
          })}
        </Select>

        {helperText && (
          <FormHelperText className="select-generic__helper-text">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
