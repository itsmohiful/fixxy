// ** React Imports
import { ReactNode, createContext, useState } from "react";

// ** ThemeConfig Import
import { PaletteMode } from "@mui/material";
import themeConfig from "../../themeConfigs/themeConfig";

export type TSettings = {
  themeColor: ThemeColor;
  mode: PaletteMode;
  contentWidth: ContentWidth;
};

const initialSettings: TSettings = {
  themeColor: "primary",
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
};

export type ThemeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export type ContentWidth = "full" | "boxed";

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<TSettings>({ ...initialSettings });

  const saveSettings = (updatedSettings: TSettings) => {
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
