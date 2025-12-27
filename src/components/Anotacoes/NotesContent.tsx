import { useState } from "react";
import { Box } from "@mui/material";
import { NotesListHeader } from "./NotesListHeader";
import { NotesItem } from "./NotesItem";
import { NotesWindow } from "./NotesWindow";
import { NotesWindowHeader } from "./NotesWindowHeader";
import { ConfirmarExclusaoNota } from "./ConfirmarExclusaoNota";
import { Note, NotesFeature } from "@/types";

interface Props {
  notepad: NotesFeature;
}

export function NotesContent({ notepad }: Props) {
  const { notes, actions } = notepad;
  const [search, setSearch] = useState("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const activeNote = notes.find((n) => n.$id === activeNoteId) ?? null;

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  function createNewNote() {
    const newNote: Note = {
      $id: crypto.randomUUID(),
      title: "Nova Anotação",
      text: "",
      createdAt: new Date().toISOString(),
    };

    actions.create(newNote);
    setActiveNoteId(newNote.$id);
  }

  function confirmDelete() {
    if (!noteToDelete) return;

    actions.delete(noteToDelete.$id);

    if (activeNoteId === noteToDelete.$id) {
      setActiveNoteId(null);
    }

    setNoteToDelete(null);
  }

  const [title, setTitle] = useState(activeNote ? activeNote.title : "");

  return (
    <>
      <Box sx={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}>
        {!activeNote ? (
          <NotesListHeader
            value={search}
            onSearch={setSearch}
            onAdd={createNewNote}
          />
        ) : (
          <NotesWindowHeader
            note={activeNote}
            onBack={() => setActiveNoteId(null)}
            onChange={setTitle}
          />
        )}

        {!activeNote ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", p: 1, maxHeight: "75dvh" }}>
            {filteredNotes.map((note) => (
              <NotesItem
                key={note.$id}
                note={note}
                onSelect={() => setActiveNoteId(note.$id)}
                onDelete={() => setNoteToDelete(note)}
                />
            ))}
          </Box>

        ) : (
          <NotesWindow
            note={activeNote}
            onSave={(data) => {
              actions.update(activeNote.$id, data);
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