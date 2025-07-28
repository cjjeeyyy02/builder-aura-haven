import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

// Prevent multiple root creation during hot reload
const container = document.getElementById("root")!;

// Store root globally to reuse during hot module replacement
declare global {
  var __APP_ROOT__: ReturnType<typeof createRoot> | undefined;
}

// Only create a new root if one doesn't exist
if (!globalThis.__APP_ROOT__) {
  // Clear any existing content to prevent conflicts
  container.innerHTML = "";
  globalThis.__APP_ROOT__ = createRoot(container);
}

// Always render the latest version of the app
globalThis.__APP_ROOT__.render(<App />);
