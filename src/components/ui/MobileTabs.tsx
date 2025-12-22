import React, { useState, forwardRef } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FileText, Boxes, Users, X, LayoutGrid } from "lucide-react";


/* ================================
   Transição modal (MOBILE)
================================ */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* ================================
   Conteúdo reutilizado
================================ */
function PanelContent({ value }: { value: number }) {
  switch (value) {
    case 0:
      return <Box p={2}>Item One</Box>;
    case 1:
      return <Box p={2}>Item Two</Box>;
    case 2:
      return <Box p={2}>Item Three</Box>;
    default:
      return null;
  }
}

export function MobileTabs() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
    return (
        <>
        <BottomNavigation
            className="bottomNavigation-custom"
            showLabels
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
              setOpen(true);
            }}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1200,
              backgroundColor: "rgb(14, 14, 23)"
            }}
        >
            <BottomNavigationAction
              label="INICIO"
              icon={<LayoutGrid size={22} />}
              value={0}
            />
            <BottomNavigationAction
              label="NOTAS"
              icon={<FileText size={22} />}
              value={0}
            />
            <BottomNavigationAction
            label="INVENTÁRIO"
            icon={<Boxes size={22} />}
            value={1}
            />
            <BottomNavigationAction
            label="CONTATOS"
            icon={<Users size={22} />}
            value={2}
            />
        </BottomNavigation>

        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar position="relative">
              <Toolbar>
                  <IconButton edge="start" onClick={() => setOpen(false)}>
                    <X />
                  </IconButton>

                  <Typography sx={{ ml: 2 }} variant="h6">
                    {value === 0 && "NOTAS"}
                    {value === 1 && "INVENTÁRIO"}
                    {value === 2 && "CONTATOS"}
                  </Typography>
              </Toolbar>
            </AppBar>

            <PanelContent value={value} />
        </Dialog>
        </>
    );
}
