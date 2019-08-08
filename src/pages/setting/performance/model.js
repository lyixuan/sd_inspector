import { message } from 'antd';
import { performanceList } from '@/pages/setting/performance/services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'performanceModel',

  state: {
    listData: [], // 保存组织处理成treeData需要的结构
  },
  effects: {
    // 获取列表数据
    *getListData({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(performanceList, params);
      const listData = result.data || [];
      if (result.code === 20000) {
        console.log(listData, 'listData');
        yield put({ type: 'save', payload: { listData } });
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
