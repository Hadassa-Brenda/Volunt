import { getClerkErrorMessage } from "./clerkAuthUtils";

describe("getClerkErrorMessage", () => {
  it("exibe o detalhe do Clerk quando não há tradução cadastrada", () => {
    expect(
      getClerkErrorMessage(
        {
          errors: [
            {
              code: "form_password_not_strong_enough",
              message: "Password does not meet the configured requirements.",
            },
          ],
        },
        "Não foi possível redefinir a senha.",
      ),
    ).toBe("Password does not meet the configured requirements.");
  });

  it("prioriza o código detalhado do erro Clerk", () => {
    expect(
      getClerkErrorMessage({
        code: "api_error",
        errors: [{ code: "form_password_pwned" }],
      }),
    ).toBe("Escolha uma senha diferente para proteger sua conta.");
  });
});