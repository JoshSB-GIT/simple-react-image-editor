import { useEffect, useRef, useState } from "react";

export interface ContainerSize {
  width: number;
  height: number;
}

export function useContainerSize<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  const [size, setSize] = useState<ContainerSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      setSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    size,
  };
}
