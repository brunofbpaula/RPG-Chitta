import React, { useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

interface PericiasModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

type Pericia = {
  label: string;
  valor: number;
};

type PericiasState = Record<string, Pericia>;

const PericiasModal: React.FC<PericiasModalProps> = ({
  open,
  onClose,
  playerId,
}) => {
  const [pericias, setPericias] = useState<PericiasState>({
    medicina: { label: "Medicina", valor: 0 },
    investigacao: { label: "Investigação", valor: 0 },
    hacking: { label: "Hacking", valor: 0 },
    eletronica: { label: "Eletrônica", valor: 0 },
    ciencia: { label: "Ciência", valor: 0 },
    linguisticas: { label: "Linguísticas", valor: 0 },
    programacao: { label: "Programação", valor: 0 },
    analise_de_ia: { label: "Análise de IA", valor: 0 },
    memoria_digital: { label: "Memória Digital", valor: 0 },
    negociacao: { label: "Negociação", valor: 0 },
    intimidacao: { label: "Intimidação", valor: 0 },
    persuacao: { label: "Persuasão", valor: 0 },
    enganacao: { label: "Enganação", valor: 0 },
    empatia: { label: "Empatia", valor: 0 },
    lideranca: { label: "Liderança", valor: 0 },
    furtividade: { label: "Furtividade", valor: 0 },
    arrombamento: { label: "Arrombamento", valor: 0 },
    roubo: { label: "Roubo", valor: 0 },
    disfarce: { label: "Disfarce", valor: 0 },
    contra_vigilancia: { label: "Contra Vigilância", valor: 0 },
    corpo_a_corpo: { label: "Corpo a Corpo", valor: 0 },
    armas_de_fogo: { label: "Armas de Fogo", valor: 0 },
    armas_pesadas: { label: "Armas Pesadas", valor: 0 },
    arremesso: { label: "Arremesso", valor: 0 },
    pilotagem: { label: "Pilotagem", valor: 0 },
    acrobacia: { label: "Acrobacia", valor: 0 },
    resistencia_fisica: { label: "Resistência Física", valor: 0 },
    cultura_de_rua: { label: "Cultura de Rua", valor: 0 },
    sobrevivencia_urbana: { label: "Sobrevivência Urbana", valor: 0 },
    taticas: { label: "Táticas", valor: 0 },
    controle_de_drones: { label: "Controle de Drones", valor: 0 },
    mod_de_implantes: { label: "Mod. de Implantes", valor: 0 },
    explosivos: { label: "Explosivos", valor: 0 },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgb(0 0 0 / 30%)",
          backdropFilter: "blur(7px)",
          borderLeft: "18px solid #C5003C",
          borderRadius: 0,
          p: 3,
          clipPath: "polygon(4% 0, 100% 0, 100% 0%, 100% 100%, 4% 100%, 0 95%, 0 6%)",
          boxShadow: "inset -2px 0px 25px -11px rgb(94 246 255)"
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Perícias
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "rgb(255 255 255)" }}>
          <X />
        </IconButton>
      </Box>

      {/* Grid moderno */}
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        {Object.entries(pericias).map(([key, pericia]) => (
          <TextField
            key={key}
            label={pericia.label}
            type="number"
            value={pericia.valor}
            onChange={(e) => {
              const valor = Number(e.target.value);

              setPericias((prev) => ({
                ...prev,
                [key]: {
                  ...prev[key],
                  valor,
                },
              }));
            }}
            size="small"
            fullWidth
          />
        ))}
      </Box>
    </Dialog>
  );
};

export default PericiasModal;
