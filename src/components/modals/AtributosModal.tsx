import { useEffect, useState } from "react";
import {
  Dialog,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Save, SquarePen, X, Fingerprint } from "lucide-react";
import { IPlayer } from "@/types";

interface AtributosModalProps {
  open: boolean;
  onClose: () => void;
  user: IPlayer;
  onSave: (data: Record<string, number>) => Promise<void>;
}

const atributos = {
  strength: {
    label: "Força",
    icone: "/src/assets/icons/icon-atributo-forca.svg",
  },
  agility: {
    label: "Agilidade",
    icone: "/src/assets/icons/icon-atributo-agilidade.svg",
  },
  intelligence: {
    label: "Inteligência",
    icone: "/src/assets/icons/icon-atributo-inteligencia.svg",
  },
  moral: {
    label: "Moral",
    icone: "/src/assets/icons/icon-atributo-moral.svg",
  },
  resilience: {
    label: "Resiliência",
    icone: "/src/assets/icons/icon-atributo-resiliencia.svg",
  },
} as const;

type AtributoKey = keyof typeof atributos;

const AtributosModal: React.FC<AtributosModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [editar, setEditar] = useState(false);
  const [dados, setDados] = useState<Record<AtributoKey, number>>({
    strength: user.strength,
    agility: user.agility,
    intelligence: user.intelligence,
    moral: user.moral,
    resilience: user.resilience,
  });

  useEffect(() => {
    if (open) {
      setDados({
        strength: user.strength,
        agility: user.agility,
        intelligence: user.intelligence,
        moral: user.moral,
        resilience: user.resilience,
      });
      setEditar(false);
    }
  }, [open, user]);

  const handleSalvar = async () => {
    await onSave(dados);
    setEditar(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="modal-custom"
      PaperProps={{
        sx: {
          backgroundColor: "rgb(197 0 60)",
          border: "1px solid #C5003C",
          borderRadius: "0",
          padding: "20px",
          maxWidth: "420px",
          width: "100%",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      {/* TOPO */}
      <div className="topo-modal">
        <Tooltip title={editar ? "Salvar" : "Editar atributos"}>
          <IconButton
            color="primary"
            onClick={editar ? handleSalvar : () => setEditar(true)}
          >
            {editar ? <Save /> : <SquarePen />}
          </IconButton>
        </Tooltip>

        <IconButton onClick={onClose} color="primary">
          <X />
        </IconButton>
      </div>

      {/* ATRIBUTOS */}
      <div className="box-meus-dados">
        <div className="box-meu-dado">
        <p className="label-dado">ATRIBUTOS</p>

        <div className="lista-atributos">
            {Object.entries(atributos).map(([key, atributo]) => {
            const attrKey = key as AtributoKey;

            return (
                <div className="linha-atributo" key={key}>
                <img
                    className="svg icon-atributo"
                    src={atributo.icone}
                    alt={atributo.label}
                />

                <TextField
                    className="valor-atributo"
                    variant="standard"
                    type="number"
                    value={dados[attrKey]}
                    onChange={(e) =>
                    setDados({
                        ...dados,
                        [attrKey]: Number(e.target.value),
                    })
                    }
                    InputProps={{
                    readOnly: !editar,
                    disableUnderline: !editar,
                    }}
                />

                <span className="label-atributo-modal">
                    {atributo.label}
                </span>
                </div>
            );
            })}
        </div>
        </div>


        {/* ÍCONE DE FUNDO */}
        <div className="icon-bg">
          <Fingerprint />
        </div>
      </div>
    </Dialog>
  );
};

export default AtributosModal;
