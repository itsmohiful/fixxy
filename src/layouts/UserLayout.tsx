import { Box, Theme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { useSettings } from "../libs/common/hooks/useSettings";

type TProps = {
  children: ReactNode;
};

function UserLayout({ children }: TProps) {
  const { settings, saveSettings } = useSettings();

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  return <Box>User Layout</Box>;
}

export default UserLayout;
