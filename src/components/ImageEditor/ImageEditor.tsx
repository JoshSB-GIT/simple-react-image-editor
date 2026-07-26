import { EditorViewport } from "../EditorViewport";

import styles from "./ImageEditor.module.css";

export interface ImageEditorProps {
  className?: string;
}

export function ImageEditor({ className }: ImageEditorProps) {
  const editorClassName = [styles.editor, className].filter(Boolean).join(" ");

  return (
    <section className={editorClassName} aria-label="Editor de imágenes">
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Editor de imágenes</h2>

          <p className={styles.description}>
            Selección, recorte y edición de imágenes.
          </p>
        </div>
      </header>

      <EditorViewport />
    </section>
  );
}
