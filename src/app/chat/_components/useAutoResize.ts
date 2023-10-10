import { useCallback, useEffect, useLayoutEffect } from "react";

export const useAutoResize = () => {
  const autoResize = useCallback((textarea: HTMLElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 4 + "px";
  }, []);

  return { autoResize };
};
