import { useEffect, useRef } from "react";

export const useEventListener = (
  eventType: string,
  callback: (e: MouseEvent) => void,
  element: Document | null = document
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e as MouseEvent);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
