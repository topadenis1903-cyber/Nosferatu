import { useSyncExternalStore } from "react";

export function useClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}
