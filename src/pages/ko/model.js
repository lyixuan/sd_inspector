import { message } from 'antd';
import { msgF } from '@/utils/utils';
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
    sankeyData: [],
    pageParams: {},
  },

  effects: {
    *pageParams(_, { all, call, put, select }) {
      const pageParams = yield select(state => state.koPlan.pageParams);
      if (JSON.stringify(pageParams) !== '{}') return;
      const [KoDateRangeResponse, KOMessageResponse] = yield all([
        call(getKoDateRange),
        call(getKOMessage),
      ]);
      KoDateRangeResponse.code !== 2000 && message.error(KoDateRangeResponse.msg);
      KOMessageResponse.code !== 2000 && message.error(KOMessageResponse.msg);
      const KoDateRange = KoDateRangeResponse.data;
      const KOMessage = KOMessageResponse.data;
      yield put({
        type: 'savePageParams',
        payload: { pageParams: { KoDateRange, KOMessage } }
      });
    },
    *getKoDateRange(_, { call, put }) {
      const response = yield call(getKoDateRange);
      if (response.code === 2000) {
      } else {
        message.error(response.msg);
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
    *getPageList({ payload }, { call, put }) {
      yield put({ type: 'saveTabFromParams', payload: {} });
      // 二级页面下拉接口
      const params = payload.params;
      const result = yield call(getPageList, params);
      if (result.code === 20000) {
        const pageList = result.data || [];
        yield put({ type: 'save', payload: { pageList } });
        yield put({ type: 'getSankeyList', payload: { tabFromParams: this.state.tabFromParams } });
        yield put({ type: 'getBarData', payload: { params: this.state.params } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getSankeyList({ payload }, { call, put }) {
      // 桑吉图
      const params = payload.params;
      const result = yield call(getSankeyData, params);
      if (result) {
        const sankeyData = result.data || [];
        yield put({ type: 'save', payload: { sankeyData } });
      } else {
        message.error(result.msg);
      }
    },
    *getBarData({ payload }, { call, put }) {
      // 柱状图
      const params = payload.params;
      const result = yield call(getBarData, params);
      if (result.code === 20000) {
        const tableList = result.data || [];
        yield put({ type: 'save', payload: { tableList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getTableList({ payload }, { call, put }) {
      // 列表
      const params = payload.params;
      const result = yield call(getTableList, params);
      if (result.code === 20000) {
        const tableList = result.data || [];
        yield put({ type: 'save', payload: { tableList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
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
      return { ...state, ...payload.tabFromParams };
    }
  },

  subscriptions: {},
};
