module.exports = {
  presets: [
    ['next/babel'],
    ['@babel/preset-env', {
      "targets": {
        "node": "current"
      }
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "regenerator": true,
    }],
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    [
      '@emotion/babel-plugin',
      {
        importMap: {
          '@mui/system': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/system', 'styled'],
            },
          },
          '@mui/material/styles': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/material/styles', 'styled'],
            },
          },
        },
      },
    ],
  ],
};
