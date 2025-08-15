import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common["Authorization"] = `Bearer ${myToken}`;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];        
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  { page = 1, perPage = 10, search = "" }: FetchNotesParams = {},
  tag?: string
) => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'All') params.tag = tag;

  const res = await axios.get("/notes", { params });
  return res.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

