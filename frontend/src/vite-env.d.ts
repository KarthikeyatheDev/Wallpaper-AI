/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  // Add ONLY safe public variables here if needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}