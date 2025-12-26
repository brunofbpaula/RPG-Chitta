import { useTheme, useMediaQuery } from "@mui/material";
import { DesktopTabs } from "./DesktopTabs";
import { MobileTabs } from "./MobileTabs";
import { IPlayer } from "@/types";

type ResponsiveTabsProps = {
  user: IPlayer;
}

export function ResponsiveTabs(ResponsiveTabsProps: ResponsiveTabsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <MobileTabs /> : <DesktopTabs />;
}
