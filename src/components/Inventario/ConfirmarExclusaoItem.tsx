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
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmarExclusaoItem({
  open,
  description,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1}>
            <Trash2 size={20} />
            <Typography fontWeight={600}>Excluir item</Typography>
          </Box>
          <IconButton onClick={onCancel}>
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
