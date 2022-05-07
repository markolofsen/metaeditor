import * as React from "react";

// config
import { env } from 'config/'

// next
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "src/mui-theme/";
import createEmotionCache from "src/mui-theme/createEmotionCache";

// hooks
import { useAnalytics } from 'src/hooks/'

// context
import ContextProvider from 'src/context/'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();



const App = (props) => {

  // Use Google Analytics
  useAnalytics(env.credentials.GOOGLE_TAG_ID);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{env.seo.title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeProvider>


    </CacheProvider>
  );
};

export default App;
