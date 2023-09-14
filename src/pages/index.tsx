import { Box } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "28px",
  height: "40rem",
};

export default function Home() {
  return (
    <>
      <Box sx={{ ...style }}>ItsMohiful, Fixxy</Box>
    </>
  );
}
