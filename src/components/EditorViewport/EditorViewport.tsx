import { Image as KonvaImage, Layer, Rect, Stage, Text } from "react-konva";

import { calculateContainedRect } from "../../core/geometry/calculateContainedRect";
import { useContainerSize } from "../../hooks/useContainerSize";
import { useImageLoader } from "../../hooks/useImageLoader";
import type { ImageTransform } from "../../types/document";

import styles from "./EditorViewport.module.css";

export interface EditorViewportProps {
  source?: File | null;
  transform: ImageTransform;
}

export function EditorViewport({ source, transform }: EditorViewportProps) {
  const { containerRef, size: viewportSize } =
    useContainerSize<HTMLDivElement>();

  const {
    status,
    image,
    width: originalImageWidth,
    height: originalImageHeight,
    error,
  } = useImageLoader(source);

  const isSideways = transform.rotation === 90 || transform.rotation === 270;

  const rotatedImageSize = {
    width: isSideways ? originalImageHeight : originalImageWidth,
    height: isSideways ? originalImageWidth : originalImageHeight,
  };

  const imageBounds = image
    ? calculateContainedRect({
        container: viewportSize,
        content: rotatedImageSize,
        padding: 24,
      })
    : null;

  const imageScale =
    imageBounds && rotatedImageSize.width > 0
      ? imageBounds.width / rotatedImageSize.width
      : 0;

  const renderedImageWidth = originalImageWidth * imageScale;

  const renderedImageHeight = originalImageHeight * imageScale;

  const imageCenterX = imageBounds ? imageBounds.x + imageBounds.width / 2 : 0;

  const imageCenterY = imageBounds ? imageBounds.y + imageBounds.height / 2 : 0;

  let statusMessage = "Selecciona una imagen para comenzar.";

  if (status === "loading") {
    statusMessage = "Cargando imagen...";
  }

  if (status === "error") {
    statusMessage = error?.message ?? "Ocurrió un error al cargar la imagen.";
  }

  const canRenderStage = viewportSize.width > 0 && viewportSize.height > 0;

  const canRenderImage =
    status === "loaded" &&
    image !== null &&
    imageBounds !== null &&
    imageScale > 0;

  return (
    <div ref={containerRef} className={styles.viewport}>
      {canRenderStage && (
        <Stage width={viewportSize.width} height={viewportSize.height}>
          <Layer listening={false}>
            <Rect
              x={0}
              y={0}
              width={viewportSize.width}
              height={viewportSize.height}
              fill="#101010"
            />
          </Layer>

          <Layer listening={false}>
            {canRenderImage && (
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
            )}

            {!canRenderImage && (
              <Text
                x={24}
                y={viewportSize.height / 2 - 10}
                width={Math.max(0, viewportSize.width - 48)}
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
