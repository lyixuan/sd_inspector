import { message } from 'antd';
import { msgF } from '@/utils/utils';
import { handleInitParams } from './utils/utils';
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
  },

  effects: {
    *pageParams(_, { all, call, put, select }) {
      const pageParams = yield select(state => state.koPlan.pageParams);
      if (JSON.stringify(pageParams) !== '{}') return;
      const [KoDateRangeResponse, KOMessageResponse, pageDetailInfoList, fromAppResponse] = yield all([
        call(getKoDateRange),
        call(getKOMessage),
        call(getPageDetailInfoList),
        call(getKOEnumList, { type: 2 }),
      ]);
      KoDateRangeResponse.code !== 2000 && message.error(KoDateRangeResponse.msg);
      KOMessageResponse.code !== 2000 && message.error(KOMessageResponse.msg);
      pageDetailInfoList.code !== 20000 && message.error(msgF(pageDetailInfoList.msg, pageDetailInfoList.msgDetail));
      fromAppResponse.code !== 20000 && message.error(msgF(fromAppResponse.msg, fromAppResponse.msgDetail));
      if (fromAppResponse.code === 20000 && pageDetailInfoList.code === 20000 && KoDateRangeResponse.code === 2000) {
        const KoDateRange = KoDateRangeResponse.data;
        const KOMessage = KOMessageResponse.data;
        const pageDetailInfo = pageDetailInfoList.data;
        const fromAppData = fromAppResponse.data;
        const newParams = { KoDateRange, KOMessage, pageDetailInfo, fromAppData };
        yield put({
          type: 'savePageParams',
          payload: { pageParams: newParams }
        });
        yield put({ type: 'saveTabFromParams', payload: { ...handleInitParams(newParams) } })
      }

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
      // yield put({ type: 'saveTabFromParams', payload: {} });
      // // 二级页面下拉接口
      // const params = payload.params;
      // const result = yield call(getPageList, params);
      // if (result.code === 20000) {
      //   const pageList = result.data || [];
      //   yield put({ type: 'save', payload: { pageList } });
      //   yield put({ type: 'getSankeyList', payload: { tabFromParams: this.state.tabFromParams } });
      //   yield put({ type: 'getBarData', payload: { params: this.state.params } });
      // } else {
      //   message.error(msgF(result.msg, result.msgDetail));
      // }
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
      return { ...state, tabFromParams: { ...payload } };
    }
  },

  subscriptions: {},
};
