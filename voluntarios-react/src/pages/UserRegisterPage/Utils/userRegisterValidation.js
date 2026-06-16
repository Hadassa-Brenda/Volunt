function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getOnlyNumbers(value) {
  return String(value || "").replace(/\D/g, "");
}

export function validateField(field, value, form) {
  const textValue = String(value || "").trim();

  switch (field) {
    case "fullName":
      if (textValue.length < 3) {
        return "Informe seu nome completo.";
      }

      return "";

    case "email":
      if (!isValidEmail(textValue)) {
        return "Informe um e-mail válido.";
      }

      return "";

    case "whatsapp": {
      const numbers = getOnlyNumbers(textValue);

      if (!numbers) {
        return "Informe um WhatsApp para contato.";
      }

      if (numbers.length < 10 || numbers.length > 13) {
        return "Informe um WhatsApp válido com DDD.";
      }

      return "";
    }

    case "profileType":
      if (!textValue) {
        return "Selecione o tipo de perfil.";
      }

      return "";

    case "city":
      if (textValue.length < 2) {
        return "Informe sua cidade.";
      }

      return "";

    case "neighborhood":
      if (textValue.length < 2) {
        return "Informe seu bairro.";
      }

      return "";

    case "password":
      if (textValue.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
      }

      if (!/[A-Za-z]/.test(textValue) || !/[0-9]/.test(textValue)) {
        return "A senha deve ter letras e números.";
      }

      return "";

    case "confirmPassword":
      if (textValue !== form.password) {
        return "As senhas não conferem.";
      }

      return "";

    case "acceptTerms":
      if (!value) {
        return "Você precisa aceitar os termos para continuar.";
      }

      return "";

    default:
      return "";
  }
}

export function validateForm(form) {
  const errors = {};

  Object.keys(form).forEach((field) => {
    const error = validateField(field, form[field], form);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}
