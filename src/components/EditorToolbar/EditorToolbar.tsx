import type { ImageRotation } from "../../types/document";

import styles from "./EditorToolbar.module.css";

export interface EditorToolbarProps {
  rotation: ImageRotation;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
}

export function EditorToolbar({
  rotation,
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
