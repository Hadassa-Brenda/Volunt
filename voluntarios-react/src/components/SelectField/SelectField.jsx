import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

import "./SelectField.css";

const SELECT_ALL_VALUE = "__all__";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  slotProps: {
    paper: {
      className: "multiple-select__paper",
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      },
    },
  },
};

export default function SelectField({
  id,
  label = "Selecione",
  options = [],
  value,
  onChange,
  placeholder = "",
  helperText = "",
  error = false,
  disabled = false,
  fullWidth = false,
  width = "200px",
}) {
  const generatedId = React.useId();

  const selectId = id || `multiple-select-${generatedId}`;
  const labelId = `${selectId}-label`;

  const isControlled = Array.isArray(value);
  const [internalValue, setInternalValue] = React.useState([]);

  const selectedValues = isControlled ? value : internalValue;

  const allSelected =
    options.length > 0 && selectedValues.length === options.length;

  const hasSomeSelected =
    selectedValues.length > 0 && selectedValues.length < options.length;

  function updateSelectedValues(nextValue) {
    if (onChange) {
      onChange(nextValue);
      return;
    }

    setInternalValue(nextValue);
  }

  function handleChange(event) {
    const nextValue = event.target.value;

    const normalizedValue =
      typeof nextValue === "string" ? nextValue.split(",") : nextValue;

    if (normalizedValue.includes(SELECT_ALL_VALUE)) {
      updateSelectedValues(allSelected ? [] : options);
      return;
    }

    updateSelectedValues(normalizedValue);
  }

  function renderSelectedValue(selected) {
    if (selected.length === 0) {
      return (
        <span className="multiple-select__placeholder">{placeholder}</span>
      );
    }

    if (selected.length === options.length) {
      return "Todas";
    }

    if (selected.length > 2) {
      return `${selected.length} selecionadas`;
    }

    return selected.join(", ");
  }

  return (
    <FormControl
      className="multiple-select"
      size="small"
      style={{ width }}
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
    >
      <InputLabel id={labelId} className="multiple-select__label">
        {label}
      </InputLabel>

      <Select
        labelId={labelId}
        id={selectId}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={renderSelectedValue}
        displayEmpty
        MenuProps={MenuProps}
        className="multiple-select__field"
      >
        <MenuItem value={SELECT_ALL_VALUE} className="multiple-select__item">
          <Checkbox
            checked={allSelected}
            indeterminate={hasSomeSelected}
            className="multiple-select__checkbox"
          />
          <ListItemText primary="Todas" />
        </MenuItem>

        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            className="multiple-select__item"
          >
            <Checkbox
              checked={selectedValues.includes(option)}
              className="multiple-select__checkbox"
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText className="multiple-select__helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
