export function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function buildOptions(items = [], labelKeys = ["label", "nome"]) {
  return items.map((item) => {
    if (typeof item !== "object" || item === null) {
      return { label: String(item), value: String(item) };
    }

    const label = labelKeys.map((key) => item[key]).find(Boolean);
    const value = item.value ?? item.id ?? label;

    return { label: String(label ?? value), value: String(value ?? "") };
  });
}
