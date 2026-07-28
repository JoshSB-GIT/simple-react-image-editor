import { useReducer } from "react";

import { editorReducer } from "../../state/editorReducer";
import { INITIAL_EDITOR_DOCUMENT } from "../../state/initialEditorState";

import { EditorToolbar } from "../EditorToolbar";
import { EditorViewport } from "../EditorViewport";

import styles from "./ImageEditor.module.css";

export interface ImageEditorProps {
  source?: File | null;
  className?: string;
}

export function ImageEditor({ source, className }: ImageEditorProps) {
  const [document, dispatch] = useReducer(
    editorReducer,
    INITIAL_EDITOR_DOCUMENT,
  );

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

      <EditorToolbar
        rotation={document.transform.rotation}
        onRotateLeft={() => {
          dispatch({ type: "ROTATE_LEFT" });
        }}
        onRotateRight={() => {
          dispatch({ type: "ROTATE_RIGHT" });
        }}
        onReset={() => {
          dispatch({ type: "RESET" });
        }}
      />

      <EditorViewport source={source} transform={document.transform} />
    </section>
  );
}
