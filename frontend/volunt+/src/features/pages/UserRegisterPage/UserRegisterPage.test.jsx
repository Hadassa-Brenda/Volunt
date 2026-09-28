import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import UserRegisterPage from "./UserRegisterPage";

const mockUseAuth = jest.fn();
const mockUseSignUp = jest.fn();

jest.mock("@clerk/react", () => ({
  useAuth: () => mockUseAuth(),
  useSignUp: () => mockUseSignUp(),
}));

jest.mock("components/TextField/TextField", () =>
  function MockTextField({
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    disabled,
    helperText,
  }) {
    return (
      <label>
        {label}
        <input
          aria-label={label}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
        {helperText && <span>{helperText}</span>}
      </label>
    );
  },
);

jest.mock("components/SingleSelect.tsx/SingleSelect", () =>
  function MockSingleSelect({ label, value, onChange, options }) {
    return (
      <label>
        {label}
        <select
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  },
);

jest.mock("components/DataPicker/DataPicker", () =>
  function MockDataPicker({ label, value, onChange }) {
    return (
      <label>
        {label}
        <input
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  },
);

function emptyClerkErrors() {
  return {
    fields: {
      emailAddress: null,
      password: null,
      code: null,
      captcha: null,
    },
    global: null,
    raw: null,
  };
}

function createSignUp() {
  const signUp = {
    status: "missing_requirements",
    unverifiedFields: ["email_address"],
    password: jest.fn().mockResolvedValue({ error: null }),
    finalize: jest.fn().mockImplementation(async ({ navigate }) => {
      navigate({
        session: { currentTask: null },
        decorateUrl: (url) => url,
      });
      return { error: null };
    }),
    reset: jest.fn().mockResolvedValue({ error: null }),
    verifications: {
      sendEmailCode: jest.fn().mockResolvedValue({ error: null }),
      verifyEmailCode: jest.fn().mockImplementation(async () => {
        signUp.status = "complete";
        return { error: null };
      }),
    },
  };

  return signUp;
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={["/cadastro"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/cadastro" element={<UserRegisterPage />} />
        <Route path="/" element={<h1>Home autenticada</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

async function fillIdentity(user) {
  await user.type(screen.getByLabelText("E-mail"), " Pessoa@Example.COM ");
  await user.type(screen.getByLabelText("Senha"), "senha123");
  await user.type(screen.getByLabelText("Confirmar senha"), "senha123");
}

describe("UserRegisterPage", () => {
  let signUp;

  beforeEach(() => {
    signUp = createSignUp();
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: false });
    mockUseSignUp.mockReturnValue({
      signUp,
      errors: emptyClerkErrors(),
      fetchStatus: "idle",
    });
    jest.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("preserva os campos completos, mas envia somente e-mail e senha ao Clerk", async () => {
    const user = userEvent.setup();
    renderPage();

    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de perfil")).toBeInTheDocument();
    expect(document.querySelector("#clerk-captcha")).toBeInTheDocument();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    await waitFor(() => {
      expect(signUp.password).toHaveBeenCalledWith({
        emailAddress: "pessoa@example.com",
        password: "senha123",
      });
    });
    expect(signUp.verifications.sendEmailCode).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(
      await screen.findByRole("heading", { name: /verifique seu e-mail/i }),
    ).toBeInTheDocument();
  });

  it("não chama o Clerk quando a confirmação de senha é inválida", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText("E-mail"), "pessoa@example.com");
    await user.type(screen.getByLabelText("Senha"), "senha123");
    await user.type(screen.getByLabelText("Confirmar senha"), "outra123");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("As senhas não conferem.")).toBeVisible();
    expect(signUp.password).not.toHaveBeenCalled();
  });

  it("verifica o código, finaliza a sessão e navega para a home", async () => {
    const user = userEvent.setup();
    renderPage();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));
    await user.type(
      await screen.findByLabelText("Código de verificação"),
      "123456",
    );
    await user.click(
      screen.getByRole("button", { name: /confirmar código/i }),
    );

    await waitFor(() => {
      expect(signUp.verifications.verifyEmailCode).toHaveBeenCalledWith({
        code: "123456",
      });
      expect(signUp.finalize).toHaveBeenCalledTimes(1);
    });
    expect(
      await screen.findByRole("heading", { name: "Home autenticada" }),
    ).toBeInTheDocument();
  });

  it("finaliza diretamente quando o Clerk não exige verificação", async () => {
    const user = userEvent.setup();
    signUp.password.mockImplementation(async () => {
      signUp.status = "complete";
      signUp.unverifiedFields = [];
      return { error: null };
    });
    renderPage();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(
      await screen.findByRole("heading", { name: "Home autenticada" }),
    ).toBeInTheDocument();
    expect(signUp.finalize).toHaveBeenCalledTimes(1);
    expect(signUp.verifications.sendEmailCode).not.toHaveBeenCalled();
  });

  it("mantém a etapa de verificação quando o código é inválido", async () => {
    const user = userEvent.setup();
    signUp.verifications.verifyEmailCode.mockResolvedValue({
      error: { longMessage: "O código informado é inválido." },
    });
    renderPage();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));
    await user.type(
      await screen.findByLabelText("Código de verificação"),
      "000000",
    );
    await user.click(
      screen.getByRole("button", { name: /confirmar código/i }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "O código informado é inválido.",
    );
    expect(
      screen.getByRole("heading", { name: /verifique seu e-mail/i }),
    ).toBeVisible();
    expect(signUp.finalize).not.toHaveBeenCalled();
  });

  it("permanece no cadastro e mostra o erro retornado pelo Clerk", async () => {
    const user = userEvent.setup();
    signUp.password.mockResolvedValue({
      error: { longMessage: "Este endereço de e-mail já está em uso." },
    });
    renderPage();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Este endereço de e-mail já está em uso.",
    );
    expect(screen.getByRole("button", { name: /criar conta/i })).toBeVisible();
    expect(signUp.verifications.sendEmailCode).not.toHaveBeenCalled();
  });

  it("redireciona para a home quando já existe uma sessão Clerk", async () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: true });
    renderPage();

    expect(
      await screen.findByRole("heading", { name: "Home autenticada" }),
    ).toBeInTheDocument();
    expect(signUp.password).not.toHaveBeenCalled();
  });

  it("permite reenviar o código e reiniciar o fluxo para alterar o e-mail", async () => {
    const user = userEvent.setup();
    renderPage();

    await fillIdentity(user);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));
    await user.click(
      await screen.findByRole("button", { name: /reenviar código/i }),
    );

    expect(signUp.verifications.sendEmailCode).toHaveBeenCalledTimes(2);
    expect(
      await screen.findByText("Um novo código foi enviado para seu e-mail."),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: /alterar e-mail/i }));
    expect(signUp.reset).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("button", { name: /criar conta/i }),
    ).toBeVisible();
  });

  it("bloqueia envios duplicados enquanto o Clerk está processando", () => {
    mockUseSignUp.mockReturnValue({
      signUp,
      errors: emptyClerkErrors(),
      fetchStatus: "fetching",
    });
    renderPage();

    expect(
      screen.getByRole("button", { name: /processando/i }),
    ).toBeDisabled();
    fireEvent.submit(screen.getByRole("button", { name: /processando/i }));
    expect(signUp.password).not.toHaveBeenCalled();
  });
});
