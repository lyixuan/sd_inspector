import { message } from 'antd/lib/index';
import { getAchievementList } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'createIncome',

  state: {
    achievementList: [], // 绩效包列表
  },

  effects: {
    *getAchievementList({ payload }, { call, put }) {
      const result = yield call(getAchievementList);
      if (result.code === 20000) {
        const {list:achievementList} = result.data;
        yield put({ type: 'save', payload: { achievementList } });
      } else {
        message.error(msgF(result.msg,result.msgDetail));
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
