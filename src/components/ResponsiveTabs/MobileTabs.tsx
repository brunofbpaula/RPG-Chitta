import React, { useState, forwardRef } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  IconButton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { X } from "lucide-react";
import { getTabs } from "./tabs.config";
import { PlayerTabsProps } from "@/types";


const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function MobileTabs({ items, notes }: PlayerTabsProps) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const TABS = getTabs({ items, notes });
  const CurrentTab = TABS[value];

  return (
    <>
      <BottomNavigation
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
          backgroundColor: "rgb(14, 14, 23)",
        }}
      >
        {TABS.map((tab, index) => (
          <BottomNavigationAction
            key={tab.key}
            label={tab.label}
            icon={<tab.icon size={22} />}
            value={index}
            sx={{ color: "#ffeb00" }}
          />
        ))}
      </BottomNavigation>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          onClick={() => setOpen(false)}
          sx={{ color: "#ffffff" }}
        >
          <X />
        </IconButton>

        {CurrentTab.content}
      </Dialog>
    </>
  );
}
