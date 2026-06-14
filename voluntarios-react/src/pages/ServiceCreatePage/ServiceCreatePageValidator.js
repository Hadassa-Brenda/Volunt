const MIN_LENGTH = {
  title: 5,
  city: 2,
  neighborhood: 2,
  description: 20,
};

const CONTACT_FIELDS = ["whatsapp", "instagram", "website"];

function getOnlyNumbers(value) {
  return value.replace(/\D/g, "");
}

function isValidUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidInstagram(value) {
  if (!value) return true;

  return /^@?[a-zA-Z0-9._]{2,30}$/.test(value);
}

function isValidWhatsapp(value) {
  if (!value) return true;

  const numbers = getOnlyNumbers(value);

  return numbers.length >= 10 && numbers.length <= 11;
}

export function validateServiceField(field, value) {
  const trimmedValue = value.trim();

  switch (field) {
    case "title":
      if (trimmedValue.length < MIN_LENGTH.title) {
        return `O nome deve ter pelo menos ${MIN_LENGTH.title} caracteres.`;
      }
      return "";

    case "category":
      if (!trimmedValue) {
        return "Selecione uma categoria.";
      }
      return "";

    case "modality":
      if (!trimmedValue) {
        return "Selecione o tipo de atendimento.";
      }
      return "";

    case "city":
      if (trimmedValue.length < MIN_LENGTH.city) {
        return "Informe uma cidade válida.";
      }
      return "";

    case "neighborhood":
      if (trimmedValue.length < MIN_LENGTH.neighborhood) {
        return "Informe um bairro válido.";
      }
      return "";

    case "description":
      if (trimmedValue.length < MIN_LENGTH.description) {
        return `A descrição deve ter pelo menos ${MIN_LENGTH.description} caracteres.`;
      }
      return "";

    case "whatsapp":
      if (!isValidWhatsapp(trimmedValue)) {
        return "Informe um WhatsApp válido com DDD. Ex: (31) 99999-9999.";
      }
      return "";

    case "instagram":
      if (!isValidInstagram(trimmedValue)) {
        return "Informe um Instagram válido. Ex: @projeto.social";
      }
      return "";

    case "website":
      if (!isValidUrl(trimmedValue)) {
        return "Informe um link válido. Ex: https://meusite.com";
      }
      return "";

    default:
      return "";
  }
}

export function validateContactRequired(form) {
  const hasAnyContact = CONTACT_FIELDS.some((field) => form[field].trim());

  if (!hasAnyContact) {
    return "Informe pelo menos um contato: WhatsApp, Instagram ou site.";
  }

  return "";
}

export function validateServiceForm(form) {
  const errors = {};

  Object.keys(form).forEach((field) => {
    const error = validateServiceField(field, form[field]);

    if (error) {
      errors[field] = error;
    }
  });

  const contactError = validateContactRequired(form);

  if (contactError) {
    errors.contact = contactError;
  }

  return errors;
}

export function sanitizeServiceForm(form) {
  return {
    title: form.title.trim(),
    category: form.category.trim(),
    modality: form.modality.trim(),
    city: form.city.trim(),
    neighborhood: form.neighborhood.trim(),
    description: form.description.trim(),
    whatsapp: form.whatsapp.trim(),
    instagram: form.instagram.trim(),
    website: form.website.trim(),
  };
}