/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_AUTH_TOKEN: string
    readonly VITE_GOOGLEMAP_API_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
