export function normalizeCategory(category) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function checkPublicationDate(date, selectedPeriod) {
  if (!selectedPeriod) {
    return true;
  }

  const serviceDate = new Date(`${date}T00:00:00`);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate - serviceDate;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays <= Number(selectedPeriod);
}
