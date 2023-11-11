import { useCallback, useEffect, useLayoutEffect } from "react";

export const useAutoResize = () => {
  const autoResize = useCallback((textarea: HTMLElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 4 + "px";
  }, []);

  const resetSize = useCallback((textarea: HTMLElement) => {
    textarea.style.height = "auto";
  }, []);

  return { autoResize, resetSize };
};
