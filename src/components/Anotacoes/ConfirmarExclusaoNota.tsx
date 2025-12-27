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
      title="EXCLUIR ANOTAÇÃO"
      description={`Você tem certeza que deseja excluir "${title}"?`}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
