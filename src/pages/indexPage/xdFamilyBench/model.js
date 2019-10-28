import {
  getCurrentIncomeGroup,
  getCurrentIncomeClass,
  getCurrentIncomeTarget,
  getOrgMapList,
  getFamilyRecord,
  getFamilyQuality,
  scoreStatistics,
  scoreDetail,
  incomeCollegeRankList,
  incomeCompanyRankList,
  collegeRankList,
  companyRankList,
  achievementList,
  familyAchievement,
  qualityChargeCount,
  getFamilyScorePk,
  getFamilyRankList,
  getGroupPkList,
  getIncomeFamilyList,
  getFamilyList,
  getCollegeList,
  myFamilyGroupList,
  getIncomeCollegeList,
  getIncomeFamilyGroupPk,
  getUserInfo
} from './services';
import { message } from 'antd/lib/index';
import { msgF } from "@/utils/utils";
import moment from 'moment';
import { thousandsFormat } from '@/utils/utils';

export default {
  namespace: 'xdFamilyModal',
  state: {
    inCometarget: [], // 以下是家族值
    orgList: [], // 保存组织原始结构
    orgListTreeData: [], // 保存组织处理成treeData需要的结构
    familyIncome: [], // 创收
    familyAppeal: {}, // 申诉
    familyQuality: [], // 质检
    familyScoreList: {
      dimensionList: [],
      myGroup: {},
      pkGroup: {}
    },
    familyRankList: [],
    familyIncomeGroup: {}, // 创收对比小组的数据
    familyGroupPkList: {},
    familyKpiInfo: {},
    chargeCount: {}
  },

  effects: {
    // 家族长工作台-绩效详情
    *familyAchievement({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(familyAchievement);
      const result2 = yield call(qualityChargeCount, params);
      if (result.code === 20000) {
        const params = {
          startTime: moment(result.data.kpiStartDate).format('YYYY-MM-DD'),
          endTime: moment(result.data.kpiEndDate).format('YYYY-MM-DD')
        }
        yield put({ type: 'save', payload: { chargeCount: result2.data, familyKpiInfo: result.data, familyKpiTimes: params } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期预估绩效 - 质检扣款金额统计
    *qualityChargeCount({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(qualityChargeCount, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分—集团学分排名
    *companyRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(companyRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分—本学院学分排名
    *collegeRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(collegeRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期绩效—排行榜
    *achievementList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(achievementList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期创收-集团排名
    *incomeCompanyRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(incomeCompanyRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本学院创收排名
    *incomeCollegeRankList({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(incomeCollegeRankList, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分明细
    *scoreDetail({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(scoreDetail, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期学分汇总
    *scoreStatistics({ payload, callback }, { call }) {
      const params = payload.params;
      const result = yield call(scoreStatistics, params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
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
          title: '家族净流水',
          num: thousandsFormat(Math.floor(data.kpiFlow)),
          tip: '本绩效周期内用户所在家族的创收净流水'
        }, {
          title: '绩效排名',
          num: `${data.ranking}/${data.familyCount}`,
          tip: '本绩效周期内用户所在家族创收绩效在集团所有家族中的净流水的排名'
        }, {
          title: '好推绩效',
          num: thousandsFormat(Math.floor(data.goodpushKpi)),
          tip: '本绩效周期内用户所在家族好推绩效'
        }, {
          title: '续报绩效',
          num: thousandsFormat(Math.floor(data.renewalKpi)),
          tip: '本绩效周期内用户所在家族续报绩效'
        }, {
          title: '成本套绩效',
          num: thousandsFormat(Math.floor(data.examZbtKpi)),
          tip: '本绩效周期内用户所在家族成本套绩效'
        }]

        yield put({ type: 'save', payload: { inCometarget } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getCurrentIncomeGroup({ callback }, { call }) {
      const result = yield call(getCurrentIncomeGroup);
      if (result.code === 20000) {
        result.data && result.data.map(item =>item.classCount = item.groupCount)
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
    },
    // 组织列表
    *getOrgMapList({ payload }, { call, put }) {
      const params = payload.params;
      const result = yield call(getOrgMapList, params);
      const orgList = result.data || [];

      if (result.code === 20000) {
        yield put({ type: 'saveMap', payload: { orgList } });
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期申诉
    *getFamilyRecord({ payload }, { call, put }) {
      const result = yield call(getFamilyRecord, payload.params)
      if (result.code === 20000) {
        const familyAppeal = result.data;
        yield put({ type: 'save', payload: { familyAppeal } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 本期质检 - 质检统计
    *getFamilyQuality({ payload }, { call, put }) {
      const result = yield call(getFamilyQuality, payload.params)
      if (result.code === 20000) {
        const familyQuality = result.data;
        yield put({ type: 'save', payload: { familyQuality } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族学分对比
    *getFamilyScorePk({ payload }, { call, put }) {
      const result = yield call(getFamilyScorePk, payload.params)
      if (result.code === 20000) {
        const familyScoreList = result.data;
        yield put({ type: 'save', payload: { familyScoreList } });
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族学分对比右侧家族学分排名
    *getFamilyRankList({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyRankList, payload.params)
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族学分对比的学院列表
    *getCollegeList({ payload, callback }, { call, put }) {
      const result = yield call(getCollegeList, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  小组学分对比
    *getGroupPkList({ payload, callback }, { call, put }) {
      const result = yield call(getGroupPkList, payload.params);
      const familyGroupPkList = result.data;
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { familyGroupPkList } });
        if (callback && typeof callback === 'function') {
          callback(result.data.groupList);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  小组学分设置对比下拉
    *myFamilyGroupList({ payload, callback }, { call, put }) {
      const result = yield call(myFamilyGroupList, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    //  家族创收对比
    *getIncomeFamilyList({ payload, callback }, { call }) {
      const result = yield call(getIncomeFamilyList, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的家族绩效列表
    *getFamilyList({ payload, callback }, { call, put }) {
      const result = yield call(getFamilyList, payload.params);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比右侧的学院列表
    *getIncomeCollegeList({ callback }, { call }) {
      const result = yield call(getIncomeCollegeList);
      if (result.code === 20000) {
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    // 家族创收对比-小组创收对比
    *getIncomeFamilyGroupPk({ payload, callback }, { call, put }) {
      const result = yield call(getIncomeFamilyGroupPk, payload.params);
      if (result.code === 20000) {
        yield put({ type: 'save', payload: { familyIncomeGroup: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data.colName);
        }
      } else if (result && result.code !== 50000) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserInfo({ callback }, { call, put }) {
      const result = yield call(getUserInfo);
      if (result.code === 20000 && result.data) {
        yield put({ type: 'save', payload: { userInfo: result.data } });
        if (callback && typeof callback === 'function') {
          callback(result.data);
        }
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMap(state, { payload }) {
      const orgListTreeData = toTreeData(payload.orgList);
      return { ...state, orgList: payload.orgList, orgListTreeData };
    },
  },
  subscriptions: {},
};
function toTreeData(orgList) {
  const treeData = [];
  orgList.forEach(v => {
    const o = { title: v.name, value: `a-${v.id}`, key: v.id, selectable: false, lv: 1 };
    if (v.nodeList.length > 0) {
      o.children = [];
      v.nodeList.forEach(v1 => {
        const o1 = { title: v1.name, value: `b-${v1.id}`, key: v1.id + 1000, selectable: false, lv: 2 };
        o.children.push(o1);
        if (v1.nodeList.length > 0) {
          o1.children = [];
          v1.nodeList.forEach(v2 => {
            const o2 = { title: v2.name, value: `c-${v2.id}`, key: v2.id + 100000, lv: 3 };
            o1.children.push(o2);
          });
        }
      });
    }
    treeData.push(o);
  });
  return treeData;
}
