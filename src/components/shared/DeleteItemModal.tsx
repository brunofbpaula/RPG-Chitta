import { Button } from "@mui/material";

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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border border-red-500 p-6 rounded-lg w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-red-500 font-bold text-lg mb-4">
          Confirmar exclusão
        </h2>

        <p className="text-white">
          Você tem certeza que deseja excluir{" "}
          <strong>{itemName}</strong>?
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
            onClick={onConfirm}
            sx={{
              backgroundColor: "#ef4444",
              color: "white",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: "#dc2626",
                boxShadow: "0 0 8px #ef4444",
              },
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
