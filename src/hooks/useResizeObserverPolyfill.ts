import { useEffect } from "react";

export const useResizeObserverPolyfill = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ResizeObserver) {
      import("resize-observer").then(({ install }) => {
        install();
      });
    }
  }, []);
};
