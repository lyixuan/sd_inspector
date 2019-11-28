import { message } from 'antd';
import {
  getFindTreeList,
  getDateRange,
} from './services';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'classQualityModel',

  state: {
    dateRange: {},
    logTreeList: [],
    flatTreeList: undefined, // 目录
  },

  effects: {
    *getFindTreeList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getFindTreeList, params);
      if (result.code === 20000) {
        const flatTreeList = fillDataSource(result.data === null ? [] : result.data);
        const logTreeList = flatTreeList.filter(item => item.level === 1 );
        if (callback && typeof callback === 'function') {
          callback(flatTreeList, logTreeList);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDateRange(_, { call, put }) {
      const result = yield call(getDateRange);
      if (result.code === 20000) {
        const dateRange = {
          startTime: moment(result.data.beginDate).format('YYYY.MM.DD'),
          endTime: moment(result.data.endDate).format('YYYY.MM.DD')
        }  
        yield put({ type: 'save', payload: { dateRange } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
function fillDataSource(params = [], intList = [], n = 1) {
  params.map(item => {
    item.level = n;
    // if (item.violationLevel) {
    //   item.qualityDetaile = `在与用户沟通过程中老师应耐心回复用
    //   户所述在与用户沟通过程中老师应耐心回复用户所述在与用户沟通过程中老师应耐心回
    //   复用户所述在与用户沟通过程中老师应耐心回复用户所述在与用户沟通过程中老师应耐心回复用户所`;
    // }
    const { childNode	, ...others } = item;
    intList.push(others);
    if (childNode && childNode.length > 0) {
      fillDataSource(childNode, intList, n + 1);
    }
  })
  return intList
}