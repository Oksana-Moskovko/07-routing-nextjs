"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Note } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type NotesPageProps = {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  tag?: string | undefined;
};

const NotesPage = ({ initialData, tag }: NotesPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputSearchQuery, setInputSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearchQuery(value);
    updateSearchQuery(value);
  };

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, tag, currentPage],
    queryFn: () =>
      fetchNotes({ search: searchQuery, page: currentPage, perPage: 12 }, tag),
    placeholderData: keepPreviousData,
    initialData,
  });
  // console.log("Fetched data:", data);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox value={inputSearchQuery} onChange={handleSearchChange} />
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
        {isError && <ErrorMessage />}
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
