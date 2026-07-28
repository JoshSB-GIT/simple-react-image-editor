import type { ImageRotation } from "../../types/document";

import styles from "./EditorToolbar.module.css";

export interface EditorToolbarProps {
  rotation: ImageRotation;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
}

export function EditorToolbar({
  rotation,
  onFlipHorizontal,
  onFlipVertical,
  onRotateLeft,
  onRotateRight,
  onReset,
}: EditorToolbarProps) {
  return (
    <div
      className={styles.toolbar}
      role="toolbar"
      aria-label="Herramientas del editor"
    >
      <div className={styles.actions}>
        <button type="button" onClick={onFlipHorizontal}>
          Invertir horizontal
        </button>

        <button type="button" onClick={onFlipVertical}>
          Invertir vertical
        </button>

        <button type="button" onClick={onRotateLeft}>
          Rotar izquierda
        </button>

        <button type="button" onClick={onRotateRight}>
          Rotar derecha
        </button>

        <button type="button" onClick={onReset}>
          Restablecer
        </button>
      </div>

      <span className={styles.rotation}>Rotación: {rotation}°</span>
    </div>
  );
}
