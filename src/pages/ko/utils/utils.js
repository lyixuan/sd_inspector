import moment from 'moment';
import { INDEX_PAGE } from '@/utils/constants';
import config from '../../../../config/config';
import React from 'react';
import deImg from '@/assets/ai/de.png'

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
// 多余len个字符显示 len + '...'（区分中英文）
export function strLen(str = '', len = 10) {
  if (!str) {
    return;
  }
  let lengh = '';
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      // 英文
      lengh = (str ? str.length : 0) > (len * 2) ? str.substring(0, len * 2) + '...' : str;
    }
    else {
      // 汉字
      lengh = (str ? str.length : 0) > len ? str.substring(0, len) + '...' : str;
    }
  }
  return lengh;
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
export function jumpRouter(id, type) {
  const origin = window.location.origin;
  if (type.target) {
    const url = `${origin}${config.base}ko/behaviorPath`;
    const params = { userId: id, target: type.target };
    const strParams = encodeURIComponent(JSON.stringify(params));
    window.open(`${url}?params=${strParams}`, "_self");
  }

}
export function handleDefaultPickerValueMark(n = 2, cTime) {
  cTime = cTime ? moment(cTime) : moment();
  const defTime = cTime.subtract(n, 'days');
  return [defTime, defTime];
}
export function handleDefaultPickerExamValue(cTime) {
  cTime = cTime ? moment(cTime) : moment();
  return [cTime.subtract(1, 'months'), cTime]
}
export function handleTNDateValue(n = 1, cTime) {
  cTime = cTime ? moment(cTime) : moment();
  return cTime.subtract(n, 'days').format(commitDateFormat)
}
export function jumpQualityRoute(path, params) {
  const parameter = params ? `?params=${encodeURIComponent(JSON.stringify(params))}` : '';
  const url = `${origin}${config.base}${path}${parameter}`;
  window.open(url);
}
// link route
export function linkRoute(text, classname) {
  if (!text) return;
  const regurl = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  if (regurl.test(text) && /\.?(pic\.manager|jpg|jpeg|png|GIF|JPG|PNG|bm)/g.test(text)) {
    return `<a class="${classname}" href="${text}" target="_blank"><img src="${text}" onerror="this.onerror='';this.src='${deImg}';this.style.width='100px'" /></a>`
  } else {
    return text.replace(regurl, (c) => `<a class="${classname}" href="${c}" target="_blank">${c}</a>`);
  }
}
// link img
export function linkImgRouteBul(text) {
  const regurl = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  const bul = regurl.test(text) && /\.?(pic\.manager|jpg|jpeg|png|GIF|JPG|PNG|bm)/g.test(text);
  return bul;
}
// 浮点乘法
export function accMul(arg1, arg2) {
  if (!arg1) return '0.00';
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
// 转成年月日
export function initTimeData(params) {
  if (Array.isArray(params) && params.length > 0) {
    return params.map(item => item && moment(item).format(commitDateFormat));
  } else {
    return [];
  }
}

//
export const emptyValue = 9999;
export function getArrLastValue(arr = []) {
  const val = arr.length > 0 ? arr[arr.length -1].value : undefined;
  if (val === emptyValue) {
    return 0;
  } else {
    return val
  }
}
