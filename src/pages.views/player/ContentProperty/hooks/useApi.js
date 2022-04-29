
// libs
import { Request } from 'metalib/common/libs/'

const API_URL = process.env.API_URL || `https://api.metaeditor.io`

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
          return await Request.GET(`amenities/${slug}/card/`);
        },
        surroundings_card: async ({ slug }) => {
          return await Request.GET(`surroundings/${slug}/card/`);
        },
        units_card: async ({ slug }) => {
          return await Request.GET(`unit/${slug}/card/`);
        },
        units_search: async (slug, query) => {
          return await Request.GET(`building/${slug}/units_search/`, query);
        },
        units_plans_search: async (slug, query) => {
          return await Request.GET(`building/${slug}/plans_search/`, query);
        },
      }
    }

  }

  return cls
}
