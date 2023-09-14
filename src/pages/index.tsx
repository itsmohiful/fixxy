import { style } from "@/libs/styles/common.style";
import { Box } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Box sx={style}>
        <Box>ItsMohiful, Fixxy</Box>
      </Box>
    </>
  );
}
