import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';


const commitDateFormat = 'YYYY-MM-DD';
export const handleDateParams = (item) => {
    const [startTime, endTime] = item;
    return [startTime, endTime].map((ls) => ls && moment(ls).format(commitDateFormat));
}

export function handleInitParams(params = {}) {
    let returnObj = {

    };

    Object.keys(params).forEach(key => {
        if (key === 'KoDateRange') {
            const date = Array.isArray(params[key]) && params[key].length > 0 ? params[key][0] : {};
            const { beginTime, endTime } = date;
            returnObj = {
                ...returnObj,
                page: { value: INDEX_PAGE, actionValue: INDEX_PAGE },
                recordTimeList: handleDateParams([beginTime, endTime]),
                belongApp: '1',
            };

        }
    })

    return returnObj;
}
export function handleFormParams(params) {
    const date = Array.isArray(params) && params.length > 0 ? params[0] : {};
    const { beginTime, endTime } = date;
    const HandleData = [beginTime, endTime].map(item => item && moment(item).format(commitDateFormat));
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