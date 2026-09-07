const wait = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 350));

export async function register(
  bairro,
  city,
  email,
  profileType,
  confirmPassword,
  password,
  whatsapp,
  fullName,
  state,
  acceptTerms,
) {
  if (!email || !password || password !== confirmPassword || !acceptTerms) {
    throw new Error("Dados de cadastro inválidos");
  }
  const user = {
    bairro,

    city,
    email,
    profileType,
    whatsapp,
    fullName,
    state,
  };
  localStorage.setItem("volunt-user", JSON.stringify(user));
  return wait({ token: `mvp-${Date.now()}`, user });
}
