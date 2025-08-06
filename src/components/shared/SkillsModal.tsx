import { useState } from "react";
import heart from '@/assets/images/heart.png';

// Define os tipos de chave das perícias
type SkillKey =
  | "autopsy" | "medicine" | "investigation" | "hacking" | "electronics"
  | "science" | "linguistics" | "programming" | "aiAnalysis" | "digitalMemory"
  | "negotiation" | "intimidation" | "persuasion" | "deception" | "empathy"
  | "leadership" | "stealth" | "lockpicking" | "theft" | "disguise"
  | "counterSurveillance" | "meleeCombat" | "firearms" | "heavyWeapons"
  | "throwing" | "piloting" | "acrobatics" | "physicalResistance"
  | "streetwise" | "survival" | "tactics" | "droneControl"
  | "implantsModification" | "explosives";

export default function Skills() {
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
    acrobatics: "Acrobácia",
    physicalResistance: "Resistência Física",
    streetwise: "Cultura de Rua",
    survival: "Sobrevivência Urbana",
    tactics: "Tática",
    droneControl: "Controle de Drones",
    implantsModification: "Mod. de Implantes",
    explosives: "Explosivos",
  };

  const initialAttributes: Record<SkillKey, number> = Object.keys(skillLabels).reduce((acc, key) => {
    acc[key as SkillKey] = 0;
    return acc;
  }, {} as Record<SkillKey, number>);

  const [attributes, setAttributes] = useState(initialAttributes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttributes({ ...attributes, [name]: Number(value) });
  };

  return (
   <div className="pd-20 flex justify-center items-center">
      <div
        style={{
          padding: "10px 20px",
          background: "#060606",
          color: "white",
          borderBottom: "3px solid #f50a1c",
          borderTop: "3px solid #f50a1c",
          borderRadius: "8px",
          userSelect: "none",
          fontWeight: "bold",
          fontSize: "16px",
          width: "80%",
          maxWidth: "80%",
          height: "185px",
          marginBottom: "30px",
          display: "flex",   
          flexDirection: "column",   
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        Perícias
        <img
          src={heart}
          alt="heart"
          onClick={() => setIsModalOpen(true)}
          style={{
            cursor: "pointer",
            maxWidth: "120px",
            maxHeight: "120px",
            marginTop: "20px",
          }}
        />
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "#000",
              padding: "30px",
              borderRadius: "12px",
              width: "80%",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflow: "hidden",
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              borderBottom: "3px solid #f50a1c",
              borderTop: "3px solid #f50a1c",
              borderLeft: "none"
            }}
          >
            <h3 className="skills-title" style={{ marginBottom: "16px" }}>Perícias</h3>

            <div style={{ overflowY: "auto", paddingRight: "6px" }} className="skills-scrollbar">
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px"
              }}>
                {Object.entries(attributes).map(([key, value]) => (
                  <label
                    key={key}
                    style={{
                      flex: "1 1 calc(33.333% - 20px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>
                      {skillLabels[key as SkillKey]}
                    </span>
                    <input
                      type="number"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      min={0}
                      max={100}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "2px solid #fff",
                        backgroundColor: "#111",
                        color: "#fff",
                        width: "100%",
                        maxWidth: "170px",
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid #fff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
