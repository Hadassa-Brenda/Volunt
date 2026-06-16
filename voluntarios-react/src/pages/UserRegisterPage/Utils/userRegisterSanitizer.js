export function sanitizeUserForm(form) {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    whatsapp: form.whatsapp.trim(),
    profileType: form.profileType,
    city: form.city.trim(),
    neighborhood: form.neighborhood.trim(),
  };
}
