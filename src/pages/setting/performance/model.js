import { message } from 'antd';
import { getOrgMapList } from '@/pages/setting/performance/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'performanceModel',

  state: {
    orgListTreeData: [], // 保存组织处理成treeData需要的结构
  },
  effects: {
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
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
