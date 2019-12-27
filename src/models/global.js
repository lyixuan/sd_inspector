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
    // layoutImage: 'http://img13.360buyimg.com/img/jfs/t1/92535/17/8181/251487/5e01a847E66e65495/05e9f53fdbf50410.png'
    headerImage: '',
    layoutImage: '',
    animation: {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAsVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+3mHKcAAAAOnRSTlMACq/12+wV+TyqlI/yXxGfdAZ5LN/EWyZva+bTVR0ORksiUMyXN8gYZuNif0CapNi/MrpC6bWDyYdZAVgV8AAAEExJREFUeNrcnOtyokwYhF9ARQVEEY8EFQ/RxJiYTYym7//CvpphmEETA180a9znx65VWjhtdzvDW+7Sj6OtDNPV6PqZAoBL148NACZdP1yIQddPFQBWdP00qra9+hfKTjTq0b/BuEv/Bv+MkBuPrhptRjHOkmJm19l5HbedtJDOLXS6RnTArLMH9zv2Z93ElQrRqgA3pWtxO4DqdUaL6MHnpnQtbof/QFdLbMp0c9V2KFOA67ZDmnL9dghT7vpXb0eMdZ3fuoKx7nwU4uhjujZs4E9InNWGOOEfwKZrYwvAXhDDXRNjYQPY0rVRcwFhyuNa2AG4Nbo+Rn1hij4RdvRHdJUkpujBFduRNqVvX7MdaVMub0fNcxeN00053Y5Gz/VqJ+jwAWxON+V0O1jHCgP6Lh4YD8mn4t3Qt3iyvzt9SdIwBKNO32UFhkMxDqBRPhaTaYkkfkpIaTpZUD40oE0xPTCq9F0WYDQpZpp7FN0BUFT29aEmQ0UAnZy9MOTSn8G4/37FNgD8kGImaFE26n0riSk2EjsqYDxTPm7lgabpA9Ab9H0enGbzNoxVmfm9dYGUKQYGyg7AzT/HN+O1z25LTeeBTuU5iPhfsi1hkzJga1amADVpB1OXRTQXpRTmlSchnYVZ0OSFEW1pmtlpTS+7AczT0rJwYIg3AhZE9FKI6Ew8+M1U15fAiii/KTUgUrqyWQFekskp0UjpOJ2X/kx1XQd6JMk2pQfUlR3ZdOVEsoUJjftNOiPjYll2vQ/MSJBtiuI1535aBu5k251ik85KW+6Mc8DUSJBtiuSx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',
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
