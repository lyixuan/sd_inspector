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
        yield put({ type: 'saveCollege', payload: { collegeList: data[0].enumData } });
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
    saveCollege(state, { payload }) {
      return { ...state, collegeList: getNullNodeList(payload.collegeList)};
    },
  },
  subscriptions: {},
};
function getNullNodeList(data = [], l = 1) {
  data.map(item => {
    if (l === 2) {
      item.nodeList = null;
    } else {
      getNullNodeList(item.nodeList, l + 1);
    }
  });
  return data;
}
