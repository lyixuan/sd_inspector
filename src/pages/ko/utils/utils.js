import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';

const dateFormat = 'YYYY.MM.DD';

const commitDateFormat = 'YYYY-MM-DD  HH:mm:ss';
export const handleDateParams = (item) => {
    const [startTime, endTime] = item;
    return [startTime, endTime].map((ls, index) => {
        return index === 0 ? moment(ls).format(commitDateFormat) : moment(ls).format('YYYY-MM-DD  23:59:59');
    });
}

export function handleInitParams(params = {}) {
    let returnObj = {};
    Object.keys(params).forEach(key => {
        if (key === 'KoDateRange') {
            const date = Array.isArray(params[key]) && params[key].length > 0 ? params[key][0] : {};
            const { beginTime, endTime } = date;
            returnObj = { ...returnObj, recordTimeList: handleDateParams([beginTime, endTime]) };

        } else if (key === 'pageDetailInfo') {
            returnObj = { ...returnObj, page: { value: INDEX_PAGE, actionValue: INDEX_PAGE }, };
        }
        else if (key === 'enumData') {
            const data = Array.isArray(params[key][2]) && params[key][2].length > 0 ? params[key][2] : [];
            const formApp = Array.isArray(data) && data.length ? data[0] : {};
            returnObj = { ...returnObj, belongApp: formApp.value };
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