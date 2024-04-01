import { useEventListener } from "./useEventListener";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  cb: (e: MouseEvent) => void
) => {
  useEventListener(
    "click",
    e => {
      if (ref.current == null || ref.current.contains(e.target as Node)) return;
      cb(e);
    },
    document
  );
};
