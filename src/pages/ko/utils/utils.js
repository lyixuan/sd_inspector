import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';
import config from '../../../../config/config';


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
// 质检标注
export function getTransactionIntentionValue(data = [], v) {
  if (typeof v !== 'object') {
    for (let item of Object.values(data)) {
      if (item.valueType === 3 && item.minValue === v && item.maxValue === v) { // 等于
        return '-';
      } else if ((item.valueType === 7 && item.minValue <= v && item.maxValue >= v) || (item.valueType === 8 && item.minValue <= v && item.maxValue > v)) { // 大于等于且小于等于 // 大于等于且小于
        return item.name;
      }
    }
  }

  return v;
}
export const pathImUrl = 'http://static.sunlands.com'; // IM等图片的域名
export function getSubStringValue(v = '', n = 10) { // 多余n个字符显示 n + '...'
  return (v ? v.length : 0) > n ? v.substring(0, n) + '...' : v;
}
export function jumpMarkingDetails(id, type) {
  const origin = window.location.origin;
  if (type.target) {
    const url = `${origin}${config.base}ko/behaviorPath`;
    const params = { userId: id, target: type.target };
    const strParams = encodeURIComponent(JSON.stringify(params));
    window.open(`${url}?params=${strParams}`);
  } else {
    const params = {
      id: id,
      type: type
    }
    const strParams = encodeURIComponent(JSON.stringify(params));
    const url = `${origin}${config.base}qualityMarking/detail?params=${strParams}`;
    window.open(url);
  }

}
export function handleDefaultPickerValueMark(n = 2, cTime = moment()) {
  const defTime = cTime.subtract(n, 'days');
  return [defTime, defTime];
}
export function handleDefaultPickerExamValue(cTime = moment()) {
  return [cTime.subtract(1, 'months'), cTime]
}
export function handleTNDateValue(n = 1, cTime = moment()) {
  return cTime.subtract(n, 'days').format(commitDateFormat)
}
