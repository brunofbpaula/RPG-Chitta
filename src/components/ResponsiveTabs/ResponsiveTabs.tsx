import { useTheme, useMediaQuery } from "@mui/material";
import { DesktopTabs } from "./DesktopTabs";
import { MobileTabs } from "./MobileTabs";
import { PlayerTabsProps } from "@/types";

export function ResponsiveTabs({ items, notes, conditions }: PlayerTabsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <MobileTabs items={items} notes={notes} conditions={conditions}/>
  ) : (
    <DesktopTabs items={items} notes={notes} conditions={conditions}/>
  );
}
