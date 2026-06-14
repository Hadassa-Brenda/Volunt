import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectGeneric from "../SelectGeneric/SelectGeneric";
import { POPULAR_CATEGORIES } from "../../constants/categories";

export default function CategoryList() {
  const [category, setCategory] = React.useState("");

  function handleChange(event) {
    setCategory(event.target.value);
  }

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Categoria</InputLabel>

        <SelectGeneric
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value="">Todas as categorias</MenuItem>

          {POPULAR_CATEGORIES.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.name}
            </MenuItem>
          ))}
        </SelectGeneric>
      </FormControl>
    </Box>
  );
}
