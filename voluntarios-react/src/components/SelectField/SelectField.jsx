import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 220,
      },
    },
  },
};

export default function MultipleSelect({ label, options }) {
  const [value, setValue] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl size="small" sx={{ width: 240 }}>
      <InputLabel id="demo-multiple-name-label">{label}</InputLabel>

      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        sx={{
          height: 40,
          fontSize: 14,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
