import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SingleSelect from "../SingleSelect.tsx/SingleSelect";
import { CATEGORIAS } from "../../types/enum/Categories";

export default function CategoryList() {
  const [category, setCategory] = React.useState("");

  function handleChange(event) {
    setCategory(event.target.value);
  }

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Categoria</InputLabel>

        <SingleSelect
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value="">Todas as categorias</MenuItem>

          {CATEGORIAS.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.name}
            </MenuItem>
          ))}
        </SingleSelect>
      </FormControl>
    </Box>
  );
}
