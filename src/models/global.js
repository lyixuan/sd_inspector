import { queryNotices } from '@/services/user';
import { msgF } from '@/utils/utils';
import { message } from 'antd/lib/index';
import { getBasicInfo } from '@/pages/ko/behaviorPath/services';
import {getThemeData} from '@/services/api';


export default {
  namespace: 'global',

  state: {
    collapsed: true,
    notices: [],
    globalUserTypes: {
      'admin': '管理员',
      'boss': '管理员',
      'class': '班主任',
      'college': '院长',
      'csleader': '客诉组长',
      'csmanager': '客诉经理',
      'csofficer': '客诉专员',
      'cssupervisor': '客诉主管',
      'family': '家族长',
      'group': '运营长',
      'others': '无绩效岗位',
    },
    tempLogo: null,
    headerBackgroundColor: null,
    layoutBackgroundColor: null,
    headerImage: null,
    layoutImage: null,
    pmsdkImage: null,
    animation: null
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        })
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
    *getBasicInfo({ payload }, { call, put }) {
      const params = payload.params;
      if(!params || !params.stuId){
        return;
      }
      if(params.stuId>2147483647){
        message.warn('学员ID不合法');
        return;
      }
      const result = yield call(getBasicInfo, params);
      if (result.code !== 20000) {
        message.warn(result.msgDetail);
      } else {
        let params1 = {
          userId: params.stuId,
          target: 'userName',
        };
        window.open(`/inspector/ko/behaviorPath?params=${JSON.stringify(params1)}`);
      }
    },
    *getThemeInfo({payload}, {call, put}) {
      let res = yield call(getThemeData);
      if (res && res.code === 20000) {
        let data = res.data;
        yield put({
          type: 'saveThemeData',
          payload: data
        })
      } else {}
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    saveThemeData(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        document.documentElement.scrollTop = 0;
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
