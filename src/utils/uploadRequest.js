import storage from './storage';
import { PROXY_PATH } from './constants';

export default function uploadRequest(action, params = {}) {
    return {
        ...params,
        action: `${PROXY_PATH()}${action}`,
        headers: {
            ...params.headers || {},
            authorization: storage.getToken(),
        },

    }
}