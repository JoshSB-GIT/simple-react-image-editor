import type { Size } from "../../types/geometry";

export interface CalculateRotatedBoundingSizeOptions {
  width: number;
  height: number;
  rotation: number;
}

export function calculateRotatedBoundingSize({
  width,
  height,
  rotation,
}: CalculateRotatedBoundingSizeOptions): Size {
  if (width <= 0 || height <= 0) {
    return {
      width: 0,
      height: 0,
    };
  }

  const radians = (rotation * Math.PI) / 180;

  const absoluteCosine = Math.abs(Math.cos(radians));
  const absoluteSine = Math.abs(Math.sin(radians));

  const boundingWidth = width * absoluteCosine + height * absoluteSine;

  const boundingHeight = width * absoluteSine + height * absoluteCosine;

  return {
    width: boundingWidth,
    height: boundingHeight,
  };
}
