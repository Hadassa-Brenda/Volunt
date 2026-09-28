import React from "react";
import { ClerkProvider } from "@clerk/react";
import { createRoot } from "react-dom/client";

import ClerkApiAuthBridge from "./api/ClerkApiAuthBridge";
import App from "./features/pages/App";
import "./styles/global.css";

const clerkPublishableKey =
  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY?.trim();

if (!clerkPublishableKey) {
  throw new Error(
    "A variável REACT_APP_CLERK_PUBLISHABLE_KEY precisa ser configurada.",
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl="/login"
      signUpUrl="/cadastro"
      afterSignOutUrl="/"
    >
      <ClerkApiAuthBridge>
        <App />
      </ClerkApiAuthBridge>
    </ClerkProvider>
  </React.StrictMode>,
);
