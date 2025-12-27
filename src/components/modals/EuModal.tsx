import { useEffect, useState } from "react";
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



  /** ESTADO CRÍTICO */
  const cyberColapso = player.cyberpsychosis >= 100 && dadosEditaveis.cyberpsychosis === 100;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: "relative",
          backgroundColor: "rgb(255 255 255 / 12%)",
          border: "1px solid rgba(117, 255, 255, 0.3)",
          borderLeft: "18px solid #ff003c",
          borderRadius: 0,
          p: 3,
          clipPath:
            "polygon(4% 0, 100% 0, 100% 0%, 100% 100%, 4% 100%, 0 95%, 0 6%)",
          boxShadow: "inset -2px 0px 25px 0px rgb(94 246 255 / 30%)",

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
            color="primary"
            onClick={editarDados ? handleSalvar : () => setEditarDados(true)}
          >
            {editarDados ? <Save /> : <SquarePen />}
          </IconButton>
        </Tooltip>
        <IconButton onClick={onClose} color="primary">
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
          value={player.name}
          color="primary"
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
        />

        <TextField
          label="Idade"
          variant="standard"
          type="number"
          value={player.age}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
        />

        {/* CYBERPSICOSE */}
        <Box gridColumn="1 / -1">
          <Typography
            variant="caption"
            sx={{ color: "#75ffff", fontFamily: "Rajdhani", fontSize: "1.25rem" }}
          >
            Cyberpsicose ({dadosEditaveis.cyberpsychosis}%)
          </Typography>

          <Slider
            value={dadosEditaveis.cyberpsychosis}
            min={0}
            max={100}
            step={1}
            disabled={!editarDados}
            onChange={(_, value) => {
              setDadosEditaveis({
                ...dadosEditaveis,
                cyberpsychosis: value as number,
              });
            }}
            
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
        {(Object.entries(atributos)).map(([key, atributo]) => {

          return (
            <Box key={key} display="flex" alignItems="center" gap={1}>
              <img src={atributo.icone} alt={atributo.label} width={24} />

              <TextField
                label={atributo.label}
                variant="standard"
                type="number"
                value={dadosEditaveis[key as keyof IPlayer]}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setDadosEditaveis((prev) => {
                    // Se estiver alterando vida atual
                    if (key === "currentHealth") {
                      return {
                        ...prev,
                        currentHealth: Math.min(value, prev.maxHealth),
                      };
                    }

                    // Se estiver alterando vida máxima
                    if (key === "maxHealth") {
                      return {
                        ...prev,
                        maxHealth: value,
                        currentHealth: Math.min(prev.currentHealth, value),
                      };
                    }

                    return {
                      ...prev,
                      [key]: value,
                    };
                  });
                }}
                InputProps={{
                  readOnly: !editarDados,
                  disableUnderline: !editarDados,
                }}
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
        zIndex={-1}
        sx={{ opacity: 0.1 }}
      >
        <Fingerprint size={80} color="rgba(255,255,255,0.2)" />
      </Box>
    </Dialog>
  );
};

export default EuModal;
