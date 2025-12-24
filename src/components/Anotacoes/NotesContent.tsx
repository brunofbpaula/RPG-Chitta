import { useState } from "react";
import { Nota } from "../../types";
import { NotesListHeader } from "./NotesListHeader";
import { NotesItem } from "./NotesItem";
import { NotesWindow } from "./NotesWindow";
import { NotesWindowHeader } from "./NotesWindowHeader";
import { ConfirmarExclusaoNota } from "./ConfirmarExclusaoNota";
import { Box } from "@mui/material";



export function NotesContent() {
  const [notas, setNotas] = useState<Nota[]>([
    {
      id: "1",
      titulo: "Ideias de projeto",
      conteudo: "Criar painel cyberpunk...",
      updatedAt: "2025-01-12",
    },
    {
      id: "2",
      titulo: "Checklist",
      conteudo: "Finalizar chat\nCriar notas",
      updatedAt: "2025-01-10",
    },
  ]);

  const [busca, setBusca] = useState("");
  const [notaAtiva, setNotaAtiva] = useState<Nota | null>(null);
  const [notaExcluir, setNotaExcluir] = useState<Nota | null>(null);

  const notasFiltradas = notas.filter((n) =>
    n.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function criarNovaNota() {
    const novaNota: Nota = {
      id: crypto.randomUUID(),
      titulo: "Nova anotação",
      conteudo: "",
      updatedAt: new Date().toISOString(),
    };

    setNotas((prev) => [novaNota, ...prev]);
    setNotaAtiva(novaNota);
  }

  function solicitarExclusao(nota: Nota) {
    setNotaExcluir(nota);
  }

  function confirmarExclusao() {
    if (!notaExcluir) return;

    setNotas((prev) =>
      prev.filter((n) => n.id !== notaExcluir.id)
    );

    if (notaAtiva?.id === notaExcluir.id) {
      setNotaAtiva(null);
    }

    setNotaExcluir(null);
  }

  return (
    <>
    <Box sx={{ background: "transparent)", height: "100%", display: "flex", flexDirection: "column" }}>
      {!notaAtiva ? (
        <NotesListHeader value={busca} onSearch={setBusca} onAdd={criarNovaNota} />
      ) : (
        <NotesWindowHeader
          nota={notaAtiva}
          onBack={() => setNotaAtiva(null)}
        />
      )}

        {!notaAtiva ? (
          notasFiltradas.map((nota) => (
      
            <NotesItem
              key={nota.id}
              nota={nota}
              onSelect={setNotaAtiva}
              onDelete={() => solicitarExclusao(nota)}
            />
          ))
        ) : (
          <NotesWindow
            nota={notaAtiva}
            onChange={(conteudo) => {
              // atualiza a nota ativa (para o editor funcionar)
              setNotaAtiva((prev) =>
                prev
                  ? {
                      ...prev,
                      conteudo,
                      updatedAt: new Date().toISOString(),
                    }
                  : prev
              );

              // sincroniza com a lista
              setNotas((prev) =>
                prev.map((n) =>
                  n.id === notaAtiva.id
                    ? {
                        ...n,
                        conteudo,
                        updatedAt: new Date().toISOString(),
                      }
                    : n
                )
              );
            }}
          />
        )}
      </Box>
      <ConfirmarExclusaoNota
        open={!!notaExcluir}
        titulo={notaExcluir?.titulo || ""}
        onCancel={() => setNotaExcluir(null)}
        onConfirm={confirmarExclusao}
      />
    </>
  );
}
