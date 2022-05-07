// libs
import {env} from 'api/'


const methods = (cls) => {

  const {stream_host, stream_port} = env.stream_routes || {}
  const url = `http://${stream_host}:${stream_port}`

  let headers = {}
  // if(env.isDev) {
  //   headers.Authorization = 'Token ab7ac89a91491e9226b991276970d23753605960'
  // }

  return {
    vec_overlay: {

      details_all: async ({build}) => {
        return await cls._api(`/vec/building/${build}/details/all/`).get();
      },

      // ** Not used
      // details: async ({build}) => {
      //   return await cls._api(`/vec/building/${build}/details/`).get();
      // },
      // amenities_list: async ({build}) => {
      //   return await cls._api(`/vec/building/${build}/amenities/list/`).get();
      // },
      // surroundings_list: async ({build}) => {
      //   return await cls._api(`/vec/building/${build}/surroundings/list/`).get();
      // },

      amenities_card: async ({slug}) => {
        return await cls._api(`/vec/amenities/${slug}/card/`).get();
      },
      surroundings_card: async ({slug}) => {
        return await cls._api(`/vec/surroundings/${slug}/card/`).get();
      },
      units_card: async ({slug}) => {
        return await cls._api(`/vec/unit/${slug}/card/`).get();
      },
      units_search: async (slug, query) => {
        return await cls._api(`/vec/building/${slug}/units_search/`, query).get();
      },
      units_plans_search: async (slug, query) => {
        return await cls._api(`/vec/building/${slug}/plans_search/`, query).get();
      },
    },
    vec_statistics: {
      building: async (slug) => {
        return await cls._api(`/vec/stat/building/${slug}/`).get();
      },
    },
    vec_access: {
      stream_access: async () => {
        return await cls._api(`/vec/stream/access/`).get();
      },
    },
    vec_cabinet: {
      buildings_list: async (query) => {
        return await cls._api('/vec/cabinet/buildings/', query).get();
      },
      units_csv_download: (slug) => {
        cls._api(`/vec/cabinet/building/${slug}/csv/units/`).download();
      },
      units_list: async (slug, query) => {
        return await cls._api(`/vec/cabinet/building/${slug}/units/`, query).get();
      },
      // catalog_building_units: async (slug, query) => {
      //   return await cls._api(`/vec/buildings/${slug}/`, query).get();
      // },
    },
    vec_launcher: {
      stream_by_user: async () => {
        return await cls._get({url: `${url}/launcher/stream/by_user/`, headers});
      },
      stream_kill: async () => {
        return await cls._get({url: `${url}/launcher/stream/kill/`, headers});
      },
    },
    vec_buildings_form: {
      read: async (slug) => {
        return await cls._api(`/vec/cabinet/building/${slug}/form/`).get();
      },
      update: async (slug, data) => {
        return await cls._api(`/vec/cabinet/building/${slug}/form/`).put(data);
      },
    },
    vec_unit_form: {
      read: async (unit_id) => {
        return await cls._api(`/vec/cabinet/unit/${unit_id}/form/`).get();
      },
      update: async (unit_id, data) => {
        return await cls._api(`/vec/cabinet/unit/${unit_id}/form/`).put(data);
      },
    },
    vec_request_form: {
      // read: async () => {
      //   return await cls._api(`/vec/request/unit/`).get();
      // },
      submit: async (unit_key, data) => {
        return await cls._api(`/vec/request/unit/${unit_key}/ `).post(data);
      },
    },

    vec_unit_favorite: {
      list: async () => {
        return await cls._api(`/vec/favorite/units/list/`).get();
      },
      read: async (unit_key) => {
        return await cls._api(`/vec/favorite/unit/${unit_key}/`).get();
      },
      update: async (unit_key) => {
        return await cls._api(`/vec/favorite/unit/${unit_key}/`).put();
      },
      delete: async (unit_key) => {
        return await cls._api(`/vec/favorite/unit/${unit_key}/`).delete();
      },
    },

    vec_onboarding: {
      read: async () => {
        return await cls._api(`/vec/onboarding/`).get();
      },
    },

    stream: {
      status: async () => {
        return await cls._api(`/vec/stream/methods/`, {method: 'status'}).get();
      },
      get: async (build) => {
        return await cls._api(`/vec/stream/methods/`, {method: 'get', build}).get();
      },
      restart: async (build) => {
        return await cls._api(`/vec/stream/methods/`, {method: 'restart', build}).get();
      },
      keepalive: async () => {
        return await cls._api(`/vec/stream/methods/`, {method: 'keepalive'}).get();
      },
      kill: async () => {
        return await cls._api(`/vec/stream/methods/`, {method: 'kill'}).get();
      },
      by_user: async () => {
        return await cls._api(`/vec/stream/methods/`, {method: 'by_user'}).get();
      },
      // shared: async () => {
      //   return await cls._api(`/vec/stream/methods/`, {method: 'kill'}).get();
      // },
    },

  }

}

export default methods
