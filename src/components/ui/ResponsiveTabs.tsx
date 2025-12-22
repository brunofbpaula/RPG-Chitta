import { useTheme, useMediaQuery } from "@mui/material";
import { DesktopTabs } from "./DesktopTabs";
import { MobileTabs } from "./MobileTabs";

export function ResponsiveTabs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <MobileTabs /> : <DesktopTabs />;
}
