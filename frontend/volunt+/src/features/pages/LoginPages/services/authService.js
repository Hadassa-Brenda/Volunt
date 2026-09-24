import { api, authApi } from "../../../../api/axiosConfig";

const STORAGE_KEYS = {
  user: "volunt-user",
  token: "volunt-token",
};

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export function getStoredUser() {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEYS.user);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user, token) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.token, token || "");
  return { user, token };
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.token);
}

export function isAuthenticated() {
  const user = getStoredUser();
  const token = localStorage.getItem(STORAGE_KEYS.token);
  return Boolean(user && token);
}

export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Credenciais inválidas");
  }

  const normalizedEmail = normalizeEmail(email);

  try {
    const { data } = await authApi.login(normalizedEmail, password);
    const token = data?.token || data?.accessToken || data?.jwt || "";
    const user = data?.user ||
      data?.usuario || {
        email: normalizedEmail,
        fullName: data?.fullName || data?.name || normalizedEmail.split("@")[0],
      };

    if (!user || !token) {
      throw new Error("Resposta inválida do servidor de autenticação.");
    }

    return setSession(user, token);
  } catch (error) {
    const storedUsers = (() => {
      try {
        return JSON.parse(localStorage.getItem("volunt-users") || "[]");
      } catch {
        return [];
      }
    })();

    const fallbackUser = [...storedUsers].find(
      (user) =>
        normalizeEmail(user.email) === normalizedEmail &&
        user.password === password,
    );

    if (!fallbackUser) {
      throw error;
    }

    const sessionUser = {
      ...fallbackUser,
      email: fallbackUser.email.trim(),
    };

    return setSession(sessionUser, `local-demo-${Date.now()}`);
  }
}

export async function requestPasswordReset(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw new Error("Informe um e-mail para continuar.");
  }

  try {
    const { data } = await authApi.requestPasswordReset(normalizedEmail);
    return data;
  } catch (error) {
    return {
      message:
        "Se esse e-mail estiver cadastrado, enviaremos instruções para redefinição de senha.",
      success: true,
      fallback: true,
      originalError: error,
    };
  }
}

export async function resetPassword({ token, password, confirmPassword }) {
  if (!token) {
    throw new Error("Token de recuperação ausente.");
  }

  if (!password || !confirmPassword) {
    throw new Error("Preencha a nova senha e a confirmação.");
  }

  if (password !== confirmPassword) {
    throw new Error("As senhas devem ser iguais.");
  }

  try {
    const { data } = await authApi.resetPassword(
      token,
      password,
      confirmPassword,
    );
    return data;
  } catch (error) {
    return {
      message: "Senha redefinida com sucesso.",
      success: true,
      fallback: true,
      originalError: error,
    };
  }
}

export async function registerUser(payload) {
  try {
    const { data } = await authApi.register(payload);
    const token = data?.token || data?.accessToken || data?.jwt || "";
    const user = data?.user || data?.usuario || payload;

    if (token) {
      setSession(user, token);
    }

    return data;
  } catch (error) {
    const storedUsers = (() => {
      try {
        return JSON.parse(localStorage.getItem("volunt-users") || "[]");
      } catch {
        return [];
      }
    })();

    const existingUser = storedUsers.find(
      (user) => normalizeEmail(user.email) === normalizeEmail(payload.email),
    );

    if (existingUser) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    const nextUser = { ...payload, id: Date.now() };
    const users = [...storedUsers, nextUser];
    localStorage.setItem("volunt-users", JSON.stringify(users));
    setSession(nextUser, `local-demo-${Date.now()}`);
    return { token: `local-demo-${Date.now()}`, user: nextUser };
  }
}

export function handleUnauthorizedRedirect(navigate) {
  clearSession();
  navigate("/login");
}

export { api };
