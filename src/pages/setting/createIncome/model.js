import { message } from 'antd/lib/index';
import { getAchievementList, getArchiveList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'createIncome',

  state: {
    achievementList: [], // 绩效包列表
    archiveList: [],
  },

  effects: {
    *getAchievementList({ payload }, { call, put }) {
      const result = yield call(getAchievementList);
      if (result.code === 20000) {
        const { list: achievementList } = result.data;
        yield put({ type: 'save', payload: { achievementList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 获取创收绩效存档包内容
    *getArchiveList({ payload }, { call, put }) {
      const result = yield call(getArchiveList);
      if (result.code === 20000) {
        const { list: archiveList } = result.data;
        yield put({ type: 'save', payload: { getArchiveList } });
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
