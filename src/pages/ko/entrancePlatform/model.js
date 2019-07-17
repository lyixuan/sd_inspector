import { queryUserCount, exportData, getTableList, getUserGroupList, createUserGroup} from './services';
import { getKOEnumList, getKoDateRange } from '@/pages/ko/services';
import { userGroupCheck } from '@/pages/ko/userList/services';
import { downBlob, msgF } from '@/utils/utils';
import { message } from 'antd/lib/index';
export default {
  namespace: 'examPlatformModal',

  state: {
    userCount: 0,
    collegeList: [],
    groupCheckFlag:false,
    koDateRange: {},
    userConfigData: {
      province: [
        '安徽',
        '北京',
        '重庆',
        '福建',
        '甘肃', '广东', '贵州', '广西壮族自治区',
        '河北', '河南', '湖南', '海南', '湖北', '黑龙江',
        '江苏', '江西', '吉林',
        '辽宁',
        '宁夏回族自治区', '内蒙古自治区',
        '青海',
        '上海', '山西', '山东', '四川', '陕西',
        '天津',
        '新疆维吾尔自治区',
        '云南',
        '浙江',
      ],
      ordStatusCode: [{ id: 'PAID', name: '已支付' }, { id: 'FREEZED', name: '已冻结' }, { id: 'EXPIRED', name: '已过服务期' }],
      wechatBinded: ['未绑定', '已绑定'],
      pushType: ['报考', '新生注册', '现场确认', '补报名', '缴费'],
      pushed: ['未通知', '已通知'],
      pushOpenStatus: ['未读', '已读'],
    }, // 以上是用户变量
    pageSize: 10,
    dataStatisticsList: [],
    statisticsCount: 0, // 总条数
    exportTypeList: [
      { id: 11, name: '导出全部未读学员' },
      { id: 12, name: '导出选中的未读学员' },
      { id: 21, name: '导出全部报表记录' },
      { id: 22, name: '导出选中的报表记录' },
    ],
    userGroupConfig: []
  },

  effects: {
    *getKOEnumList({ payload }, { call, put }) {
      const res1 = yield call(getKOEnumList, {type: 9});
      const res2 = yield call(getKoDateRange);
      if (res1.code === 20000) {
        const data = Array.isArray(res1.data) ? res1.data : [];
        yield put({ type: 'saveOrgIdList', payload: { orgIdList: data[0].enumData } });
      } else {
        message.error(msgF(res1.msg, res1.msgDetail));
      }
      if (res2.code === 2000) {
        const data = Array.isArray(res2.data) ? res2.data : [];
        yield put({ type: 'save', payload: { koDateRange: data } });
      } else {
        message.error(msgF(res2.msg, res2.msgDetail));
      }
    },
    *getUserCount({ payload }, { call, put }) {
      // 列表
      const result = yield call(queryUserCount, payload.params);
      if (result && result.code && result.code === 20000) {
        const data = result.data || {};
        yield put({ type: 'save', payload: { userCount: data.userCount } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *createGroup({ payload, callback }, { call, put }) {
      // 列表
      const params = payload.params;
      if (!params.groupName) {
        message.error('用户群名称不能为空');
        return ;
      }
      const result = yield call(createUserGroup, { ...params, groupType: 1}); // 1 - 报考通知 2 - KO运营
      if (result && result.code && result.code === 20000) {
        yield put({ type: 'getUserGroupList'}); // 创建用户组成功后更新配置信息
        if (callback && typeof callback === 'function') callback()
      } else if (result && result.code && result.code === 20003) {
        message.error('该用户群名称已经存在，请修改后再保存');
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *getUserGroupList({ payload }, { call, put }) {
      const response = yield call(getUserGroupList);
      if (response && response.code === 20000 && response.data) {
        const groupList = response.data.map(item => {
          return { id: item.id, groupName: item.groupName }
        });
        yield put({
          type: 'save',
          payload: { userGroupConfig: groupList }
        });
      }
    },
    *getDataStatistics({ payload, callback }, { call, put }) {
      // 列表
      const result = yield call(getTableList, payload.params);
      if (result && result.code && result.code === 20000) {
        const data = result.data || {};
        yield put({ type: 'save', payload: { dataStatisticsList: data.list, statisticsCount: data.total } });
      } else if (result) {
        message.error(msgF(result.msg, result.msgDetail));
      }
    },
    *exportExcelData({ payload }, { call }) {
      const result = yield call(exportData, payload.params);
      if (result) {
        const { headers } = result.response || {};
        const filename = headers.get('content-disposition') || '';
        const numName = filename.split('filename=')[1]; // 带后缀的文件名
        const numName2 = numName.split('.')[0];   // 纯文件名
        downBlob(result.data, `${eval('\'' + numName2 + '\'')}.xlsx`);
        message.success('导出成功');
      } else if (result && result instanceof Object) {
        message.error(msgF(result.msg, result.msgDetail));
      } else {
        message.error('导出失败');
      }
    },
    *userGroupCheck({ payload, callback }, { call, put }) {
      const params = payload.params;
      const result = yield call(userGroupCheck, params);
      if (result.code === 20000) {
        const groupCheckFlag = result.data.exist;
        yield put({ type: 'save', payload: { groupCheckFlag } });
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else {
        message.error(msgF(result.msg, result.msgDetail));
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveOrgIdList(state, { payload }) {
      return {
        ...state,
        userConfigData: { ...state.userConfigData, ...payload },
      };
    },
  },

  subscriptions: {},
};
