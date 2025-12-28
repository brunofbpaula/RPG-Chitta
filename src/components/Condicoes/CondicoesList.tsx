import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CONDITIONS } from "@/lib/conditions";

interface ConditionsListProps {
  ids: number[];
  emptyText: string;
  onItemClick: (id: number) => void;
  active?: boolean;
}

export function CondicoesList({
  ids,
  emptyText,
  onItemClick,
  active = false,
}: ConditionsListProps) {
  if (ids.length === 0) {
    return (
      <Typography sx={{ opacity: 0.6, p: 1, fontFamily: "Rajdhani", color: "#fff" }}>
        {emptyText}
      </Typography>
    );
  }

  return (
    <List dense
        sx={{
            overflowY: "auto", 
            height: "68dvh",
            boxShadow: "inset 0px 0px 20px -5px rgb(0 255 255 / 24%)",
            padding: 2
        }}
    >
      {ids.map((id) => (
        <ListItemButton
          key={id}
          onClick={() => onItemClick(id)}
          sx={
            active
              ? {
                  background: "rgb(255 235 59 / 17%)",
                  mb: 0.5,
                  "&:hover": {
                        backgroundColor: "rgba(0, 255, 255, 0.15)"
                    },
                }
              : undefined
            
          }
        >
          <ListItemText
            primary={CONDITIONS[id].name}
            secondary={active ? CONDITIONS[id].description : undefined}
            sx={{
                fontFamily: "Rajdhani", 
                fontSize: "1.2rem",
                color: "#ffffff"
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
