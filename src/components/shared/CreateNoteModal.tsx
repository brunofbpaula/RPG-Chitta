import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import { useCreateNote } from "@/lib/react-query/queriesAndMutation";

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ open, onClose, playerId }) => {
  const createNoteMutation = useCreateNote();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.text) {
      alert("Preencha todos os campos!");
      return;
    }

    createNoteMutation.mutate(
      { note: formData, playerId },
      {
        onSuccess: () => {
          setFormData({
            title: "",
            text: "",
            createdAt: new Date().toISOString(),
          });
          onClose();
        },
        onError: (error) => {
          console.error("Erro ao criar nota:", error);
          alert("Erro ao criar nota.");
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.8)",
          border: "1px solid #ef4444",
          backdropFilter: "blur(6px)",
          borderRadius: "12px",
          padding: "16px",
          maxWidth: "500px",
          width: "500px",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <DialogTitle
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          Adicionar Nota
        </DialogTitle>

        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px rgba(0,0,0,0.8) inset",
                WebkitTextFillColor: "white",
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
              fontSize: "0.85rem",
              "&.Mui-focused": {
                color: "white",
                fontSize: "0.75rem",
              },
            },
          }}
        />

        <TextField
          label="Texto"
          name="text"
          value={formData.text}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& textarea:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px rgba(0,0,0,0.8) inset",
                WebkitTextFillColor: "white",
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
              fontSize: "0.85rem",
              "&.Mui-focused": {
                color: "white",
                fontSize: "0.75rem",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ paddingTop: "12px" }}>
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
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#dc2626", boxShadow: "0 0 8px #ef4444" },
          }}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNoteModal;
