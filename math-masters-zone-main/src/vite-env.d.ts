/// <reference types="vite/client" />

/** Ano de build, injetado via `define` em vite.config.ts — determinístico entre SSR e cliente. */
declare const __BUILD_YEAR__: string;
