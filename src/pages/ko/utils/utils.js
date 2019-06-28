import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';


const commitDateFormat = 'YYYY-MM-DD';
export const handleDateParams = (item) => {
    const [startTime, endTime] = item;
    return [startTime, endTime].map((ls) => ls && moment(ls).format(commitDateFormat));
}
export const handleRecordTimeParamsNew = (params) => { // 最新初始化桑吉图热力图等  选择时间
  const date = Array.isArray(params) && params.length > 0 ? params[0] : {};
  const { beginTime, endTime } = date;
  const bTime = moment(endTime).subtract(6, "days").format(commitDateFormat);
  return [bTime, endTime].map((ls) => ls && moment(ls).format(commitDateFormat));
}
export function handleInitParams(params = {}) {
    let returnObj = {

    };
    Object.keys(params).forEach(key => {
        if (key === 'KoDateRange') {
            // 默认不回显

            returnObj = {
                ...returnObj,
                page: { value: INDEX_PAGE, actionValue: INDEX_PAGE },
                recordTimeList: handleRecordTimeParamsNew(params[key]),
                belongApp: '1',
            };

        }
    })

    return returnObj;
}
export function initRecordTimeListData(params) {
    const date = Array.isArray(params) && params.length > 0 ? params[0] : {};
    const { beginTime, endTime } = date;
    return [beginTime, endTime].map(item => item && moment(item).format(commitDateFormat));
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
