import { useTheme, useMediaQuery } from "@mui/material";
import { DesktopTabs } from "./DesktopTabs";
import { MobileTabs } from "./MobileTabs";
import { Item, Note } from "@/_root/RootLayout";

export type PlayerInfo = {
  items: Item[];
  notes: Note[];
};

export function ResponsiveTabs({ items, notes }: PlayerInfo) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <MobileTabs items={items} notes={notes} />
  ) : (
    <DesktopTabs items={items} notes={notes} />
  );
}
