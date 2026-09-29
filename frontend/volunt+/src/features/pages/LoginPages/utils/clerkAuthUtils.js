export function getClerkErrorMessage(error, fallbackMessage) {
  return error?.longMessage || error?.message || fallbackMessage;
}

export function getClerkFieldMessage(errors, field) {
  const error = errors?.fields?.[field];

  return error ? getClerkErrorMessage(error, "Não foi possível validar este campo.") : "";
}

export function supportsEmailCodeSecondFactor(signIn) {
  return signIn.supportedSecondFactors.some(
    (factor) => factor.strategy === "email_code",
  );
}

export async function finalizeClerkSession(authenticationAttempt, navigate) {
  let hasPendingTask = false;

  const { error } = await authenticationAttempt.finalize({
    navigate: ({ session, decorateUrl }) => {
      if (session?.currentTask) {
        hasPendingTask = true;
        return;
      }

      const destination = decorateUrl("/");

      if (/^https?:\/\//.test(destination)) {
        window.location.assign(destination);
        return;
      }

      navigate(destination, { replace: true });
    },
  });

  return { error, hasPendingTask };
}
