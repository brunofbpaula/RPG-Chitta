import { useState } from "react";
import {
  Dialog,
  Divider,
  IconButton,
} from "@mui/material";
import { Fingerprint, SquarePen } from "lucide-react";


interface EuModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const EuModal: React.FC<EuModalProps> = ({ open, onClose, playerId }) => {

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
        <IconButton color="secondary" aria-label="add an alarm">
            <SquarePen />
        </IconButton>
        <div className="box-meus-dados">
            <div className="box-meu-dado">
                <p className="label-dado">NOME</p>
                <p className="valor-dado">JOGADOR</p>
            </div>
            <div className="box-meu-dado">
                <p className="label-dado">IDADE</p>
                <p className="valor-dado">21</p>
            </div>
            <div className="box-meu-dado">
                <p className="label-dado">CYBERPSICOSE</p>
                <p className="valor-dado">0</p>
            </div>
            <div className="box-meu-dado">
                <p className="label-dado">ATRIBUTOS</p>
                <p className="valor-dado">
                    <img className="svg icon-atributo" src="/src/assets/icons/icon-atributo-forca.svg" alt="ícone de força" />
                    <span className="number-atributo">0</span>
                    <span>FORÇA</span>
                </p>
                <p className="valor-dado">
                    <img className="svg icon-atributo" src="/src/assets/icons/icon-atributo-inteligencia.svg" alt="ícone de inteligencia" />
                    <span className="number-atributo">0</span>
                    <span>INTELIGÊNCIA</span>
                </p>
                <p className="valor-dado">
                    <img className="svg icon-atributo" src="/src/assets/icons/icon-atributo-moral.svg" alt="ícone de moral" />
                    <span className="number-atributo">0</span>
                    <span>MORAL</span>
                </p>
                <p className="valor-dado">
                    <img className="svg icon-atributo" src="/src/assets/icons/icon-atributo-resiliencia.svg" alt="ícone de moral" />
                    <span className="number-atributo">0</span>
                    <span>RESILIÊNCIA</span>
                </p>
                <p className="valor-dado">
                    <img className="svg icon-atributo" src="/src/assets/icons/icon-atributo-agilidade.svg" alt="ícone de moral" />
                    <span className="number-atributo">0</span>
                    <span>AGILIDADE</span>
                </p>
            </div>
            <Fingerprint />
        </div>

    </Dialog>
  );
};

export default EuModal;
