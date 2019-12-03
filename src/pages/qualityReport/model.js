import { message } from 'antd';
import { getOrgMapTreeByRole ,qualitySurveyData,getCurrentDateRange} from './services';
import { msgF } from '@/utils/utils';
import { getTimeRange } from '@/pages/setting/createIncome/services';
import moment from 'moment/moment';

export default {
  namespace: 'qualityReport',

  state: {
    orgTreeList: [],
    surveyData: {},
    startDate:null,
    endDate:null,
    startDateBak:null,
    endDateBak:null,
  },

  effects: {
    *getOrgMapTreeByRole({ payload }, { call, put }) {
      const result = yield call(getOrgMapTreeByRole);
      if (result.code === 20000) {
        const orgListTemp = result.data || [];
        const orgTreeList = toTreeData(orgListTemp);
        yield put({ type: 'save', payload: { orgTreeList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *qualitySurveyData({ payload }, { call, put }) {
      const result = yield call(qualitySurveyData, payload);
      if (result.code === 20000) {
        const surveyData = result.data || {};
        yield put({ type: 'save', payload: { surveyData } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getTimeRange({ payload }, { call, put }) {
      const result = yield call(getTimeRange);
      if (result.code === 20000) {
        const { startDate:activeStartDate, endDate:activeEndDate } = result.data;
        yield put({ type: 'save', payload: { activeStartDate, activeEndDate } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentDateRange({ payload }, { call, put }) {
      const result = yield call(getCurrentDateRange,payload);
      if (result.code === 20000) {
        const { startDate, endDate } = result.data;
        yield put({ type: 'save', payload: { startDate, endDate ,startDateBak:startDate,endDateBak:endDate} });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTime(state, { payload }) {
      return { ...state, ...payload };
    },
    saveTimeReset(state, { payload }) {
      return { ...state, ...payload.params };
    },

  },

  subscriptions: {},
};

function toTreeData(orgList) {
  const treeData = [];
  orgList.forEach(v => {
    const o = { title: v.name, value: `${v.id}` };
    if (v.nodeList.length > 0) {
      o.children = [];
      v.nodeList.forEach((v1, i1) => {
        const o1 = { title: v1.name, value: `${v.id}-${v1.id}` };
        o.children.push(o1);
        if (v1.nodeList.length > 0) {
          o1.children = [];
          v1.nodeList.forEach((v2, i2) => {
            const o2 = { title: v2.name, value: `${v.id}-${v1.id}-${v2.id}` };
            o1.children.push(o2);
          });
        }
      });
    }
    treeData.push(o);
  });
  return treeData;
}
