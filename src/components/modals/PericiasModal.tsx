import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Save, X } from "lucide-react";


interface PlayerRelics {
  [key: string]: number;
}

interface PericiasModalProps {
  open: boolean;
  onClose: () => void;
  relics: PlayerRelics | null;
  onSave: (data: Record<string, number>) => Promise<void>;
}

const PericiasModal: React.FC<PericiasModalProps> = ({ open, onClose, relics, onSave }) => {

  const periciasBase: Record<string, string> = {
    autopsy: "Autópsia",
    medicine: "Medicina",
    investigation: "Investigação",
    hacking: "Hacking",
    electronics: "Eletrônica",
    science: "Ciência",
    linguistics: "Linguísticas",
    programming: "Programação",
    aiAnalysis: "Análise de IA",
    digitalMemory: "Memória Digital",
    negotiation: "Negociação",
    intimidation: "Intimidação",
    persuasion: "Persuasão",
    deception: "Enganação",
    empathy: "Empatia",
    leadership: "Liderança",
    stealth: "Furtividade",
    lockpicking: "Arrombamento",
    theft: "Roubo",
    disguise: "Disfarce",
    counterSurveillance: "Contra Vigilância",
    meleeCombat: "Corpo a Corpo",
    firearms: "Armas de Fogo",
    heavyWeapons: "Armas Pesadas",
    throwing: "Arremesso",
    piloting: "Pilotagem",
    acrobatics: "Acrobacia",
    physicalResistance: "Resistência Física",
    streetwise: "Cultura de Rua",
    urbanSurvival: "Sobrevivência Urbana",
    tactics: "Táticas",
    droneControl: "Controle de Drones",
    implantsModification: "Mod. de Implantes",
    explosives: "Explosivos",
  };

  const [pericias, setPericias] = useState<Record<string, number>>(
    Object.keys(periciasBase).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  useEffect(() => {
    if (!relics) return;

    setPericias((prev) => {
      const updated = { ...prev };
      
      Object.keys(periciasBase).forEach((key) => {
        updated[key] = relics[key] ?? 0;
      });
      
      return updated;
    });
  }, [relics, open]);




  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgb(255 255 255 / 12%)",
          backdropFilter: "blur(7px)",
          border: "1px solid rgba(117, 255, 255, 0.3)",
          borderLeft: "18px solid #ff003c",
          borderRadius: 0,
          p: 3,
          clipPath: "polygon(4% 0, 100% 0, 100% 0%, 100% 100%, 4% 100%, 0 95%, 0 6%)",
          boxShadow: "inset -2px 0px 25px 0px rgb(94 246 255 / 30%)"
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2,
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgb(0 0 0 / 30%)',
          backdropFilter: 'blur(7px)',
          zIndex: 10,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#ffeb00", fontFamily: "Rajdhani", paddingLeft: 1 }}
        >
          PERÍCIAS
        </Typography>
        <Box
          sx={{

          }}
        >
          <IconButton
            color="primary"
            onClick={async () => {
              await onSave(pericias);
              onClose();
            }}
          >
            <Save />
          </IconButton>
          <IconButton onClick={onClose} color="primary">
              <X />
          </IconButton>
        </Box>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >

        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns= {{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: 'center'
          }}
          className="form-pericias"
        >
           {Object.entries(periciasBase).map(([key, label]) => (
            <Grid key={key} size={{ xs: 2, sm: 4, md: 4 }}>
              <TextField
                label={label}
                type="number"
                value={pericias[key]}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(100, Number(e.target.value)));
                  setPericias({
                    ...pericias,
                    [key]: value,
                  });
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
