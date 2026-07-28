import type { EditorAction } from "./editorActions";
import { INITIAL_EDITOR_DOCUMENT } from "./initialEditorState";

import type { EditorDocument, ImageRotation } from "../types/document";

function rotateRight(rotation: ImageRotation): ImageRotation {
  return ((rotation + 45) % 360) as ImageRotation;
}

function rotateLeft(rotation: ImageRotation): ImageRotation {
  return ((rotation + 315) % 360) as ImageRotation;
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
