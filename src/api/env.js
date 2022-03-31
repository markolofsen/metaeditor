import packageJson from '../../package.json'


const ConfigClass = new class {
	constructor() {

		const isDev = process.env.isDev || process.env.NODE_ENV !== 'production'
		this.isDev = isDev
		this.isProd = !isDev

		this.staticPath = (...v) => `/static/${v.join('/')}`
		this.staticUrl = (...v) => this.config.web_host + this.staticPath(...v)
		this.apiPath = (...v) => `${this.config.api_host}/api/${this.namespace}/${v.join('/')}`
	}

	get streaming() {
		return {
			'apiUrl': `https://api.metaeditor.io/api/streams_provider/access/car-2/`
		}
	}

	get data() {
		let res = {
			siteLogoName: 'MetaEditor',
			defaultTitle: 'MetaEditor',
			host: 'ps.metaeditor.io',

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
			MAILCHIMP: {
				url: 'https://unrealos.us14.list-manage.com/subscribe/post?u=c055902e3d6543aa26481e933&amp;id=62b6b36ab4',
				customFields: {
					/**
					 * Mailchimp: Automatically Add Subscribers to a Group at Signup
					 * https://mailchimp.com/help/automatically-add-subscribers-to-a-group-at-signup/
					 */

					SITE: { 'group[12345][1]': "1" }
				}
			}
		}

		return res;
	}

	get config() {

		let res = {
			web_host: 'https://' + this.data.host,
			api_host: 'https://' + this.data.host,
		}

		if (this.isDev) {
			const host_ip = '127.0.0.1'
			res.web_host = `http://${host_ip}:3000`
			res.api_host = `https://${host_ip}:8000`
		}

		return res;
	}

}


export default ConfigClass
