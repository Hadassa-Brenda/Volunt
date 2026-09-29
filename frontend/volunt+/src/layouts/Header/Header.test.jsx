import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

const mockUseAuth = jest.fn();

jest.mock("@clerk/react", () => ({
  useAuth: () => mockUseAuth(),
  UserButton: () => <button type="button">Menu da conta Clerk</button>,
}));

function renderHeader() {
  return render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("mostra as ações de entrada apenas para visitantes", () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: false });
    renderHeader();

    expect(screen.getByRole("button", { name: /cadastrar-se/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /^entrar$/i })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /menu da conta clerk/i }),
    ).not.toBeInTheDocument();
  });

  it("reconhece a sessão Clerk sem presumir um User interno", () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: true });
    renderHeader();

    expect(
      screen.getByRole("button", { name: /menu da conta clerk/i }),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /cadastrar-se/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Criar Serviço")).not.toBeInTheDocument();
    expect(screen.queryByText("Meus Serviços")).not.toBeInTheDocument();
  });
});
