import type { EditorAction } from "../../state/editorActions";
import type { EditorHistory } from "./types";
import type { EditorDocument } from "../../types/document";
import { editorReducer } from "../../state/editorReducer";

const UNDO_REDO_LIMIT = 20;

function normalizeUndoRedo(
  prevList: EditorDocument[],
  present: EditorDocument,
): EditorDocument[] {
  const current = [...prevList, present];

  if (current.length > UNDO_REDO_LIMIT) {
    return [...current.slice(-UNDO_REDO_LIMIT)];
  }

  return current;
}

function setUndo(state: EditorHistory): EditorHistory {
  if (state.past.length > 0) {
    return {
      past: state.past.slice(0, state.past.length - 1),
      present: state.past[state.past.length - 1],
      future: normalizeUndoRedo(state.future, state.present),
    };
  }

  return state;
}

function setRedo(state: EditorHistory): EditorHistory {
  if (state.future.length > 0) {
    return {
      past: normalizeUndoRedo(state.past, state.present),
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

  const nextPresent = editorReducer(state.present, action);

  if (nextPresent !== state.present) {
    return {
      past: normalizeUndoRedo(state.past, state.present),
      present: nextPresent,
      future: [],
    };
  }

  return state;
}
