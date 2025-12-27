import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Note } from "@/_root/RootLayout";

import { NotesListHeader } from "./NotesListHeader";
import { NotesItem } from "./NotesItem";
import { NotesWindow } from "./NotesWindow";
import { NotesWindowHeader } from "./NotesWindowHeader";
import { ConfirmarExclusaoNota } from "./ConfirmarExclusaoNota";

type NotesContentProps = {
  notes: Note[];
};

export function NotesContent({ notes }: NotesContentProps) {
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);
  const [search, setSearch] = useState("");
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const filteredNotes = localNotes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);
  
  function createNewNote() {
    const newNote: Note = {
      $id: crypto.randomUUID(),
      title: "New note",
      text: "",
      createdAt: new Date().toISOString(),
    };

    setLocalNotes((prev) => [newNote, ...prev]);
    setActiveNote(newNote);
  }

  function requestDelete(note: Note) {
    setNoteToDelete(note);
  }

  function confirmDelete() {
    if (!noteToDelete) return;

    setLocalNotes((prev) =>
      prev.filter((n) => n.$id !== noteToDelete.$id)
    );

    if (activeNote?.$id === noteToDelete.$id) {
      setActiveNote(null);
    }

    setNoteToDelete(null);
  }

  return (
    <>
      <Box
        sx={{
          background: "transparent",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!activeNote ? (
          <NotesListHeader
            value={search}
            onSearch={setSearch}
            onAdd={createNewNote}
          />
        ) : (
          <NotesWindowHeader
            note={activeNote}
            onBack={() => setActiveNote(null)}
          />
        )}

        {!activeNote ? (
          filteredNotes.map((note) => (
            <NotesItem
              key={note.$id}
              note={note}
              onSelect={setActiveNote}
              onDelete={() => requestDelete(note)}
            />
          ))
        ) : (
          <NotesWindow
            note={activeNote}
            onChange={(text) => {
              const updatedAt = new Date().toISOString();

              setActiveNote((prev) =>
                prev
                  ? { ...prev, text, createdAt: updatedAt }
                  : prev
              );

              setLocalNotes((prev) =>
                prev.map((n) =>
                  n.$id === activeNote.$id
                    ? { ...n, text, createdAt: updatedAt }
                    : n
                )
              );
            }}
          />
        )}
      </Box>

      <ConfirmarExclusaoNota
        open={!!noteToDelete}
        title={noteToDelete?.title || ""}
        onCancel={() => setNoteToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
