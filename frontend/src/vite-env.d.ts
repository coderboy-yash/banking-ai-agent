/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_AGENT_SERVICE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
