import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { createContext, useMemo, useState } from "react";
import LayoutComponent from "../layouts/commonLayout/CommonLayout.component";
import HeaderComponent from "../layouts/header/Header.component";
import createEmotionCache from "../utils/createEmotionCache";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const darkThemeChosen = useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [mode],
  );
  const lightThemeChosen = useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode],
  );

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ColorModeContext.Provider value={colorMode}>
          <Head>
            {/* <title>Fixxy</title> */}
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider
            theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <HeaderComponent ColorModeContext={ColorModeContext} />
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
