const wait = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 350));

export async function login(email, password) {
  if (!email || !password) throw new Error("Credenciais inválidas");
  const user = { email, name: email.split("@")[0] };
  localStorage.setItem("volunt-user", JSON.stringify(user));
  return wait({ token: `mvp-${Date.now()}`, user });
}
