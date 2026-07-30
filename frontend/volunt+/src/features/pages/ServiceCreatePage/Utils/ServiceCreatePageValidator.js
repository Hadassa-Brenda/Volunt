const MIN_LENGTH = {
  title: 5,
  city: 2,
  neighborhood: 2,
  description: 20,
};

function getSafeString(value) {
  return String(value || "");
}

function getOnlyNumbers(value) {
  return getSafeString(value).replace(/\D/g, "");
}

function hasRepeatedNumbersOnly(numbers) {
  return /^(\d)\1+$/.test(numbers);
}

function isValidUrl(value) {
  const safeValue = getSafeString(value).trim();

  if (!safeValue) return true;

  try {
    const urlWithProtocol =
      safeValue.startsWith("http://") || safeValue.startsWith("https://")
        ? safeValue
        : `https://${safeValue}`;

    const url = new URL(urlWithProtocol);

    return Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
}

function isValidInstagram(value) {
  const safeValue = getSafeString(value).trim();

  if (!safeValue) return true;

  return /^@?[a-zA-Z0-9._]{2,30}$/.test(safeValue);
}

function isValidWhatsapp(value) {
  const numbers = getOnlyNumbers(value);

  if (!numbers) return true;

  const numbersWithoutCountryCode = numbers.startsWith("55")
    ? numbers.slice(2)
    : numbers;

  const hasValidLength =
    numbersWithoutCountryCode.length === 10 ||
    numbersWithoutCountryCode.length === 11;

  if (!hasValidLength) {
    return false;
  }

  const ddd = numbersWithoutCountryCode.slice(0, 2);
  const phoneNumber = numbersWithoutCountryCode.slice(2);

  if (ddd.length !== 2) {
    return false;
  }

  if (Number(ddd) < 11 || Number(ddd) > 99) {
    return false;
  }

  if (hasRepeatedNumbersOnly(phoneNumber)) {
    return false;
  }

  return true;
}

export function validateServiceField(field, value) {
  const trimmedValue = getSafeString(value).trim();

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
        return "Informe um WhatsApp válido com DDD. Ex: +55 (31) 98988-8283.";
      }
      return "";

    case "instagram":
      if (!isValidInstagram(trimmedValue)) {
        return "Informe um Instagram válido. Ex: @projeto.social";
      }
      return "";

    case "website":
      if (!isValidUrl(trimmedValue)) {
        return "Informe um link válido. Ex: meusite.com ou https://meusite.com";
      }
      return "";

    default:
      return "";
  }
}

export function validateContactRequired(form) {
  const hasAnyContact = CONTACT_FIELDS.some((field) =>
    getSafeString(form[field]).trim(),
  );

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
    title: getSafeString(form.title).trim(),
    category: getSafeString(form.category).trim(),
    modality: getSafeString(form.modality).trim(),
    city: getSafeString(form.city).trim(),
    neighborhood: getSafeString(form.neighborhood).trim(),
    description: getSafeString(form.description).trim(),
    whatsapp: getSafeString(form.whatsapp).trim(),
    instagram: getSafeString(form.instagram).trim(),
    website: getSafeString(form.website).trim(),
  };
}
