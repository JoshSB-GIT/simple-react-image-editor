export type ImageRotation = number;

export interface ImageTransform {
  rotation: ImageRotation;
  flipX: boolean;
  flipY: boolean;
}

export interface EditorDocument {
  version: 1;
  transform: ImageTransform;
}
