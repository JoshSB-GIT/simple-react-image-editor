import type { EditorHistory } from "./types";

import { INITIAL_EDITOR_DOCUMENT } from "../../state/initialEditorState";

export const INITIAL_HISTORY_STATE: EditorHistory = {
  past: [],
  present: INITIAL_EDITOR_DOCUMENT,
  future: [],
};
