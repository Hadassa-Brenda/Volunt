import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

import "./MultiSelect.css";

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

export default function MultiSelect({
  id,
  name,
  label = "Selecione",
  options = [],
  value = [],
  onChange,
  placeholder = "",
  helperText = "",
  width = "400px",
  height = "50px",
  error = false,
  disabled = false,
}) {
  const generatedId = React.useId();

  const selectId = id || `multiple-select-${generatedId}`;

  const labelId = `${selectId}-label`;

  /*
   * Garante que o valor sempre seja um array.
   */
  const selectedValues = Array.isArray(value) ? value : [];

  /*
   * Pega somente os valores das opções.
   *
   * Exemplo:
   *
   * [
   *   { value: 1, label: "Masculino" },
   *   { value: 2, label: "Feminino" }
   * ]
   *
   * vira:
   *
   * [1, 2]
   */
  const optionValues = React.useMemo(
    () => options.map((option) => option.value),
    [options],
  );

  /*
   * Verifica se todas as opções
   * estão selecionadas.
   */
  const allSelected =
    optionValues.length > 0 &&
    optionValues.every((optionValue) => selectedValues.includes(optionValue));

  /*
   * Verifica se algumas opções
   * estão selecionadas.
   */
  const hasSomeSelected = selectedValues.length > 0 && !allSelected;

  /*
   * Atualiza o valor selecionado.
   */
  function updateSelectedValues(nextValue) {
    if (onChange) {
      onChange({
        target: {
          name,
          value: nextValue,
        },
      });

      return;
    }
  }

  /*
   * Quando o usuário seleciona uma opção.
   */
  function handleChange(event) {
    const nextValue = event.target.value;

    /*
     * O Material UI pode retornar string
     * em alguns cenários.
     *
     * Transformamos em array.
     */
    const normalizedValue =
      typeof nextValue === "string" ? nextValue.split(",") : nextValue;

    /*
     * Verifica se clicou em "Todas".
     */
    if (normalizedValue.includes(SELECT_ALL_VALUE)) {
      /*
       * Se todas já estão selecionadas,
       * remove todas.
       */
      if (allSelected) {
        updateSelectedValues([]);
      } else {
        /*
         * Caso contrário, seleciona
         * todas as opções.
         */
        updateSelectedValues(optionValues);
      }

      return;
    }

    /*
     * Atualiza normalmente.
     */
    updateSelectedValues(normalizedValue);
  }

  /*
   * Texto que aparece dentro do select
   * depois que o usuário seleciona.
   */
  function renderSelectedValue(selected) {
    /*
     * Nenhuma opção selecionada.
     */
    if (selected.length === 0) {
      return (
        <span className="multiple-select__placeholder">{placeholder}</span>
      );
    }

    /*
     * Todas selecionadas.
     */
    if (allSelected) {
      return "Todas";
    }

    /*
     * Mais de duas selecionadas.
     */
    if (selected.length > 2) {
      return `${selected.length} selecionadas`;
    }

    /*
     * Mostra o label das opções.
     */
    return selected
      .map((selectedValue) => {
        const option = options.find((option) => option.value === selectedValue);

        return option?.label ?? selectedValue;
      })
      .join(", ");
  }

  return (
    <FormControl
      className="multiple-select"
      size="small"
      style={{
        width,
        height,
      }}
      error={error}
      disabled={disabled}
    >
      {/* LABEL */}
      <InputLabel id={labelId} className="multiple-select__label">
        {label}
      </InputLabel>

      {/* SELECT */}
      <Select
        labelId={labelId}
        id={selectId}
        name={name}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={renderSelectedValue}
        displayEmpty
        MenuProps={MenuProps}
        className="multiple-select__field"
      >
        {/* TODAS */}
        <MenuItem value={SELECT_ALL_VALUE} className="multiple-select__item">
          <Checkbox
            checked={allSelected}
            indeterminate={hasSomeSelected}
            className="multiple-select__checkbox"
          />

          <ListItemText primary="Todas" />
        </MenuItem>

        {/* OPÇÕES */}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            className="multiple-select__item"
          >
            <Checkbox
              checked={selectedValues.includes(option.value)}
              className="multiple-select__checkbox"
            />

            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>

      {/* MENSAGEM DE ERRO/AJUDA */}
      {helperText && (
        <FormHelperText className="multiple-select__helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
