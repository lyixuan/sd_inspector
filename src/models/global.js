import { queryNotices } from '@/services/user';
import { msgF } from '@/utils/utils';
import { message } from 'antd/lib/index';
import { getBasicInfo } from '@/pages/ko/behaviorPath/services';

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
    tempLogo: '',
    headerBackgroundColor: '#FFE300',
    layoutBackgroundColor: '#282828',
    // headerImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577339920301&di=e3ec4d722744df275615e1dd3c97977e&imgtype=0&src=http%3A%2F%2F1802.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2008%2F5%2F15%2F20%2F9%2F11a90ee902f.jpg',
    // layoutImage: 'http://img13.360buyimg.com/img/jfs/t1/92535/17/8181/251487/5e01a847E66e65495/05e9f53fdbf50410.png',
    headerImage: '',
    layoutImage: '',
    animation: {
      image: 'https://www.deanhan.cn/wp-content/uploads/2017/12/snow.png',
      continueTime: 20000,
      minRadius: 5,
      maxRadius: 10
    }
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
