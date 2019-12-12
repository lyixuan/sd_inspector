import { message } from 'antd';
import {
  getFindTreeList,
  getDateRange,
  getLastModifyDate
} from './services';
import { msgF } from '@/utils/utils';
import moment from 'moment';

export default {
  namespace: 'classQualityModel',

  state: {
    dateRange: {},
    dateChangeRange: '',
    logTreeList: [],
    flatTreeList: undefined, // 目录
  },

  effects: {
    *getInitList(_, { put }) {
      yield put({ type: 'save', payload: { flatTreeList: undefined, logTreeList: [], dateChangeRange: '' } });
    },
    *getFindTreeList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(getFindTreeList, params);
      if (result.code === 20000) {
        const flatTreeList = fillDataSource(result.data === null ? [] : result.data);
        const logTreeList = flatTreeList.filter(item => item.level === 1 );
        yield put({ type: 'save', payload: { flatTreeList, logTreeList } });
        if (callback && typeof callback === 'function') {
          callback(flatTreeList, logTreeList);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getDateRange({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDateRange, params);
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
    *getLastModifyDate({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getLastModifyDate, params);
      if (result.code === 20000) {
        const dateChangeRange = moment(result.data).format('YYYY年MM月DD日 HH:mm:ss')
        yield put({ type: 'save', payload: { dateChangeRange } });
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
    const { childNode	, ...others } = item;
    intList.push(others);
    if (item.qualityDetaile) {
      intList.push({
        id: new Date().getDate() + '' + item.id,
        level: 5,
        violationName: '质检细则',
        qualityDetaile: item.qualityDetaile,
        modifyTag: item.detailModifyTag,
        modifyType: item.detailModifyType,
        modifyDate: item.detailModifyDate,
      })
    }
    if (childNode && childNode.length > 0) {
      fillDataSource(childNode, intList, n + 1);
    }
  })
  return intList
}