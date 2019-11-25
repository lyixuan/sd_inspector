import { message } from 'antd';
import { getBannerList, getCollegeList, getCourseType } from './services';
import { msgF } from '@/utils/utils';

export default {
  namespace: 'cubePlan',

  state: {
    screenRange: 'small_screen',
    bannerList: [],
    collegeList: [],
    courseList: [],
  },

  effects: {
    *getBannerList({ payload }, { call, put }) {
      const result = yield call(getBannerList);
      const bannerList = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { bannerList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    *getCollegeList({ payload }, { call, put }) {
      const result = yield call(getCollegeList, { payload });
      const collegeList = result.data || [];
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { collegeList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    *getCourseType({ payload }, { call, put }) {
      const result = yield call(getCourseType, { payload });
      const courseList = result.data || [];
      courseList.forEach(item => {
        item.children.forEach(v => {
          delete v.children;
        });
      });
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { courseList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    checkScreen(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {},
};
