import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { X } from "lucide-react";

const imageOptions = [
  "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6935fa250029c4948262/view?project=67d9eaea00378fb3eb2f&mode=admin",
  "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6935f7d80039bf21e491/view?project=67d9eaea00378fb3eb2f&mode=admin",
  "https://fra.cloud.appwrite.io/v1/storage/buckets/67e997fe001920450224/files/6935f9e60019e281e50e/view?project=67d9eaea00378fb3eb2f&mode=admin",
];

interface CreateItemModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (item: {
    name: string;
    description: string;
    image: string;
  }) => void;
}

const CreateItemModal = ({ open, onClose, onCreate }: CreateItemModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.image) {
      alert("Preencha todos os campos!");
      return;
    }

    onCreate(formData);

    setFormData({ name: "", description: "", image: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="modal-custom">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <DialogTitle fontSize={"1.25rem"} fontFamily={"Rajdhani"} sx={{ color: "rgb(0 255 255)", padding: 0 }}>
          ADICIONAR ITEM        
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ color: "rgb(0 255 255)" }}>
          <X />
        </IconButton>
      </Box>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2, px: 0 }}>
        <TextField
          label="Nome do Item"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          variant="standard"
          size="small"
        />

        <TextField
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          variant="standard"
          size="small"
        />

        <div className="flex gap-2">
          {imageOptions.map((img) => (
            <img
              key={img}
              src={img}
              onClick={() => setFormData({ ...formData, image: img })}
              className={`h-16 w-16 cursor-pointer border ${
                formData.image === img ? "border-red-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#fff"}}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateItemModal;
