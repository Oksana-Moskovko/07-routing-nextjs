export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type Tag = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
};

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export const tags = ["Work", "Todo", "Personal", "Meeting", "Shopping"];