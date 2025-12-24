import { useEffect, useState } from "react";
import {
  Dialog,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Fingerprint, Save, SquarePen, X } from "lucide-react";
import { IPlayer } from "@/types";

interface EuModalProps {
  open: boolean;
  onClose: () => void;
  player: IPlayer;
  onSave: (data: Record<string, number>) => Promise<void>;
}

const EuModal: React.FC<EuModalProps> = ({ open, onClose, player, onSave }) => {
  const [editarDados, setEditarDados] = useState(false);
  const [dadosEditaveis, setDadosEditaveis] = useState<IPlayer>(player);

  useEffect(() => {
  setDadosEditaveis(player);
  }, [player, open]);

  const atributos = {
    strength: {
      label: "Força",
      icone: "/src/assets/icons/icon-atributo-forca.svg",
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
    agility: {
      label: "Agilidade",
      icone: "/src/assets/icons/icon-atributo-agilidade.svg",
    },
    currentHealth: {
      label: "Vida Atual",
      icone: "/src/assets/icons/icon-atributo-forca.svg",
    },
    maxHealth: {
      label: "Vida Máxima",
      icone: "/src/assets/icons/icon-atributo-forca.svg",
    },

  }
  
  const handleSalvar = async () => {
    const payload: Record<string, number> = {
      cyberpsychosis: dadosEditaveis.cyberpsychosis,
      strength: dadosEditaveis.strength,
      agility: dadosEditaveis.agility,
      intelligence: dadosEditaveis.intelligence,
      moral: dadosEditaveis.moral,
      resilience: dadosEditaveis.resilience,
      currentHealth: dadosEditaveis.currentHealth,
      maxHealth: dadosEditaveis.maxHealth,
    };

    await onSave(payload);
    setEditarDados(false);
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
          maxWidth: "500px",
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
        <Tooltip title={editarDados ? "Salvar" : "Editar dados"}>
          <IconButton
            color="primary"
            onClick={editarDados ? handleSalvar : () => setEditarDados(true)}
          >
            {editarDados ? <Save /> : <SquarePen />}
          </IconButton>
        </Tooltip>
        <IconButton onClick={onClose} color="primary">
            <X />
        </IconButton>
      </div>

      {/* DADOS */}
      <div className="box-meus-dados">
        {/* NOME */}
        <div className="box-meu-dado">
          <p className="label-dado">NOME</p>
          <TextField
            className="valor-dado"
            variant="standard"
            value={player.name}
            color="primary"
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
        </div>

        {/* IDADE */}
        <div className="box-meu-dado">
          <p className="label-dado">IDADE</p>
          <TextField
            className="valor-dado"
            variant="standard"
            type="number"
            value={player.age}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
        </div>

        {/* CYBERPSICOSE */}
        <div className="box-meu-dado">
          <p className="label-dado">CYBERPSICOSE</p>
          <TextField
            className="valor-dado"
            variant="standard"
            type="number"
            value={dadosEditaveis.cyberpsychosis}
            onChange={(e) =>
              setDadosEditaveis({
                ...dadosEditaveis,
                cyberpsychosis: Number(e.target.value),
              })
            }
            InputProps={{
              readOnly: !editarDados,
              disableUnderline: !editarDados,
            }}
          />
        </div>

        {/* ATRIBUTOS */}
        <div className="box-meu-dado">
          <p className="label-dado">ATRIBUTOS</p>

          {Object.entries(atributos).map(([key, atributo]) => (
            <p className="valor-dado">
            <img
              className="svg icon-atributo"
              src={atributo.icone}
              alt="ícone de força"
            />
            <TextField
              className="valor-atributo"
              variant="standard"
              type="number"
              value={dadosEditaveis[key as keyof IPlayer]}
              onChange={(e) =>
                setDadosEditaveis({
                  ...dadosEditaveis,
                  [key]: Number(e.target.value),
                })
              }
              InputProps={{
                readOnly: !editarDados,
                disableUnderline: !editarDados,
              }}
            />
            <span>{atributo.label}</span>
          </p>
          ))}
          
        </div>

        {/* ÍCONE DE FUNDO */}
        <div className="icon-bg">
          <Fingerprint />
        </div>
      </div>
    </Dialog>
  );
};

export default EuModal;
