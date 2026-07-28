export type ImageRotation = 0 | 90 | 180 | 270;

export interface ImageTransform {
  rotation: ImageRotation;
}

export interface EditorDocument {
  version: 1;
  transform: ImageTransform;
}
