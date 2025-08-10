import React, { useState, useEffect } from "react";
import heart from '@/assets/images/heart.png';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { getPlayerRelics, updateRelics } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import Loader from "./Loader";

type RelicType = {
  $id: string;
  name?: string;
  [key: string]: any;
};

type SkillKey =
  | "autopsy" | "medicine" | "investigation" | "hacking" | "electronics"
  | "science" | "linguistics" | "programming" | "aiAnalysis" | "digitalMemory"
  | "negotiation" | "intimidation" | "persuasion" | "deception" | "empathy"
  | "leadership" | "stealth" | "lockpicking" | "theft" | "disguise"
  | "counterSurveillance" | "meleeCombat" | "firearms" | "heavyWeapons"
  | "throwing" | "piloting" | "acrobatics" | "physicalResistance"
  | "streetwise" | "urbanSurvival" | "tactics" | "droneControl"
  | "implantsModification" | "explosives";

const skillLabels: Record<SkillKey, string> = {
  autopsy: "Autópsia",
  medicine: "Medicina",
  investigation: "Investigação",
  hacking: "Hacking",
  electronics: "Eletrônica",
  science: "Ciência",
  linguistics: "Linguística",
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
  counterSurveillance: "Contra-vigilância",
  meleeCombat: "Corpo a Corpo",
  firearms: "Armas de Fogo",
  heavyWeapons: "Armas Pesadas",
  throwing: "Arremesso",
  piloting: "Pilotagem",
  acrobatics: "Acrobacia",
  physicalResistance: "Resistência Física",
  streetwise: "Cultura de Rua",
  urbanSurvival: "Sobrevivência Urbana",
  tactics: "Tática",
  droneControl: "Controle de Drones",
  implantsModification: "Mod. de Implantes",
  explosives: "Explosivos",
};

export default function Skills() {
  const initialAttributes: Record<SkillKey, number> = Object.keys(skillLabels).reduce((acc, key) => {
    acc[key as SkillKey] = 0;
    return acc;
  }, {} as Record<SkillKey, number>);

  const { data: currentUser } = useGetCurrentUser();
  const [attributes, setAttributes] = useState(initialAttributes);
  const [relics, setRelics] = useState<RelicType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    async function loadRelics() {
      setLoading(true);
      try {
        const relicData = currentUser!.relics;
        const filteredRelics: Partial<Record<SkillKey, number>> = Object.keys(skillLabels).reduce(
          (acc, key) => {
            acc[key as SkillKey] = relicData[key] ?? 0;
            return acc;
          },
          {} as Partial<Record<SkillKey, number>>
        );

        setRelics(currentUser!.relics);
        setAttributes(filteredRelics as Record<SkillKey, number>);

      } catch (err) {
        console.error("Erro ao carregar relics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRelics();
  }, [currentUser]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = Number(value);
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    setAttributes({ ...attributes, [name]: val });
  };

  const handleSave = async () => {
    if (!relics) return;
    setSaving(true);
    try {
      const relicData: Record<string, number> = {};
      Object.entries(attributes).forEach(([key, value]) => {
        relicData[key] = value;
      });        
      await updateRelics(relics.$id, relicData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pd-20 flex justify-center items-center flex-col">
      <div
        onClick={openModal}
        style={{
          cursor: "pointer",
          padding: "10px 20px",
          background: "#060606",
          color: "white",
          border: "3px solid #f50a1c",
          borderRadius: "8px",
          userSelect: "none",
          fontWeight: "bold",
          fontSize: "16px",
          width: "80%",
          maxWidth: "600px",
          height: "185px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
      {
        currentUser ? (
          <>
            Perícias
            <img
              src={heart}
              alt="heart"
              style={{
                maxWidth: "120px",
                maxHeight: "120px",
                marginTop: "20px",
              }}
            />
          </>
        ) : (
        <div className='flex items-center justify-center h-full'>
          <Loader size={40}/>
        </div>
        )
      }
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#000",
            color: "#fff",
            border: "3px solid #f50a1c",
            borderRadius: 2,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          PERÍCIAS
        </DialogTitle>
        <DialogContent
          dividers
          className="skills-scrollbar"
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            backgroundColor: "#000",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "840px",
                  margin: "0 auto",
                }}
              >
                {Object.entries(attributes).map(([key, value]) => (
                  <Grid key={key}>
                    <TextField
                      label={skillLabels[key as SkillKey]}
                      name={key}
                      type="number"
                      fullWidth
                      style={{width: "250px"}}
                      value={value}
                      onChange={handleChange}
                      inputProps={{ min: 0, max: 100 }}
                      disabled={saving}
                      sx={{
                        color: "white",
                        "& .MuiInputBase-input": { color: "#fff",  WebkitTextFillColor: "#fff" },
                        "& .MuiInputLabel-root": { 
                          color: "#fff", 
                          fontSize: "16px",
                          fontWeight: "500"
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#fff", color: "#fff" },
                          "&:hover fieldset": { borderColor: "red", color: "#fff" },
                          "&.Mui-focused fieldset": { borderColor: "red", color: "#fff" },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

            </>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "#000", px: 2, py: 1 }}>
          <Button
            onClick={() => setIsModalOpen(false)}
            disabled={saving}
            style={{
                backgroundColor: '#333',
                color: '#fff',
                width: "150px",
                maxWidth: "150px",
                border: 'none',
                borderRadius: '6px',
                cursor: saving ? 'default' : 'pointer',
              }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            variant="contained"
            sx={{
              width: "150px",
              maxWidth: "150px",
              backgroundColor: "#f50a1c",
              "&:hover": { backgroundColor: "#d90d1b" },
            }}
          >
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
