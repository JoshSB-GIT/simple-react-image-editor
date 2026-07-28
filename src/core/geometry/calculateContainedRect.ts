import type { Rectangle, Size } from "../../types/geometry";

export interface CalculateContainedRectOptions {
  container: Size;
  content: Size;
  padding?: number;
  allowUpscale?: boolean;
}

export function calculateContainedRect({
  container,
  content,
  padding = 0,
  allowUpscale = false,
}: CalculateContainedRectOptions): Rectangle {
  const safePadding = Math.max(0, padding);

  const availableWidth = Math.max(0, container.width - safePadding * 2);

  const availableHeight = Math.max(0, container.height - safePadding * 2);

  const hasValidDimensions =
    availableWidth > 0 &&
    availableHeight > 0 &&
    content.width > 0 &&
    content.height > 0;

  if (!hasValidDimensions) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  const widthScale = availableWidth / content.width;
  const heightScale = availableHeight / content.height;

  const containedScale = Math.min(widthScale, heightScale);

  const scale = allowUpscale ? containedScale : Math.min(containedScale, 1);

  const width = content.width * scale;
  const height = content.height * scale;

  return {
    x: (container.width - width) / 2,
    y: (container.height - height) / 2,
    width,
    height,
  };
}
