import { Image as KonvaImage, Layer, Rect, Stage, Text } from "react-konva";

import { calculateContainedRect } from "../../core/geometry/calculateContainedRect";
import { calculateRotatedBoundingSize } from "../../core/geometry/calculateRotatedBoundingSize";
import { useContainerSize } from "../../hooks/useContainerSize";
import { useImageLoader } from "../../hooks/useImageLoader";

import type { ImageTransform } from "../../types/document";

import styles from "./EditorViewport.module.css";

export interface EditorViewportProps {
  source?: File | null;
  transform: ImageTransform;
}

export function EditorViewport({ source, transform }: EditorViewportProps) {
  const { containerRef, size } = useContainerSize<HTMLDivElement>();

  const {
    status,
    image,
    width: imageWidth,
    height: imageHeight,
    error,
  } = useImageLoader(source);

  const rotatedBoundingSize = calculateRotatedBoundingSize({
    width: imageWidth,
    height: imageHeight,
    rotation: transform.rotation,
  });

  const imageBounds = image
    ? calculateContainedRect({
        container: size,
        content: rotatedBoundingSize,
        padding: 24,
      })
    : null;

  const imageScale =
    imageBounds &&
    rotatedBoundingSize.width > 0 &&
    rotatedBoundingSize.height > 0
      ? Math.min(
          imageBounds.width / rotatedBoundingSize.width,
          imageBounds.height / rotatedBoundingSize.height,
        )
      : 0;

  const renderedImageWidth = imageWidth * imageScale;
  const renderedImageHeight = imageHeight * imageScale;

  const imageCenterX = imageBounds ? imageBounds.x + imageBounds.width / 2 : 0;

  const imageCenterY = imageBounds ? imageBounds.y + imageBounds.height / 2 : 0;

  let statusMessage = "Selecciona una imagen para comenzar.";

  if (status === "loading") {
    statusMessage = "Cargando imagen...";
  }

  if (status === "error") {
    statusMessage = error?.message ?? "Ocurrió un error al cargar la imagen.";
  }

  const canRenderStage = size.width > 0 && size.height > 0;

  const canRenderImage =
    status === "loaded" &&
    image !== null &&
    imageBounds !== null &&
    imageScale > 0;

  return (
    <div ref={containerRef} className={styles.viewport}>
      {canRenderStage && (
        <Stage width={size.width} height={size.height}>
          {/* Capa del fondo del editor */}
          <Layer listening={false}>
            <Rect
              x={0}
              y={0}
              width={size.width}
              height={size.height}
              fill="#101010"
            />
          </Layer>

          {/* Capa que contiene la imagen o el mensaje de estado */}
          <Layer listening={false}>
            {canRenderImage ? (
              <KonvaImage
                image={image}
                x={imageCenterX}
                y={imageCenterY}
                width={renderedImageWidth}
                height={renderedImageHeight}
                offsetX={renderedImageWidth / 2}
                offsetY={renderedImageHeight / 2}
                rotation={transform.rotation}
              />
            ) : (
              <Text
                x={24}
                y={size.height / 2 - 10}
                width={Math.max(0, size.width - 48)}
                text={statusMessage}
                align="center"
                fill="#a3a3a3"
                fontSize={16}
                fontFamily="Arial"
              />
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
