"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();

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

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <Modal onClose={handleClose}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created date: {new Date(note.createdAt).toLocaleDateString()}
        </p>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
