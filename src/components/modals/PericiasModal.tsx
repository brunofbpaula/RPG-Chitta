import { useState } from "react";
import {
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { X } from "lucide-react";


interface PericiasModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

const PericiasModal: React.FC<PericiasModalProps> = ({ open, onClose, playerId }) => {
  const [pericias] = useState({
    medicina: {
      label: 'Medicina',
      valor: 0
    },
    investigacao: {
      label: 'Investigação',
      valor: 0
    },
    hacking: {
      label: 'Hacking',
      valor: 0
    },
    eletronica: {
      label: 'Eletrônica',
      valor: 0
    },
    ciencia: {
      label: 'Ciência',
      valor: 0
    },
    linguisticas: {
      label: 'Linguísticas',
      valor: 0
    },
    programacao: {
      label: 'Programação',
      valor: 0
    },
    analise_de_ia: {
      label: 'Análise de IA',
      valor: 0
    },
    memoria_digital: {
      label: 'Memoria Digital',
      valor: 0
    },
    negociacao: {
      label: 'Negociação',
      valor: 0
    },
    intimidacao: {
      label: 'Intimidação',
      valor: 0
    },
    persuacao: {
      label: 'Persuação',
      valor: 0
    },
    enganacao: {
      label: 'Enganação',
      valor: 0
    },
    empatia: {
      label: 'Empatia',
      valor: 0
    },
    lideranca: {
      label: 'Liderança',
      valor: 0
    },
    furtividade: {
      label: 'Furtividade',
      valor: 0
    },
    arrombamento: {
      label: 'Arrombamento',
      valor: 0
    },
    roubo: {
      label: 'Roubo',
      valor: 0
    },
    disfarce: {
      label: 'Disfarce',
      valor: 0
    },
    contra_vigilancia: {
      label: 'Contra Vigilância',
      valor: 0
    },
    corpo_a_corpo: {
      label: 'Corpo a Corpo',
      valor: 0
    },
    armas_de_fogo: {
      label: 'Armas de Fogo',
      valor: 0
    },
    armas_pesadas: {
      label: 'Armas Pesadas',
      valor: 0
    },
    arremesso: {
      label: 'Arremesso',
      valor: 0
    },
    pilotagem: {
      label: 'Pilotagem',
      valor: 0
    },
    acrobacia: {
      label: 'Acrobacia',
      valor: 0
    },
    resistencia_fisica: {
      label: 'Resistência Física',
      valor: 0
    },
    cultura_de_rua: {
      label: 'Cultura de Rua',
      valor: 0
    },
    sobrevivencia_urbana: {
      label: 'Sobrevivência Urbana',
      valor: 0
    },
    taticas: {
      label: 'Táticas',
      valor: 0
    },
    controle_de_drones: {
      label: 'Controle de Drones',
      valor: 0
    },
    mod_de_implantes: {
      label: 'Mod. de Implantes',
      valor: 0
    },
    explosivos: {
      label: 'Explosivos',
      valor: 0
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
          maxWidth: "800px",
          minHeight: '400px',
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
      <div className="topo-modal">
        <IconButton onClick={onClose} color="primary">
            <X />
        </IconButton>
      </div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >

        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns= {{ xs: 1, sm: 6, md: 4 }}
          sx={{
            justifyContent: 'center'
          }}
          className="form-pericias"
        >
          {Object.entries(pericias).map(([key, pericia]) => (
            <Grid>
            <TextField
              id={key + "Input"}
              label={pericia.label}
              value={pericia.valor}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.target.value;
              }}
              fullWidth
              size="small"
            />
          </Grid>
          ))}
          
          
        </Grid>
        
      </Box>


    </Dialog>
  );
};

export default PericiasModal;
