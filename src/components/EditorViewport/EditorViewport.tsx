import { Layer, Rect, Stage, Text } from "react-konva";

import { useContainerSize } from "../../hooks/useContainerSize";
import { useImageLoader } from "../../hooks/useImageLoader";

import styles from "./EditorViewport.module.css";

export interface EditorViewportProps {
  source?: File | null;
}

export function EditorViewport({ source }: EditorViewportProps) {
  const { containerRef, size } = useContainerSize<HTMLDivElement>();

  const {
    status,
    width: imageWidth,
    height: imageHeight,
    error,
  } = useImageLoader(source);

  const guideWidth = Math.max(0, Math.min(640, size.width - 48));

  const guideHeight = Math.max(0, Math.min(420, size.height - 48));

  const guideX = (size.width - guideWidth) / 2;
  const guideY = (size.height - guideHeight) / 2;

  let statusMessage = "Selecciona una imagen para comenzar.";

  if (status === "loading") {
    statusMessage = "Cargando imagen...";
  }

  if (status === "loaded") {
    statusMessage = `Imagen cargada: ${imageWidth} × ${imageHeight} px`;
  }

  if (status === "error") {
    statusMessage = error?.message ?? "Ocurrió un error al cargar la imagen.";
  }

  return (
    <div ref={containerRef} className={styles.viewport}>
      {size.width > 0 && size.height > 0 && (
        <Stage width={size.width} height={size.height}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={size.width}
              height={size.height}
              fill="#101010"
            />

            <Rect
              x={guideX}
              y={guideY}
              width={guideWidth}
              height={guideHeight}
              cornerRadius={12}
              stroke="#525252"
              strokeWidth={1}
              dash={[8, 8]}
            />

            <Text
              x={guideX}
              y={guideY + guideHeight / 2 - 10}
              width={guideWidth}
              align="center"
              text={statusMessage}
              fill="#a3a3a3"
              fontSize={16}
              fontFamily="Arial"
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
}
