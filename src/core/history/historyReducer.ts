import type { EditorHistory } from "./types";
import type { EditorAction } from "../../state/editorActions";

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

export function historyReducer(state: EditorHistory, action: EditorAction) {
  switch (action.type) {
    case "UNDO":
      return setUndo(state);
  }
}
