import { ConfirmarExclusaoBase } from "../ui/ConfirmarExclusaoBase";

interface Props {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmarExclusaoNota({
  open,
  title,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <ConfirmarExclusaoBase
      open={open}
      title="Delete note"
      description={`Do you want to delete the note "${title}"?`}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
