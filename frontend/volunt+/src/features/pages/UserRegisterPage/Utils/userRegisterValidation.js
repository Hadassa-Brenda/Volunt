function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    case "gender":
      if (!textValue) {
        return "Selecione o gênero.";
      }

      return "";

    case "tipoUsuario":
      if (!textValue) {
        return "Selecione o tipo de usuário.";
      }

      return "";

    case "perfilUsuario":
      if (!textValue) {
        return "Selecione o tipo de perfil.";
      }

      return "";

    case "dataNascimento":
      if (
        form.tipoUsuario?.toString().toUpperCase() !== "PJ" &&
        !textValue
      ) {
        return "Informe sua data de nascimento.";
      }

      return "";

    case "password":
      if (textValue.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
      }

      if (
        !/[A-Za-z]/.test(textValue) ||
        !/[0-9]/.test(textValue)
      ) {
        return "A senha deve ter letras e números.";
      }

      return "";

    case "confirmPassword":
      if (textValue !== form.password) {
        return "As senhas não conferem.";
      }

      return "";

    default:
      return "";
  }
}

export function validateForm(form) {
  const errors = {};

  Object.keys(form).forEach((field) => {
    const error = validateField(
      field,
      form[field],
      form
    );

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}