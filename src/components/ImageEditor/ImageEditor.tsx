import { EditorViewport } from "../EditorViewport";

import styles from "./ImageEditor.module.css";

export interface ImageEditorProps {
  source?: File | null;
  className?: string;
}

export function ImageEditor({ source, className }: ImageEditorProps) {
  const editorClassName = [styles.editor, className].filter(Boolean).join(" ");

  return (
    <section className={editorClassName} aria-label="Editor de imágenes">
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Editor de imágenes</h2>

          <p className={styles.description}>
            {source
              ? `Imagen seleccionada: ${source.name}`
              : "Selecciona una imagen para comenzar."}
          </p>
        </div>
      </header>

      <EditorViewport />
    </section>
  );
}
