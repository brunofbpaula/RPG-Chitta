import { useState } from "react";
import {
  Dialog,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Fingerprint, Save, SquarePen, X } from "lucide-react";

interface EuModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const EuModal: React.FC<EuModalProps> = ({ open, onClose, playerId }) => {
  const [editarDados, setEditarDados] = useState(false);
  const atributos = {
    forca: {
      label: "Força",
      icone: "/src/assets/icons/icon-atributo-forca.svg",
    },
    inteligencia: {
      label: "Inteligência",
      icone: "/src/assets/icons/icon-atributo-inteligencia.svg",
    },
    moral: {
      label: "Moral",
      icone: "/src/assets/icons/icon-atributo-moral.svg",
    },
    resiliencia: {
      label: "Resiliência",
      icone: "/src/assets/icons/icon-atributo-resiliencia.svg",
    },
    agilidade: {
      label: "Agilidade",
      icone: "/src/assets/icons/icon-atributo-agilidade.svg",
    },
    vida_maxima: {
      label: "Vida Máxima",
      icone: "/src/assets/icons/icon-atributo-forca.svg",
    },

  }
  const [dados, setDados] = useState({
    nome: "JOGADOR",
    idade: 21,
    cyberpsicose: 0,
    atributos: {
      forca: 0,
      inteligencia: 0,
      moral: 0,
      resiliencia: 0,
      agilidade: 0,
      vida_maxima: 100
    },
  });

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
          <IconButton onClick={() => setEditarDados(!editarDados)} color="primary">
            { editarDados ?  <Save /> : <SquarePen />}
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
            value={dados.nome}
            onChange={(e) =>
              setDados({ ...dados, nome: e.target.value })
            }
            InputProps={{
              readOnly: !editarDados,
              disableUnderline: !editarDados,
            }}
            color="primary"
          />
        </div>

        {/* IDADE */}
        <div className="box-meu-dado">
          <p className="label-dado">IDADE</p>
          <TextField
            className="valor-dado"
            variant="standard"
            type="number"
            value={dados.idade}
            onChange={(e) =>
              setDados({ ...dados, idade: Number(e.target.value) })
            }
            InputProps={{
              readOnly: !editarDados,
              disableUnderline: !editarDados,
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
            value={dados.cyberpsicose}
            onChange={(e) =>
              setDados({
                ...dados,
                cyberpsicose: Number(e.target.value),
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
              value={dados.atributos.forca}
              onChange={(e) =>
                setDados({
                  ...dados,
                  atributos: {
                    ...dados.atributos,
                    [key]: Number(e.target.value),
                  },
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
