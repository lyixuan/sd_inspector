import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';

const dateFormat = 'YYYY.MM.DD';
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
        else if (key === 'enumData') {
            const data = Array.isArray(params[key][2]) && params[key][2].length > 0 ? params[key][2] : [];
            const formApp = Array.isArray(data) && data.length ? data[0] : {};
            returnObj = { ...returnObj, fromApp: formApp.value };
        }
    })

    return returnObj;
}
export function handleFormParams(params) {
    const date = Array.isArray(params) && params.length > 0 ? params[0] : {};
    const { beginTime, endTime } = date;
    const HandleData = [beginTime, endTime].map(item => item && moment(item).format(dateFormat));
    return {
        certificateChoiceLessonTime: HandleData,
        registerTime: HandleData,
        publicChoiceLessonTime: HandleData,
    }
}
export function handleDateFormParams(params) {
    const date = Array.isArray(params) && params.length > 0 ? params[0] : {};
    const { beginTime, endTime } = date;
    const HandleData = [beginTime, endTime].map(item => item && moment(item));
    return {
        certificateChoiceLessonTime: HandleData,
        registerTime: HandleData,
        publicChoiceLessonTime: HandleData,
    }
}