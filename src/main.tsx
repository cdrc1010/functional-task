import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProductContextProvider from "./provider/ProductContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </StrictMode>
);
