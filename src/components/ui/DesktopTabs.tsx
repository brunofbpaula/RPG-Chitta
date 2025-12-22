import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box
} from "@mui/material";
import { InventarioContent } from "../Inventario/InventarioContent";
import { ContatosContent } from "../Contatos/ContatosContent";
/* ================================
   TabPanel (DESKTOP)
================================ */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, height: '100%', display: "flex", flexDirection: "column" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

/* ================================
   Componente principal
================================ */
export function DesktopTabs() {
  const [value, setValue] = useState(0);

    return (
      <Box className="tab-cyberpunk" sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={(_, v) => setValue(v)}>
            <Tab label="NOTAS" {...a11yProps(0)} />
            <Tab label="INVENTÁRIO" {...a11yProps(1)} />
            <Tab label="CONTATOS"{...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <PanelContent value={0} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <InventarioContent />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <ContatosContent />
        </CustomTabPanel>
      </Box>
    );

}
