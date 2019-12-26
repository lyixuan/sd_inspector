import { getKOEnumList } from '@/pages/ko/services';
import { message } from 'antd/lib/index';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'resubmitModal',
  state: {
    collegeList: [],
    paramsQuery: {

    }
  },

  effects: {
    // 家族-学院列表
    *getCollegeList(_, { call, put }) {
      const collegeResult = yield call(getKOEnumList, {type: 9});
      if (collegeResult && collegeResult.code && collegeResult.code === 20000) {
        const data = Array.isArray(collegeResult.data) ? collegeResult.data : [];
        yield put({ type: 'save', payload: { collegeList: data[0].enumData } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveParams(state, { payload }) {
      return { ...state, paramsQuery: { ...state.paramsQuery, ...payload } };
    },
  },
  subscriptions: {},
};
