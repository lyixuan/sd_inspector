import {
  getContrastIncomeKpiPkList,
  getIncomeKpiPkList,
  getIncomeKpiPersonInfo,
  getCountCurrentQuality,
  getCountAppealRecord,
  kpiLevelList,
  groupList,
  groupPkList,
  getKpiInfo,
  isShowPermission,
  getCurrentIncomeGroup,
  getCurrentIncomeClass,
  getCurrentIncomeTarget
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";
import moment from 'moment';

export default {
  namespace: 'xdWorkModal',
  state: {
    kipInfo: null,
    kpiLevelList: null,
    groupList: null,
    groupPkList: {},
    kpiTimes: null,
    inCometarget: [{
      title1: '家族净流水',
      num: 2000,
    }, {
      title1: '绩效排名',
      num: 2000
    }, {
      title1: '好推绩效',
      num: 2000
    }, {
      title1: '续报绩效',
      num: 2000
    }, {
      title1: '成本套绩效',
      num: 2000
    }], // 以下是家族值
  },

  effects: {
    // 本期创收
    *getContrastIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getContrastIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPkList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPkList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result.code === 50000) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getIncomeKpiPersonInfo({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getIncomeKpiPersonInfo, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data === null ? '' : result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },

    // 本期质检
    *getCountCurrentQuality({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountCurrentQuality, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 我的申诉
    *getCountAppealRecord({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(getCountAppealRecord, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 以下是本期学分相关的接口
    // 本期学分人均在服人员下拉里面的数据
    *kpiLevelList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(kpiLevelList, params)
      if (result.code === 20000) {
        const kpiLevelList = result.data || {};
        yield put({ type: 'save', payload: { kpiLevelList } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 获取右侧的列表数据
    *groupList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  获取左侧的列表数据
    *groupPkList({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(groupPkList, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //判断是否显示本期学分的模块
    *isShowPermission({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(isShowPermission, params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result);
        }
      } else if (result.code === 20002) {
        if (callback && typeof callback === 'function') {
          callback(result);
        }
        // message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getKpiInfo({ callback }, { call, put }) {
      const result = yield call(getKpiInfo, {})
      if (result.code === 20000) {
        const params = {
          startTime: moment(result.data.kpiStartDate).format('YYYY-MM-DD'),
          endTime: moment(result.data.kpiEndDate).format('YYYY-MM-DD')
        }
        yield put({ type: 'save', payload: { kpiTimes: params } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // ====================家族
    // 创收明细
    *getCurrentIncomeTarget(_, { call, put }) {
      const result = yield call(getCurrentIncomeTarget)
      if (result.code === 20000) {
        const data = result.data;
        const inCometarget = [{
          title1: '家族净流水',
          num: data.kpiFlow,
        }, {
          title1: '绩效排名',
          num: data.ranking
        }, {
          title1: '好推绩效',
          num: data.goodpushKpi
        }, {
          title1: '续报绩效',
          num: data.renewalKpi
        }, {
          title1: '成本套绩效',
          num: data.examZbtKpi
        }]
        
        yield put({ type: 'save', payload: { inCometarget } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentIncomeGroup({ callback }, { call }) {
      const result = yield call(getCurrentIncomeGroup)
      if (result.code === 20000) {

        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentIncomeClass({ callback }, { call }) {
      const result = yield call(getCurrentIncomeClass)
      if (result.code === 20000) {

        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
