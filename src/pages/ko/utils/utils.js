import { INDEX_PAGE } from '@/utils/constants';
export function handleInitParams(params = {}) {
    let returnObj = {};
    Object.keys(params).forEach(key => {
        if (key === 'KoDateRange') {
            const date = Array.isArray(params[key]) && params[key].length > 0 ? params[key][0] : {};
            const { beginTime, endTime } = date;
            returnObj = { ...returnObj, beginTime, endTime };

        } else if (key === 'pageDetailInfo') {
            returnObj = { ...returnObj, page: INDEX_PAGE, };
        }
        else if (key === 'fromAppData') {
            const data = Array.isArray(params[key]) && params[key].length > 0 ? params[key][0] : {};
            returnObj = { ...returnObj, fromApp: data };
        }
    })

    return returnObj;
}