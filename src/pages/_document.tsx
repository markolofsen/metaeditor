import * as React from 'react';

<<<<<<< .merge_file_Eo16MI
// api
import env from '../api/env'
=======
// config
import { env } from 'config/'
>>>>>>> .merge_file_garBdM

// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../mui-theme/';
import createEmotionCache from '../mui-theme/createEmotionCache';


const CONFIG = {
  TITLE: env.seo.title,
  APP_NAME: env.data.siteLogoName,
  APP_DESC: env.seo.description,
  URL: env.PUBLIC_URL,
  OG_IMAGE: env.seo.og_image,
}


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

          <meta name="application-name" content={CONFIG.APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={CONFIG.APP_NAME} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />

          <meta name='apple-mobile-web-app-title' content={CONFIG.APP_NAME} />
          <meta name='description' content={CONFIG.APP_DESC} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          {/* <meta name='msapplication-config' content='/static/favicons/browserconfig.xml' /> */}
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          {/* <link rel='apple-touch-icon' href='/static/favicons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/static/favicons/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/static/favicons/touch-icon-ipad-retina.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
          */}

          <meta property='og:type' content='website' />
          <meta property='og:title' content={CONFIG.TITLE} />
          <meta property='og:description' content={CONFIG.APP_DESC} />
          <meta property='og:site_name' content={CONFIG.APP_NAME} />
          <meta property='og:url' content={CONFIG.URL} />
          <meta property='og:image' content={CONFIG.OG_IMAGE} />

          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const { renderPage: originalRenderPage } = ctx;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
