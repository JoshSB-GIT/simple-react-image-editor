import { useEffect, useState } from "react";

export type ImageLoadStatus = "idle" | "loading" | "loaded" | "error";

export interface UseImageLoaderResult {
  status: ImageLoadStatus;
  image: HTMLImageElement | null;
  width: number;
  height: number;
  error: Error | null;
}

interface CompletedImageLoad {
  source: File;
  result: UseImageLoaderResult;
}

const IDLE_RESULT: UseImageLoaderResult = {
  status: "idle",
  image: null,
  width: 0,
  height: 0,
  error: null,
};

const LOADING_RESULT: UseImageLoaderResult = {
  status: "loading",
  image: null,
  width: 0,
  height: 0,
  error: null,
};

const INVALID_FILE_RESULT: UseImageLoaderResult = {
  status: "error",
  image: null,
  width: 0,
  height: 0,
  error: new Error("El archivo seleccionado no es una imagen válida."),
};

export function useImageLoader(source?: File | null): UseImageLoaderResult {
  const [completedLoad, setCompletedLoad] = useState<CompletedImageLoad | null>(
    null,
  );

  useEffect(() => {
    if (!source || !source.type.startsWith("image/")) {
      return;
    }

    const objectUrl = URL.createObjectURL(source);
    const image = new window.Image();

    let isActive = true;

    image.onload = () => {
      if (!isActive) return;

      setCompletedLoad({
        source,
        result: {
          status: "loaded",
          image,
          width: image.naturalWidth,
          height: image.naturalHeight,
          error: null,
        },
      });
    };

    image.onerror = () => {
      if (!isActive) return;

      setCompletedLoad({
        source,
        result: {
          status: "error",
          image: null,
          width: 0,
          height: 0,
          error: new Error("No fue posible cargar la imagen seleccionada."),
        },
      });
    };

    image.src = objectUrl;

    return () => {
      isActive = false;

      image.onload = null;
      image.onerror = null;

      URL.revokeObjectURL(objectUrl);
    };
  }, [source]);

  if (!source) {
    return IDLE_RESULT;
  }

  if (!source.type.startsWith("image/")) {
    return INVALID_FILE_RESULT;
  }

  if (completedLoad?.source !== source) {
    return LOADING_RESULT;
  }

  return completedLoad.result;
}
