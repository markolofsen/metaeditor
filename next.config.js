/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const { withSentryConfig } = require('@sentry/nextjs')

// in next.config.js
const packageJson = require("./package.json");


const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants')



// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
const withEnv = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER
	// when `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
	// when `next build` or `npm run build` is used
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

	// console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)


	// Get node variables
	let node_variables = {}
	Object.keys(process.env).filter(v => v.startsWith('~')).map(e => {
		node_variables[e] = process.env[e]
	})

	if (isDev) {
		// Hack for ssl in localhost (for SSR data fetching)
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
	}

	let env = {
		...node_variables,
		isDev,
		version: packageJson.version,
	}

	if (isProd) {
		env.PUBLIC_URL = packageJson.homepage
		env.assetPrefix = './'
	}

	return env
}

/** @type {import('next').NextConfig} */




function moduleExports(phase) {
	let res = {
		...withEnv(phase),
		trailingSlash: false,
		// pagesPaths: ['src/pages', 'src/pages2'],

		reactStrictMode: false,

		eslint: {
			// Warning: This allows production builds to successfully complete even if
			// your project has ESLint errors.
			ignoreDuringBuilds: true,
		},

		serverRuntimeConfig: {
			// Will only be available on the server side
			// mySecret: 'secret',
			// secondSecret: process.env.SECOND_SECRET, // Pass through env variables
		},
		publicRuntimeConfig: {
			// Will be available on both server and client
			staticFolder: '/static',
		},

		exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
			return {
				'/': { page: '/' },
				'/404': { page: '/404' },
				'/dev': { page: '/dev' },
				// '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
			}
		},
	}


	/**
	 * With PWA in production
	 */
	res = withPWA({
		...res,
		future: {
			webpack5: true
		},
		poweredByHeader: false,
		pwa: {
			disable: res.isDev,
			dest: 'public',
			// sw: 'service-worker.js',
			maximumFileSizeToCacheInBytes: 3000000,
			// publicExcludes: ["!_error*.js"],
			// register: true,
			// skipWaiting: true,
			// mode: "development",
		},
		// Headers
		async headers() {
			return [{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN', },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-XSS-Protection', value: '1; mode=block' },
					{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
				],
			}]
		},
	})


	return res;
};

const SentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore
	silent: true, // Suppresses all logs
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)

// module.exports = (phase) => moduleExports(phase)
module.exports = (phase) => withSentryConfig(moduleExports(phase), SentryWebpackPluginOptions)
