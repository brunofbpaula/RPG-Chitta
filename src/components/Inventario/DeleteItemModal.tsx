import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";

interface DeleteItemModalProps {
  open: boolean;
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteItemModal = ({
  open,
  itemName,
  onClose,
  onConfirm,
}: DeleteItemModalProps) => {
  if (!open) return null;

  return (

    <Dialog open={open} onClose={onClose} className="modal-custom modal-action" maxWidth="xs"  onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <DialogTitle fontSize={"1.25rem"} fontFamily={"Rajdhani"} sx={{ color: "rgb(0 255 255)", padding: 0 }}>
          CONFIRMAR EXCLUSÃO       
        </DialogTitle>
      </Box>

      <Typography
        variant="h6"
        fontWeight="lighter"
        sx={{ color: "#ffffff", fontFamily: "Rajdhani"}}
      >
        Você tem certeza que deseja excluir{" "}
        <strong>{itemName}</strong>?
      </Typography>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "white",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained" color="primary"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemModal;
