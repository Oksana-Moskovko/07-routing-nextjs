"use client";

import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

const NoteDetailsClient = () => {
  const router = useRouter();
  const close = () => router.back();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  // console.log("note", id);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <Modal>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created date: {new Date(note.createdAt).toLocaleDateString()}
        </p>
        <button onClick={close}>Close</button>
      </div>
    </Modal>
  );
};

export default NoteDetailsClient;
