import type { EditorHistory } from "./types";
import type { EditorAction } from "../../state/editorActions";
import { editorReducer } from "../../state/editorReducer";

function setUndo(state: EditorHistory): EditorHistory {
  if (state.past.length > 0) {
    return {
      past: state.past.slice(0, state.past.length - 1),
      present: state.past[state.past.length - 1],
      future: [...state.future, state.present],
    };
  }

  return state;
}

function setRedo(state: EditorHistory): EditorHistory {
  if (state.future.length > 0) {
    return {
      past: [...state.past, state.present],
      present: state.future[state.future.length - 1],
      future: state.future.slice(0, state.future.length - 1),
    };
  }

  return state;
}

export function historyReducer(state: EditorHistory, action: EditorAction) {
  switch (action.type) {
    case "UNDO":
      return setUndo(state);

    case "REDO":
      return setRedo(state);
  }

  editorReducer(state, action);
}
