import * as React from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "./SingleSelect.css";

export default function SingleSelect({
  id,
  label,
  value,
  onChange,
  options = [],
  width = "400px",
  height = "50px",
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  showEmptyOption = true,
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
        size="medium"
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
          onChange={handleChange}
          className="select-generic__select"
          sx={{ width: width, height: height }}
        >
          {showEmptyOption && (
            <MenuItem className="select-generic__menu-item" value="">
              {placeholder}
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
