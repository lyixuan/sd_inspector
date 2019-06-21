import { message } from 'antd';
import { msgF } from '@/utils/utils';
import {
  getKOEnumList,
  getKoDateRange, getKOMessage, getPageDetailInfoList, getUserGroupList,
} from './services';


export default {
  namespace: 'koPlan',

  state: {
    enumData: {},
    params: {},
    pageList: [],
    tableList: [],
    tabFromParams: {},
    originParams: {},
    pageParams: {},
    KOMessage: {},
    // pageDetailInfo: [],
    usersData: {},
    chooseEventData: [],
    userGroupListData: [],
    pageDetailTotal: {},
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
        enumData[12] = enumData[12].map(item => {
          const arr1 = item.value.split(';');
          const arr2 = arr1[0].split(',');
          if(arr2.length === 1) {
            return {
              ...item, minValue: Number(arr2[0]), maxValue: Number(arr2[0]), valueType: Number(arr1[1]),
            }
          } else {
            return {
              ...item, minValue: Number(arr2[0]), maxValue: Number(arr2[1]), valueType: Number(arr1[1]),
            }
          }

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
    *getPageList({ payload }, { call, put, select }) {
      // const pageParams = yield select(state => state.koPlan.pageDetailInfo);
      // if (pageParams.length > 0) return;
      const { belongApp = 1 } = payload;
      const pageParams = (yield select(state => state.koPlan.pageDetailTotal))[belongApp];
      if (pageParams && pageParams.length > 0) {
        yield put({ type: 'getPageInit', payload: pageParams});
        return;
      };
      const response = yield call(getPageDetailInfoList, payload);
      if (response.code === 20000) {
        const pageDetailInfo = response.data || [];
        yield put({ type: 'getPageInit', payload: pageDetailInfo});
        yield put({
          type: 'savePageDetailTotal',
          payload: { [belongApp]: pageDetailInfo },
        });
      } else {
        message.error(response.msg);
      }

    },
    *getUserGroupList({ payload }, { call, put, select }) {
      const userGroup = yield select(state => state.koPlan.userGroupListData);
      if (userGroup && userGroup.length > 0) return;
      const response = yield call(getUserGroupList);
      if (response && response.code === 20000 && response.data) {
        const groupList = response.data.map(item => {
          return { id: item.id, groupName: item.groupName}
        });
        yield put({
          type: 'save',
          payload: { userGroupListData: groupList }
        });
      }
    },
    *getPageInit({ payload }, { call, put,}) {
      const pageDetailInfo = payload;
      let pageVale = { page: '' };
      if (pageDetailInfo.length > 0) {
        pageVale = pageDetailInfo[0];
      }
      yield put({
        type: 'saveTabFromParamsPage',
        payload: { page: { value: pageVale.page, actionValue: pageVale.page } },
      });
    }
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
    },
    saveOriginParams(state, { payload }) {
      return { ...state, originParams: payload };
    },
    saveUserData(state, { payload }) {
      return { ...state, ...payload };
    },
    saveChooseEventData(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTabFromParamsPage(state, { payload }) {
      return { ...state, tabFromParams: { ...state.tabFromParams, ...payload} };
    },
    savePageDetailTotal(state, { payload }) {
      return { ...state, pageDetailTotal: { ...state.pageDetailTotal, ...payload} };
    },
  },
  subscriptions: {},
};
