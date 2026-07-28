export type ImageRotation = number;

export interface ImageTransform {
  rotation: ImageRotation;
}

export interface EditorDocument {
  version: 1;
  transform: ImageTransform;
}
