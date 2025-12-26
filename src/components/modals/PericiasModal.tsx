import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Grid,
  IconButton,
  TextField,
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
           {Object.entries(periciasBase).map(([key, label]) => (
            <Grid key={key}>
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
      <IconButton
        color="primary"
        onClick={async () => {
          await onSave(pericias);
          onClose();
        }}
      >
        <Save />
    </IconButton>

    </Dialog>
  );
};

export default PericiasModal;
