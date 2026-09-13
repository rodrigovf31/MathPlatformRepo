/** Data ISO da última alteração substantiva do conteúdo legal. Atualizar manualmente ao editar Privacy.tsx. */
export const PRIVACY_LAST_UPDATED = "2026-09-13";

export const formatPtDate = (iso: string): string => {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
};
