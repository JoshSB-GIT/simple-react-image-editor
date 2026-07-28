import type { EditorDocument } from "../../types/document";

export interface EditorHistory {
  past: EditorDocument[];
  present: EditorDocument;
  future: EditorDocument[];
}
