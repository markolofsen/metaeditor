import { env } from 'config/'

// libs
import { Request } from 'metalib/common/libs/'

// const API_URL = process.env.API_URL || `https://api.metaeditor.io`
const API_URL = env.isDev ? `http://127.0.0.1:8000` : process.env.API_URL || `https://api.metaeditor.io`

export default function useApi() {

  const cls = new class {
    constructor() { }

    urlBuilder(route) {
      return `${API_URL}/api/sample_property/` + route
    }

    get vec_overlay() {
      return {
        details_all: async ({ build }) => {
          const url = this.urlBuilder(`building/${build}/details/all/`)
          return await Request.GET(url);
        },

        // ** Not used
        // details: async ({build}) => {
        //   return await cls._api(`building/${build}/details/`).get();
        // },
        // amenities_list: async ({build}) => {
        //   return await cls._api(`building/${build}/amenities/list/`).get();
        // },
        // surroundings_list: async ({build}) => {
        //   return await cls._api(`building/${build}/surroundings/list/`).get();
        // },

        amenities_card: async ({ slug }) => {
          const url = this.urlBuilder(`amenities/${slug}/card/`)
          return await Request.GET(url);
        },
        surroundings_card: async ({ slug }) => {
          const url = this.urlBuilder(`surroundings/${slug}/card/`)
          return await Request.GET(url);
        },
        units_card: async ({ slug }) => {
          const url = this.urlBuilder(`unit/${slug}/card/`)
          return await Request.GET(url);
        },
        units_search: async (slug, query) => {
          const url = this.urlBuilder(`building/${slug}/units_search/`)
          return await Request.GET(url, query);
        },
        units_plans_search: async (slug, query) => {
          const url = this.urlBuilder(`building/${slug}/plans_search/`)
          return await Request.GET(url, query);
        },
      }
    }

  }

  return cls
}
