import { message } from 'antd/lib/index';
import { downBlob, msgF } from '@/utils/utils';
import { queryUserCount, exportData, getTableList, getKOEnumList, getUserGroupList, createUserGroup} from './services';

export default {
  namespace: 'examPlatformModal',

  state: {
    userCount: 0,
    collegeList: [],
    userConfigData: {
      province: [
        '湖南', '山东', '新疆维吾尔自治区', '浙江', '辽宁', '山西', '广东', '江苏', '四川',
        '福建', '云南', '上海', '吉林', '河南', '北京', '青海', '海南', '湖北', '江西', '甘肃',
        '陕西', '黑龙江', '重庆', '宁夏回族自治区', '广西壮族自治区', '内蒙古自治区', '贵州', '河北', '安徽', '天津'],
      ordStatusCode: [{ id: 'PAID', name: '已支付' }, { id: 'FREEZED', name: '已冻结' }, { id: 'EXPIRED', name: '已过服务期' }],
      wechatBinded: ['未绑定', '已绑定'],
      pushType: ['报考', '新生注册', '现场确认', '补报名', '缴费'],
      pushed: ['未通知', '已通知'],
      pushOpenStatus: ['未读', '已读'],
    }, // 以上是用户变量
    pageSize: 15,
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
      const response = yield call(getKOEnumList, {type: 9});
      if (response.code === 20000) {
        const data = Array.isArray(response.data) ? response.data : [];
        yield put({ type: 'saveOrgIdList', payload: { orgIdList: data[0].enumData } });
      } else {
        message.error(msgF(response.msg, response.msgDetail));
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
      const result = yield call(createUserGroup, { ...payload.params, groupType: 1}); // 1 - 报考通知 2 - KO运营
      if (result && result.code && result.code === 20000) {
        yield put({ type: 'getUserGroupList'}); // 创建用户组成功后更新配置信息
        if (callback && typeof callback === 'function') callback()
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
          payload: { userGroupListConfig: groupList }
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
