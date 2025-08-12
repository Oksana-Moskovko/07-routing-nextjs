"use client";

import { useState } from "react";
import { fetchNotes } from "../../lib/api";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import css from "./NotesPage.module.css";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { Note } from "@/types/note";

type NotesPageProps = {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
};

const NotesPage = ({ initialData }: NotesPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () =>
      fetchNotes({ search: searchQuery, page: currentPage, perPage: 12 }),
    placeholderData: keepPreviousData,
    initialData,
  });
  // console.log("Fetched data:", data);

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300
  );
  const notes = data?.notes ?? [];
  // console.log(notes);

  const totalPages = data?.totalPages ?? 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox onChange={updateSearchQuery} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              page={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </div>
        {notes.length > 0 && <NoteList notes={notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default NotesPage;
