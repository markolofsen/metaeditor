import packageJson from '../../package.json'


const ConfigClass = new class {
	constructor() {

		this.PUBLIC_URL = process.env.PUBLIC_URL
		this.DEV_URL = process.env.DEV_URL
		this.API_URL = process.env.API_URL

		const isDev = process.env.isDev || process.env.NODE_ENV !== 'production'
		this.isDev = isDev
		this.isProd = !isDev

		this.staticPath = (...v) => `/static/${v.join('/')}`
		this.staticUrl = (...v) => this.PUBLIC_URL + this.staticPath(...v)
	}

	get data() {
		let res = {
			siteLogoName: 'MetaEditor',
			defaultTitle: 'MetaEditor',
			host: this.PUBLIC_URL.split('://')[1],

			/**
			 * For github-pages set host like in example:
			 * host: "markolofsen.github.io/metaeditor"
			 */

			favicons: {
				default: this.staticPath('favicons', 'favicon.png'),
				small: this.staticPath('favicons', '16.png'),
				normal: this.staticPath('favicons', '48.png'),
				large: this.staticPath('favicons', '128.png'),
			},
			logo_svg: {
				icon: this.staticPath('logo_icon.svg'),
				white: this.staticPath('logo_white.svg'),
			},
		}

		return res;
	}

	get seo() {
		return {
			title: 'MetaEditor for Pixel Streaming',
			description: 'MetaEditor streamlines PixelStreaming development to allow businesses to easily deploy and customize their ReactJS application for Unreal Engine.',
			og_image: this.staticUrl('seo', `og_default.jpg?v=${packageJson.version}`),
		};
	}

	get credentials() {
		let res = {
			GOOGLE_TAG_ID: 'G-9TH9WBLLJF',
		}

		return res;
	}

}


export default ConfigClass
