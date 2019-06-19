import { message } from 'antd';
import { sankeySuperApi } from '@/pages/ko/behaviorAnalyze/services';

// 处理成柱状图需要的数据（dataList:整合过的数据源,dataArr：柱状图数据分类)
function getData(dataList, dataArr) {
  const dataObj = {};
  dataArr.forEach(item => {
    dataObj[item] = [];
    dataList.forEach((item1) => {
      if (item === 'choiceLessonPercent') {
        item1[item] = item1[item] && item1[item].split('%')[0];
      }
      dataObj[item].push({ name: item1, value: item1[item] });
    });
  });
  return dataObj;
}

// 首页：需要把 课程公开计划选项 子项求和计算，重新整合数据源  极速首页和主首页
function dealHomeData(behaviourData) {
  let newKey = {
    name: '课程公开计划选项',
    actionKeyId: 'homepage_click_ko_item',
    clickNum: 0,
    choicePerson: 0,
    clickTotalPerson: 0,
  };
  behaviourData.forEach((item) => {
    if (item.actionKey === 'click_ko_item') {
      newKey.clickNum += Number(item.clickNum);
      newKey.choicePerson += Number(item.choicePerson);
      newKey.clickTotalPerson += Number(item.clickTotalPerson);
    }
  });
  const newbehaviourData = behaviourData.filter(item => item.actionKey !== 'click_ko_item');
  newbehaviourData.push(newKey);
  return newbehaviourData;
}

// 学习页：需要把 直播重播等数据求和
function dealStudyPage(data, dealObj, delItemArr, page) {
  let behaviourData = JSON.parse(JSON.stringify(data));
  const newbehaviourData = [];
  dealObj.forEach(items => {
    let newKey = { actionKey: items.name, clickNum: 0, choicePerson: 0, clickTotalPerson: 0 };
    items.list.forEach((el) => {
      behaviourData.forEach((item) => {
        if (el === item.actionKeyId) {
          newKey.name = item.name;
          newKey.actionKeyId = `${page}_${items.name}`;
          newKey.clickNum += Number(item.clickNum);
          newKey.choicePerson += Number(item.choicePerson);
          newKey.clickTotalPerson += Number(item.clickTotalPerson);
        }
      });
    });
    newKey.choiceLessonPercent = !newKey.clickTotalPerson ? '0%' : `${((newKey.choicePerson / newKey.clickTotalPerson) * 100).toFixed(2)}%`;
    newbehaviourData.push(newKey);
  });
  delItemArr.forEach(el => {
    behaviourData.forEach((item, i) => {
      if (item.actionKeyId === el) behaviourData.splice(i, 1);
    });
  });
  return behaviourData.concat(newbehaviourData);
}

