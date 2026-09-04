import { CATEGORIAS } from "../enum/Categories";

export const CategoriaDTO = CATEGORIAS.map((categoria) => ({
  id: categoria.value,
  nome: categoria.label,
}));
