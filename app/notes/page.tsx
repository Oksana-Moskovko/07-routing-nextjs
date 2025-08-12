import NotesPage from "./Notes.client";
import { fetchNotes } from "../../lib/api";

const Notes = async () => {
  const initialPage = 1;
  const initialSearch = "";

  const data = await fetchNotes({
    search: initialSearch,
    page: initialPage,
    perPage: 12,
  });
  return (
    <NotesPage
      initialData={{
        notes: data.notes,
        totalPages: data.totalPages,
      }}
    />
  );
};

export default Notes;
