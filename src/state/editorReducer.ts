import type { EditorAction } from "./editorActions";
import { INITIAL_EDITOR_DOCUMENT } from "./initialEditorState";

import type { EditorDocument, ImageRotation } from "../types/document";

const ROTATION_STEP = 45;

function normalizeRotation(rotation: number): ImageRotation {
  return ((rotation % 360) + 360) % 360;
}

function rotateRight(rotation: ImageRotation): ImageRotation {
  return normalizeRotation(rotation + ROTATION_STEP);
}

function rotateLeft(rotation: ImageRotation): ImageRotation {
  return normalizeRotation(rotation - ROTATION_STEP);
}

export function editorReducer(
  state: EditorDocument,
  action: EditorAction,
): EditorDocument {
  switch (action.type) {
    case "ROTATE_RIGHT":
      return {
        ...state,
        transform: {
          ...state.transform,
          rotation: rotateRight(state.transform.rotation),
        },
      };

    case "ROTATE_LEFT":
      return {
        ...state,
        transform: {
          ...state.transform,
          rotation: rotateLeft(state.transform.rotation),
        },
      };

    case "RESET":
      return INITIAL_EDITOR_DOCUMENT;

    default:
      return state;
  }
}
