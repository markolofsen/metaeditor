import * as React from "react";

<<<<<<< .merge_file_ZSWUwt
// api
import env from '../api/env'
=======
// config
import { env } from 'config/'
>>>>>>> .merge_file_OdOXWN

// next
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
<<<<<<< .merge_file_ZSWUwt
import theme from "../mui-theme/";
import createEmotionCache from "../mui-theme/createEmotionCache";

// hooks
import { useAnalytics } from '../hooks/'
=======
import theme from "src/mui-theme/";
import createEmotionCache from "src/mui-theme/createEmotionCache";

// hooks
import { useAnalytics } from 'src/hooks/'

// context
import ContextProvider from 'src/context/'

>>>>>>> .merge_file_OdOXWN

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


<<<<<<< .merge_file_ZSWUwt
=======

>>>>>>> .merge_file_OdOXWN
const App = (props) => {

  // Use Google Analytics
  useAnalytics(env.credentials.GOOGLE_TAG_ID);

<<<<<<< .merge_file_ZSWUwt

=======
>>>>>>> .merge_file_OdOXWN
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{env.seo.title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>

      <ThemeProvider theme={theme}>
<<<<<<< .merge_file_ZSWUwt

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />

      </ThemeProvider>

=======
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeProvider>


>>>>>>> .merge_file_OdOXWN
    </CacheProvider>
  );
};

export default App;
