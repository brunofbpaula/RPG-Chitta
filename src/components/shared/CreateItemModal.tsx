import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import { useCreateItem } from "@/lib/react-query/queriesAndMutation";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const CreateItemModal: React.FC<CreateModalProps> = ({ open, onClose, playerId }) => {
  const createItemMutation = useCreateItem();
  
  const imageOptions = [
      "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6896caaa00103b71bd01/view?project=67d9eaea00378fb3eb2f&mode=admin",
      "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6896cd2a00063d0f20a6/view?project=67d9eaea00378fb3eb2f&mode=admin",
      "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6896cd55000c625c7a61/view?project=67d9eaea00378fb3eb2f&mode=admin"
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectImage = (url: string) => {
    setFormData({
      ...formData,
      image: url
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.image) {
      alert("Preencha todos os campos!");
      return;
    }

    createItemMutation.mutate(
      { item: formData, playerId }, // objetos que a mutação espera
      {
        onSuccess: () => {
          setFormData({ name: "", description: "", image: "" });
          onClose();
        },
        onError: (error) => {
          console.error("Erro ao criar item:", error);
          alert("Erro ao criar item.");
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
          p: 0, // remove padding padrão
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
          Adicionar Item
        </DialogTitle>
        <TextField
          label="Nome do Item"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px rgba(0,0,0,0.8) inset", // mantém o fundo escuro
              WebkitTextFillColor: "white", // mantém texto branco
              transition: "background-color 5000s ease-in-out 0s", // remove efeito brusco
            },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
              fontSize: "0.85rem", // label menor
              "&.Mui-focused": {
                color: "white",
                fontSize: "0.75rem",
              },
            },
          }}
        />

        <TextField
          label="Descrição do item"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px rgba(0,0,0,0.8) inset", // mantém o fundo escuro
              WebkitTextFillColor: "white", // mantém texto branco
              transition: "background-color 5000s ease-in-out 0s", // remove efeito brusco
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
        <span className="text-white font-semibold mt-2">ÍCONE DO ITEM</span>
        <div className="flex gap-2 mt-2">
          {imageOptions.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectImage(img)}
              className={`p-1 rounded cursor-pointer transition border-2 ${
                formData.image === img
                  ? "border-red-500"
                  : "border-transparent hover:border-white/40"
              }`}
            >
              <img
                src={img}
                alt={`Opção ${idx + 1}`}
                className="h-16 w-16 object-cover"
              />
            </div>
          ))}
        </div>
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

export default CreateItemModal;
