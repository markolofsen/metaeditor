import { env } from 'config/'

// libs
import { Request } from 'metalib/common/libs/'

const API_URL = process.env.API_URL || `https://api.metaeditor.io`
// const API_URL = env.isDev ? `http://127.0.0.1:8000` : process.env.API_URL || `https://api.metaeditor.io`

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

        // vec_buildings_form: {
        //   read: async (slug) => {
        //     return await cls._api(`/vec/cabinet/building/${slug}/form/`).get();
        //   },
        //   update: async (slug, data) => {
        //     return await cls._api(`/vec/cabinet/building/${slug}/form/`).put(data);
        //   },
        // },
        // vec_unit_form: {
        //   read: async (unit_id) => {
        //     return await cls._api(`/vec/cabinet/unit/${unit_id}/form/`).get();
        //   },
        //   update: async (unit_id, data) => {
        //     return await cls._api(`/vec/cabinet/unit/${unit_id}/form/`).put(data);
        //   },
        // },
        // vec_request_form: {
        //   // read: async () => {
        //   //   return await cls._api(`/vec/request/unit/`).get();
        //   // },
        //   submit: async (unit_key, data) => {
        //     return await cls._api(`/vec/request/unit/${unit_key}/ `).post(data);
        //   },
        // },

        // vec_unit_favorite: {
        //   list: async () => {
        //     return await cls._api(`/vec/favorite/units/list/`).get();
        //   },
        //   read: async (unit_key) => {
        //     return await cls._api(`/vec/favorite/unit/${unit_key}/`).get();
        //   },
        //   update: async (unit_key) => {
        //     return await cls._api(`/vec/favorite/unit/${unit_key}/`).put();
        //   },
        //   delete: async (unit_key) => {
        //     return await cls._api(`/vec/favorite/unit/${unit_key}/`).delete();
        //   },
        // },
      }
    }

  }

  return cls
}
