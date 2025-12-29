import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { getTabs } from "./tabs.config";
import { PlayerTabsProps } from "@/types";

function CustomTabPanel({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div hidden={value !== index} className="div-tabs-desktop">
      {value === index && (
        <Box sx={{ p: 0, height: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

export function DesktopTabs({ items, notes, conditions }: PlayerTabsProps) {
  const [value, setValue] = useState(0);

  const TABS = getTabs({ items, notes, conditions });
  const DESKTOP_TABS = TABS.filter(tab => !tab.onlyMobile);

  return (
    <Box sx={{ width: "100%" }} className="tab-cyberpunk">
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        {DESKTOP_TABS.map(tab => (
          <Tab key={tab.key} label={tab.label} />
        ))}
      </Tabs>

      {DESKTOP_TABS.map((tab, index) => (
        <CustomTabPanel key={tab.key} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
