import React, { useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fingerprint, Save, SquarePen, X } from "lucide-react";

interface EuModalProps {
  open: boolean;
  onClose: () => void;
  playerId: string;
}

type Atributos = {
  forca: number;
  inteligencia: number;
  moral: number;
  resiliencia: number;
  agilidade: number;
  vida_maxima: number;
};

const ATRIBUTOS_CONFIG: Record<
  keyof Atributos,
  { label: string; icone: string }
> = {
  forca: { label: "Força", icone: "/src/assets/icons/icon-atributo-forca.svg" },
  inteligencia: {
    label: "Inteligência",
    icone: "/src/assets/icons/icon-atributo-inteligencia.svg",
  },
  moral: { label: "Moral", icone: "/src/assets/icons/icon-atributo-moral.svg" },
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
};

const EuModal: React.FC<EuModalProps> = ({ open, onClose }) => {
  const [editarDados, setEditarDados] = useState(false);

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
      vida_maxima: 100,
    },
  });

  /** ESTADO CRÍTICO */
  const cyberColapso = dados.cyberpsicose >= 100;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: "relative",
          backgroundColor: "rgb(0 0 0 / 30%)",
          borderLeft: "18px solid #ff003c",
          borderRadius: 0,
          p: 3,
          clipPath:
            "polygon(4% 0, 100% 0, 100% 0%, 100% 100%, 4% 100%, 0 95%, 0 6%)",
          boxShadow: "inset -2px 0px 25px -11px rgb(94 246 255)",

          ...(cyberColapso && {
            animation: "glitchContainer 0.35s infinite",
            filter:
              "drop-shadow(-2px 0 red) drop-shadow(2px 0 cyan)",
          }),

          "@keyframes glitchContainer": {
            "0%": { transform: "translate(0)" },
            "20%": { transform: "translate(-2px, 1px)" },
            "40%": { transform: "translate(2px, -1px)" },
            "60%": { transform: "translate(-1px, 0)" },
            "80%": { transform: "translate(1px, 1px)" },
            "100%": { transform: "translate(0)" },
          },

          "&::after": cyberColapso
            ? {
                content: '""',
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.06) 3px)",
                mixBlendMode: "overlay",
              }
            : {},
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        sx={
          cyberColapso
            ? {
                animation: "glitchHeader 0.25s infinite",
                "@keyframes glitchHeader": {
                  "0%": { transform: "translateX(0)" },
                  "50%": { transform: "translateX(-1px)" },
                  "100%": { transform: "translateX(0)" },
                },
              }
            : {}
        }
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#fff", fontFamily: "Rajdhani" }}
        >
          Identidade
        </Typography>

        <Box display="flex" gap={1}>
          <Tooltip title={editarDados ? "Salvar" : "Editar dados"}>
            <IconButton
              onClick={() => setEditarDados(!editarDados)}
              sx={{ color: "#fff" }}
            >
              {editarDados ? <Save /> : <SquarePen />}
            </IconButton>
          </Tooltip>

          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <X />
          </IconButton>
        </Box>
      </Box>

      {/* DADOS BÁSICOS */}
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        mb={3}
      >
        <TextField
          label="Nome"
          variant="standard"
          value={dados.nome}
          onChange={(e) =>
            setDados((prev) => ({ ...prev, nome: e.target.value }))
          }
        />

        <TextField
          label="Idade"
          variant="standard"
          type="number"
          value={dados.idade}
          onChange={(e) =>
            setDados((prev) => ({
              ...prev,
              idade: Number(e.target.value),
            }))
          }
        />

        {/* CYBERPSICOSE */}
        <Box gridColumn="1 / -1">
          <Typography
            variant="caption"
            sx={{ color: "#75ffff", fontFamily: "Rajdhani", fontSize: "1.25rem" }}
          >
            Cyberpsicose
          </Typography>

          <Slider
            value={dados.cyberpsicose}
            min={0}
            max={100}
            step={1}
            onChange={(_, value) =>
              setDados((prev) => ({
                ...prev,
                cyberpsicose: value as number,
              }))
            }
            sx={{
              mt: 1,
              color: cyberColapso ? "#ff0033" : "#ff003c",
              "& .MuiSlider-thumb": {
                boxShadow: cyberColapso
                  ? "0 0 25px rgba(255,0,80,1)"
                  : "0 0 10px rgba(197,0,60,0.8)",
              },
              "& .MuiSlider-track": {
                boxShadow: cyberColapso
                  ? "0 0 20px rgba(255,0,80,0.9)"
                  : "0 0 8px rgba(197,0,60,0.6)",
              },
            }}
          />
        </Box>
      </Box>

      {/* ATRIBUTOS */}
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={1}
        sx={{ color: "#fff", fontFamily: "Rajdhani" }}
      >
        Atributos
      </Typography>

      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
      >
        {(Object.keys(ATRIBUTOS_CONFIG) as (keyof Atributos)[]).map((key) => {
          const atributo = ATRIBUTOS_CONFIG[key];

          return (
            <Box key={key} display="flex" alignItems="center" gap={1}>
              <img src={atributo.icone} alt={atributo.label} width={24} />

              <TextField
                label={atributo.label}
                variant="standard"
                type="number"
                value={dados.atributos[key]}
                onChange={(e) =>
                  setDados((prev) => ({
                    ...prev,
                    atributos: {
                      ...prev.atributos,
                      [key]: Number(e.target.value),
                    },
                  }))
                }
                fullWidth
              />
            </Box>
          );
        })}
      </Box>

      {/* ÍCONE DECORATIVO */}
      <Box
        position="absolute"
        bottom={16}
        right={16}
        opacity={0.1}
        zIndex={-1}
      >
        <Fingerprint size={80} color="rgba(255,255,255,0.2)" />
      </Box>
    </Dialog>
  );
};

export default EuModal;
