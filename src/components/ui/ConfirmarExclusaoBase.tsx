import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Trash2, X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmarExclusaoBase({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth className="modal-custom modal-action">
      <DialogTitle sx={{ padding: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1} alignItems="center">
            <Typography fontSize={"1.25rem"} fontFamily={"Rajdhani"} sx={{ color: "rgb(0 255 255)", padding: 0 }}>{title}</Typography>
          </Box>

          <IconButton onClick={onCancel}>
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ paddingLeft: 0 }}>
        <Typography fontFamily={"Rajdhani"} sx={{ color: "#ffffff" }}>{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} sx={{ color: "#ffffff" }}>Cancelar</Button>
        <Button color="primary" variant="contained" onClick={onConfirm}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
