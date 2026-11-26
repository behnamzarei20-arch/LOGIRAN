/**
 * One in-memory navigation history for the customer app.
 *
 * Main section tabs are destinations, not history entries. Selecting a tab
 * starts that section at its root and discards the previous section's stack.
 * Pages opened inside a section remain ordinary back-stack entries.
 */
export const MAIN_SECTION_PAGES = ['features', 'calls', 'offers', 'profile'] as const;

const MAIN_SECTION_SET: ReadonlySet<string> = new Set(MAIN_SECTION_PAGES);

export function navigatePageHistory<T extends string>(
  history: readonly T[],
  nextPage: T,
  homePage: T,
): T[] {
  if (nextPage === homePage) return [homePage];

  // A main tab switch is a root reset, never another Back step.
  if (MAIN_SECTION_SET.has(nextPage)) return [homePage, nextPage];

  if (history[history.length - 1] === nextPage) return [...history];
  return [...(history.length ? history : [homePage]), nextPage];
}

export function popPageHistory<T extends string>(
  history: readonly T[],
  homePage: T,
): { history: T[]; page: T } {
  if (history.length <= 1) return { history: [homePage], page: homePage };

  const nextHistory = history.slice(0, -1);
  return {
    history: nextHistory.length ? nextHistory : [homePage],
    page: nextHistory[nextHistory.length - 1] || homePage,
  };
}

/** The selected bottom tab follows the section root, not the leaf page. */
export function getActiveMainSection<T extends string>(history: readonly T[], homePage: T): T {
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const page = history[index];
    if (page === homePage || MAIN_SECTION_SET.has(page)) return page;
  }
  return homePage;
}
