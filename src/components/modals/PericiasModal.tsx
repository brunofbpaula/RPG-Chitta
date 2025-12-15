import { useState } from "react";
import {
  Dialog,
} from "@mui/material";


interface PericiasModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const PericiasModal: React.FC<PericiasModalProps> = ({ open, onClose, playerId }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#C5003C",
          border: "1px solid #C5003C",
          borderRadius: "0",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
        },
      }}
      BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
          }
        }}
    >

    </Dialog>
  );
};

export default PericiasModal;
