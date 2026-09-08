const wait = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 350));

export async function register(
  name,
  email,
  gender,
  tipoUsuario,
  perfilUsuario,
  dataNascimento,
  password,
  confirmPassword,
) {
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  if (password !== confirmPassword) {
    throw new Error("As senhas não coincidem.");
  }

  const user = {
    id: Date.now(),
    name,
    email,
    gender,
    tipoUsuario,
    perfilUsuario,
    dataNascimento,
  };

  localStorage.setItem("volunt-user", JSON.stringify(user));

  return wait({
    token: `mvp-${Date.now()}`,
    user,
  });
}
