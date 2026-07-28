export type EditorAction =
  | { type: "ROTATE_LEFT" }
  | { type: "ROTATE_RIGHT" }
  | { type: "RESET" }
  | { type: "FLIP_HORIZONTAL" }
  | { type: "FLIP_VERTICAL" };
