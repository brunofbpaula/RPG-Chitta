import { ConfirmarExclusaoBase } from "../ui/ConfirmarExclusaoBase";

interface Props {
  open: boolean;
  titulo: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmarExclusaoNota({
  open,
  titulo,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <ConfirmarExclusaoBase
      open={open}
      title="Excluir anotação"
      description={`Deseja excluir a anotação "${titulo}"?`}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