export default {
  namespace: 'behavior',

  state: {
    pvuvData: {},   // 仪表盘
    hotDataList: {},   // 热力图数据
    upPage: {},        // 桑吉图上游数据
    downPage: {},      // 桑吉图下游数据
    behaviourData: [], // 柱状图
    currentPage: '',   // 当前页面
    currentActionName: '',   // 当前二级页面名称
    userSize: 0,   //用户数量
  },
  effects: {
    * getSankeyList({ payload }, { call, put }) {
      const params = payload.params;
      const formParams = payload.formParams;
      const otherParams = payload.otherParams;
      const result = yield call(sankeySuperApi, { params, formParams, otherParams });
      if (result && result.code === 20000) {
        const { behaviourData = [], sankeyData = {}, pvuvData, currentPage, currentActionName, userSize, clickPersons, clickNum } = result.data;
        const upPage = sankeyData.upPageData || {};
        const downPage = sankeyData.downPageData || {};
        yield put({
          type: 'saveDataList',
          payload: { hotDataList: behaviourData, pvuvData, clickNum, currentPage, currentActionName },
        });
        yield put({ type: 'saveBehaviourData', payload: { behaviourData, currentPage } });
        yield put({ type: 'save', payload: { userSize, pvuvData, upPage, downPage, currentPage } });
        yield put({
          type: 'koPlan/saveUserData',
          payload: { usersData: { totalCount: userSize } },
        });
      } else {
        message.error(result.msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveBehaviourData(state, { payload }) {
      const { behaviourData, currentPage } = payload;
      //  ['name', 'clickNum', 'choiceLessonPercent']数组的字符串跟接口返回的字段一致，否则option那块取值报错
      let newData = [];
      if (behaviourData && behaviourData.length) {
        let newbehaviourData = [];
        const studyList = [
          { name: 'click_golesson', list: ['studypage_click_golesson$-1', 'studypage_click_golesson_free$-1'] },
          {
            name: 'click_livebroadcast',
            list: ['studypage_click_livebroadcast_free$-1', 'studypage_click_livebroadcast$-1'],
          },
          { name: 'click_record', list: ['studypage_click_record_free$-1', 'studypage_click_record$-1'] },
        ];
        const homepageLsit = [{
          name: 'click_testregion',
          list: ['homepage_click_testregion$-1', 'homepage_Click_city$-1'],
        }];
        const majordetailLsit = [{
          name: 'click_intro_class',
          list: ['majordetail_click_intro _class$-1', 'majordetail_click_intro_class$-1'],
        }];
        if (currentPage === 'homepage') {
          newbehaviourData = dealStudyPage(behaviourData, homepageLsit, ['homepage_click_testregion', 'homepage_click_testregion$-1', 'homepage_Click_city$-1'], 'homepage');
          newbehaviourData = newbehaviourData.filter(item => item.actionKeyId !== 'homepage_click_ko_item$-1');
        } else if (currentPage === 'studypage') {
          newbehaviourData = dealStudyPage(behaviourData, studyList, ['studypage_click_golesson', 'studypage_click_livebroadcast', 'studypage_click_record', 'studypage_click_golesson$-1', 'studypage_click_golesson_free$-1', 'studypage_click_livebroadcast_free$-1', 'studypage_click_livebroadcast$-1', 'studypage_click_record_free$-1', 'studypage_click_record$-1'], 'studypage');
        } else if (currentPage === 'majordetail') {
          newbehaviourData = dealStudyPage(behaviourData, majordetailLsit, ['majordetail_click_intro_class', 'majordetail_click_intro _class$-1', 'majordetail_click_intro_class$-1'], 'majordetail');
        } else if (currentPage === 'kolist') {
          newbehaviourData = behaviourData.filter(item => item.actionKeyId !== 'kolist_click_ko_item$-1');
        } else if (currentPage === 'majordetailpage_main') {// 主-专业详情页-班型介绍相加
          var list = [
            {
              name: 'click_intro_class',
              list: ['majordetailpage_main_click_intro _class$-1', 'majordetailpage_main_click_intro_class$-1'],
            },
          ];
          newbehaviourData = dealStudyPage(behaviourData, list, ['majordetailpage_main_click_intro_class', 'majordetailpage_main_click_intro _class', 'majordetailpage_main_click_intro_class$-1'], 'majordetailpage_main');
        } else if (currentPage === 'kogoodslistpage_main') {// 主-ko列表-点击ko课程相加
          var list = [
            {
              name: 'click_goods',
              list: ['kogoodslistpage_main_click_goods$-1','kogoodslistpage_main_click_ko_item$-1', 'kogoodslistpage_main_click_product$-1'],
            },
          ];
          newbehaviourData = dealStudyPage(behaviourData, list, ['kogoodslistpage_main_click_goods', 'kogoodslistpage_main_click_goods$-1', 'kogoodslistpage_main_click_ko_item$-1', 'kogoodslistpage_main_click_product$-1'], 'kogoodslistpage_main');
        } else if (currentPage === 'studypage_main') {// 主-学习页-重播字段相加
          var list = [
            {
              name: 'click_record',
              list: ['studypage_main_click_record_free$-1','studypage_main_click_record$-1'],
            },
          ];
          newbehaviourData = dealStudyPage(behaviourData, list, ['studypage_main_click_record', 'studypage_main_click_record_free$-1','studypage_main_click_record$-1'], 'studypage_main');
        } else {
          newbehaviourData = behaviourData;
        }
        newbehaviourData = newbehaviourData.sort((a, b) => (b.clickNum - a.clickNum));
        newData = getData(newbehaviourData.slice(0, 10), ['name', 'clickNum', 'choiceLessonPercent']);
      }
      return { ...state, behaviourData: newData };
    },
    saveDataList(state, { payload }) {
      const { hotDataList, pvuvData, clickNum } = payload;
      const newData = dealHomeData(hotDataList);
      newData.forEach(item => {
        item.clickPeople = Number(item.clickTotalPerson);
        item.clickPeoplePro = item.clickTotalPerson && pvuvData.uv ? item.clickTotalPerson / pvuvData.uv * 100 : 0;//人数占比
        item.clickNumPro = item.clickNum && clickNum ? item.clickNum / clickNum * 100 : 0;//次数占比
      });
      return { ...state, hotDataList: newData };
    },
  },

  subscriptions: {},
};
