import { TSettings } from "@/libs/common/context/settingsContext";
import { IconButton, PaletteMode } from "@mui/material";
// ** Icons Imports
// import WeatherNight from "@mdi-material-ui/WeatherNight";
// import WeatherSunny from "@mdi-material-ui/WeatherSunny";

interface TProps {
  settings: TSettings;
  saveSettings: (value: TSettings) => void;
}

function ModeToggleer({ saveSettings, settings }: TProps) {
  const handleModeChange = (mode: PaletteMode) => {
    saveSettings({ ...settings, mode });
  };

  const handleModeToggle = () => {
    if (settings.mode === "light") {
      handleModeChange("dark");
    } else {
      handleModeChange("light");
    }
  };

  return (
    <IconButton color="inherit" aria-haspopup="true" onClick={handleModeToggle}>
      {/* {settings.mode === "dark" ? <WeatherSunny /> : <WeatherNight />} */}
      {settings.mode === "dark" ? "light" : "dark"}
    </IconButton>
  );
}

export default ModeToggleer;
