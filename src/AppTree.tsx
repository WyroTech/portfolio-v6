import { LangProvider } from './i18n/lang'
import App from './App'

/**
 * Shared application tree. The router (BrowserRouter on the client,
 * StaticRouter during prerender) and the Unhead provider are added per
 * environment by the client (`main.tsx`) and server (`entry-server.tsx`)
 * entries, so this stays identical on both sides and can't drift.
 */
export default function AppTree() {
  return (
    <LangProvider>
      <App />
    </LangProvider>
  )
}
