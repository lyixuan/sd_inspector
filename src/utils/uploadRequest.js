import storage from './storage';
import { PROXY_PATH,SERVER_HOST } from './constants';

export default function uploadRequest(action, params = {}) {
    return {
        ...params,
        action: `${SERVER_HOST}${PROXY_PATH()}${action}`,
        headers: {
            ...params.headers || {},
            authorization: storage.getToken(),
        },
    }
}
