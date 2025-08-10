import React from 'react';
import { useDeleteNote } from '@/lib/react-query/queriesAndMutation'; // ou onde estiver seu hook
import { Button } from '@mui/material';

interface DeleteNoteModalProps {
  open: boolean;
  onClose: () => void;
  noteId?: string;
  noteTitle?: string;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ open, onClose, noteId, noteTitle }) => {
  const deleteNoteMutation = useDeleteNote();

  const handleDelete = () => {
    if (!noteId) return;

    deleteNoteMutation.mutate(noteId, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Erro ao deletar nota:', error);
      },
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border border-red-500 p-6 rounded-lg w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-red-500 font-bold text-lg mb-4">Deletar nota</h2>
        <p className="text-white">
          Apagar a anotação "<strong>{noteTitle}</strong>"?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onClose}
            sx={{
              color: "white",
              border: "1px solid gray",
              "&:hover": { backgroundColor: "rgba(75,85,99,0.2)" },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: "#ef4444",
              color: "white",
              fontWeight: "500",
              "&:hover": { backgroundColor: "#dc2626", boxShadow: "0 0 8px #ef4444" },
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
