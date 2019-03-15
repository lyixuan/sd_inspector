import { message } from 'antd';
import { getOrgMapList,getDimensionList } from '@/pages/qualityAppeal/services';

export default {
  namespace: 'qualityAppealHome',

  state: {
    orgList:[],
    dimensionList1:[], // 客诉分维
    dimensionList2:[]  // 班主任分维
  },

  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'save', payload: { orgList } });
      } else {
        message.error(result.msgDetail);
      }
    },
    *getDimensionList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getDimensionList, params);
      let dimensionList1 = [],dimensionList2 = [];
      if (params.qualityType === 1) {
        dimensionList1 = result.data || [];
      }
      if (params.qualityType === 2) {
        dimensionList2 = result.data || [];
      }
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { dimensionList1,dimensionList2 } });
      } else {
        message.error(result.msgDetail);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
  },
};
