import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RosterProvider } from "@/store/roster-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RosterProvider>
        <App />
      </RosterProvider>
    </ThemeProvider>
  </StrictMode>
)
