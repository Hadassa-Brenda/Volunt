import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { POPULAR_CATEGORIES } from "../../constants/categories";
import { colors } from "../../styles/colors";

export default function CategoryList() {
  const [category, setCategory] = React.useState("");

  function handleChange(event) {
    setCategory(event.target.value);
  }

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel
          id="category-select-label"
          sx={{
            color: colors.colorTextDark,
            fontSize: "14px",
            fontWeight: 600,

            "&.Mui-focused": {
              color: colors.colorBlueFocus,
            },
          }}
        >
          Categoria
        </InputLabel>

        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Categoria"
          onChange={handleChange}
          sx={{
            borderRadius: "10px",
            backgroundColor: colors.colorWhite,
            color: colors.colorText,
            fontSize: "14px",

            "& .MuiSelect-select": {
              padding: "12px 14px",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.colorBorder,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.colorGray,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.colorBlueFocus,
              borderWidth: "1px",
              boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.15)",
            },
          }}
        >
          <MenuItem value="">Todas as categorias</MenuItem>

          {POPULAR_CATEGORIES.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
