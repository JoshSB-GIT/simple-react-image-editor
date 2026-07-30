import { useReducer } from "react";

import { historyReducer } from "../../core/history/historyReducer";
import { INITIAL_HISTORY_STATE } from "../../core/history/initialHistoryState";

import { EditorToolbar } from "../EditorToolbar";
import { EditorViewport } from "../EditorViewport";

import styles from "./ImageEditor.module.css";

export interface ImageEditorProps {
  source?: File | null;
  className?: string;
}

export function ImageEditor({ source, className }: ImageEditorProps) {
  const [history, dispatch] = useReducer(historyReducer, INITIAL_HISTORY_STATE);

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
        canUndo={Boolean(history.past.length)}
        canRedo={Boolean(history.future.length)}
        rotation={history.present.transform.rotation}
        onRotateLeft={() => {
          dispatch({ type: "ROTATE_LEFT" });
        }}
        onRotateRight={() => {
          dispatch({ type: "ROTATE_RIGHT" });
        }}
        onReset={() => {
          dispatch({ type: "RESET" });
        }}
        onFlipHorizontal={() => {
          dispatch({ type: "FLIP_HORIZONTAL" });
        }}
        onFlipVertical={() => {
          dispatch({ type: "FLIP_VERTICAL" });
        }}
        onRedo={() => {
          dispatch({ type: "REDO" });
        }}
        onUndo={() => {
          dispatch({ type: "UNDO" });
        }}
      />

      <EditorViewport source={source} transform={history.present.transform} />
    </section>
  );
}
