import { message } from 'antd';
import {
  performanceList,
  getKpiPackage,
  createKpiPackage,
  updateKpiPackage,
} from '@/pages/setting/performance/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'performanceModel',

  state: {
    listData: [],
    getKpiPackageListData: [],
  },
  effects: {
    // 获取列表数据
    *getListData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(performanceList, params);
      console.log(params, 'parmas');
      const listData = result.data || [];
      const { total, pageNum } = params;
      console.log(pageNum, 'pagepage');
      if (result.code === 20000) {
        console.log(listData, 'listData');
        yield put({ type: 'save', payload: { listData, pageNum, total } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // *getListData({ payload }, { call, put }) {
    //   // 列表
    //   const params = payload.params;
    //   const result = yield call(performanceList, params);
    //   const { total, currentPage } = params;
    //   const listData = result.data || [];
    //   if (result.code === 20000) {
    //     yield put({ type: 'save', payload: { listData, currentPage, total } });
    //   } else {
    //     message.error(msgF(result.msg, result.msgDetail));
    //   }
    // },

    // 获取绩效包数据
    *getKpiPackage({ payload }, { call, put }) {
      const params = payload.params;
      console.log(payload, 'payload');
      const result = yield call(getKpiPackage, params);
      const getKpiPackageData = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { getKpiPackageData } });
        return getKpiPackageData;
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 创建绩效包
    *createKpiPackage({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(createKpiPackage, params);
      const createKpiPackageData = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { createKpiPackageData } });
        return true;
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 编辑
    *updateKpiPackage({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(updateKpiPackage, params);
      const updateKpiPackageData = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { updateKpiPackageData } });
        return updateKpiPackageData;
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {},
};
