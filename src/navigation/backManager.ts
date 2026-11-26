type BackHandler = () => boolean | void;

type Entry = {
  id: symbol;
  priority: number;
  handler: BackHandler;
};

const handlers = new Map<symbol, Entry>();

export function registerBackHandler(handler: BackHandler, priority = 0): () => void {
  const id = Symbol('back-handler');
  handlers.set(id, { id, priority, handler });
  return () => {
    handlers.delete(id);
  };
}

/**
 * Runs the most specific active Back handler first.
 * A handler consumes Back unless it explicitly returns false.
 */
export function dispatchBack(minPriority = Number.NEGATIVE_INFINITY): boolean {
  const ordered = Array.from(handlers.values())
    .filter(entry => entry.priority >= minPriority)
    .sort((a, b) => b.priority - a.priority);
  for (const entry of ordered) {
    if (!handlers.has(entry.id)) continue;
    if (entry.handler() !== false) return true;
  }
  return false;
}
