import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { handleInitParams, handleFormParams } from './utils/utils';
import {
  getKOEnumList, getPageList, getSankeyData, getTableList, getBarData,
  getKoDateRange, getKOMessage, getPageDetailInfoList,
} from './services';


export default {
  namespace: 'koPlan',

  state: {
    enumData: {},
    params: {},
    pageList: [],
    tableList: [],
    tabFromParams: {},
    pageParams: {},
    KOMessage: {},
    pageDetailInfo: [],
  },

  effects: {
    *getKOMessage(_, { call, put }) {
      const response = yield call(getKOMessage);
      if (response.code === 2000) {
        yield put({
          type: 'saveKOEnumList',
          payload: { KOMessage: response.data },
        })
      } else {
        message.error(response.msg)
      }

    },
    *getEnumData(_, { call, put }) {
      const response = yield call(getKOEnumList, { type: null });
      if (response.code === 20000) {
        const enumData = {};
        response.data.forEach(item => {
          enumData[item.type] = item.enumData;
        });
        yield put({
          type: 'saveKOEnumList',
          payload: { enumData },
        })
      } else {
        message.error(response.msg);
      }
    },
    *pageParams(_, { call, put, select }) {
      const pageParams = yield select(state => state.koPlan.pageParams);
      const enumData = yield select(state => state.koPlan.enumData);
      if (JSON.stringify(enumData) === '{}') {
        yield put({ type: 'getEnumData' });
      }
      if (JSON.stringify(pageParams) !== '{}') return;
      const KoDateRangeResponse = yield call(getKoDateRange);
      KoDateRangeResponse.code !== 2000 && message.error(KoDateRangeResponse.msg);
      if (KoDateRangeResponse.code === 2000) {
        const KoDateRange = KoDateRangeResponse.data;
        const newParams = { KoDateRange, enumData };
        yield put({
          type: 'savePageParams',
          payload: { pageParams: newParams }
        });
      }

    },
    *getKOEnumList({ payload }, { call, put }) {
      const response = yield call(getKOEnumList, payload);
      if (response.code === 20000) {
        const data = Array.isArray(response.data) ? response.data : [];
        const enumData = {};
        data.forEach(item => {
          enumData[item.type] = item.enumData;
        });
        yield put({
          type: 'saveKOEnumList',
          payload: { enumData }
        })

      } else {
        message.error(msgF(response.msg, response.msgDetail));
      }
    },
    *getPageList(_, { call, put, select }) {
      const pageParams = yield select(state => state.koPlan.pageDetailInfo);
      if (pageParams.length > 0) return;
      const response = yield call(getPageDetailInfoList);
      if (response.code === 20000) {
        const pageDetailInfo = response.data || [];
        yield put({
          type: 'save',
          payload: { pageDetailInfo },
        })
      } else {
        message.error(response.msg);
      }

    },
  },

  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...payload };
    },
    saveKOEnumList(state, { payload }) {
      return { ...state, ...payload };
    },
    savePageParams(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTabFromParams(state, { payload }) {
      return { ...state, tabFromParams: payload };
    }
  },
  subscriptions: {},
};
