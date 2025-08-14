import { fetchNotes } from "@/lib/api";
import NotesPage from "./Notes.client";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const data = await fetchNotes({ page: 1, perPage: 12, search: "" }, tag);

  return (
    <NotesPage
      initialData={{
        notes: data.notes,
        totalPages: data.totalPages,
      }}
      tag={tag || "all"}
    />
  );
};

export default Notes;
