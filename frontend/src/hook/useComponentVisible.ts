import { useState, useEffect, useRef, PointerEvent } from "react";

export default function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setIsComponentVisible(!isComponentVisible);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isComponentVisible);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        !isComponentVisible,
      );
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
