import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'

@connect(({ loading }) => ({
  // loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      profitList: [{
        "cpName": "",
        "creditRankingCoefficient": 0.5,
        "dimensionList": [{
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "id": 37,
                "name": "有效直播",
                "num": 233,
                "score": "1.19",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 38,
                "name": "有效重播",
                "num": 323,
                "score": "0.83",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 36,
              "name": "有效出勤",
              "num": 0,
              "score": "2.02",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 40,
                "name": "课后作业",
                "num": 653,
                "score": "3.34",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 41,
                "name": "智能推题",
                "num": 122,
                "score": "0.00",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 39,
              "name": "有效做题",
              "num": 0,
              "score": "3.34",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 33,
                "name": "主帖",
                "num": 20,
                "score": "0.02",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 34,
                "name": "跟帖",
                "num": 8,
                "score": "0.00",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 8,
              "name": "社区运营",
              "num": 0,
              "score": "0.02",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 43,
                "name": "听课最高档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 44,
                "name": "听课中间档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 45,
                "name": "听课最低档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 42,
              "name": "创收学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 49,
                "name": "调增学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 48,
              "name": "调增学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 2,
            "name": "正面均分",
            "num": 0,
            "score": "5.38",
            "scoreRatio": "",
            "unit": ""
          }, {
            "children": [{
              "children": [{
                "children": [],
                "id": 20,
                "name": "工单初次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 21,
                "name": "工单二次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 22,
                "name": "工单三次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 19,
              "name": "工单减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 24,
                "name": "事件",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 25,
                "name": "班投",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 26,
                "name": "退费",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 27,
                "name": "投诉",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 23,
              "name": "底线减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 47,
                "name": "退挽",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 46,
              "name": "退挽",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 12,
                "name": "开班电话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 13,
                "name": "随堂考",
                "num": 16,
                "score": "1.52",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 11,
              "name": "优新学分",
              "num": 0,
              "score": "1.52",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 29,
                "name": "一级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 30,
                "name": "二级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 31,
                "name": "三级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 28,
              "name": "质检减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 15,
                "name": "未回复会话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 16,
                "name": "不满意会话",
                "num": 1,
                "score": "-0.38",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 17,
                "name": "不及时消息",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 14,
              "name": "IM减分",
              "num": 0,
              "score": "-0.38",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 51,
                "name": "调减学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 50,
              "name": "调减学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 10,
            "name": "负面均分",
            "num": 0,
            "score": "1.14",
            "scoreRatio": "",
            "unit": ""
          }],
          "id": 1,
          "name": "学分均分",
          "num": 0,
          "score": "6.52",
          "scoreRatio": "",
          "unit": ""
        }],
        "groupId": 139,
        "groupName": "狐逻财经1组",
        "primaryKey": 139,
        "ranking": 16,
        "rankingFlag": 0
      }, {
        "cpName": "",
        "creditRankingCoefficient": 2,
        "dimensionList": [{
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "id": 37,
                "name": "有效直播",
                "num": 50,
                "score": "3.45",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 38,
                "name": "有效重播",
                "num": 100,
                "score": "3.45",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 36,
              "name": "有效出勤",
              "num": 0,
              "score": "6.90",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 40,
                "name": "课后作业",
                "num": 198,
                "score": "13.66",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 41,
                "name": "智能推题",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 39,
              "name": "有效做题",
              "num": 0,
              "score": "13.66",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 33,
                "name": "主帖",
                "num": 27,
                "score": "0.03",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 34,
                "name": "跟帖",
                "num": 9,
                "score": "0.01",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 8,
              "name": "社区运营",
              "num": 0,
              "score": "0.04",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 43,
                "name": "听课最高档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 44,
                "name": "听课中间档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 45,
                "name": "听课最低档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 42,
              "name": "创收学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 49,
                "name": "调增学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 48,
              "name": "调增学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 2,
            "name": "正面均分",
            "num": 0,
            "score": "20.59",
            "scoreRatio": "",
            "unit": ""
          }, {
            "children": [{
              "children": [{
                "children": [],
                "id": 20,
                "name": "工单初次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 21,
                "name": "工单二次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 22,
                "name": "工单三次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 19,
              "name": "工单减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 24,
                "name": "事件",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 25,
                "name": "班投",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 26,
                "name": "退费",
                "num": 1,
                "score": "-0.09",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 27,
                "name": "投诉",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 23,
              "name": "底线减分",
              "num": 0,
              "score": "-0.09",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 47,
                "name": "退挽",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 46,
              "name": "退挽",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 12,
                "name": "开班电话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 13,
                "name": "随堂考",
                "num": 18,
                "score": "1.64",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 11,
              "name": "优新学分",
              "num": 0,
              "score": "1.64",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 29,
                "name": "一级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 30,
                "name": "二级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 31,
                "name": "三级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 28,
              "name": "质检减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 15,
                "name": "未回复会话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 16,
                "name": "不满意会话",
                "num": 4,
                "score": "-1.20",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 17,
                "name": "不及时消息",
                "num": 3,
                "score": "-0.49",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 14,
              "name": "IM减分",
              "num": 0,
              "score": "-1.69",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 51,
                "name": "调减学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 50,
              "name": "调减学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 10,
            "name": "负面均分",
            "num": 0,
            "score": "-0.14",
            "scoreRatio": "",
            "unit": ""
          }],
          "id": 1,
          "name": "学分均分",
          "num": 0,
          "score": "20.45",
          "scoreRatio": "",
          "unit": ""
        }],
        "groupId": 140,
        "groupName": "狐逻财经2组",
        "primaryKey": 140,
        "ranking": 3,
        "rankingFlag": -2
      }, {
        "cpName": "",
        "creditRankingCoefficient": 0.5,
        "dimensionList": [{
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "id": 37,
                "name": "有效直播",
                "num": 177,
                "score": "0.87",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 38,
                "name": "有效重播",
                "num": 313,
                "score": "0.77",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 36,
              "name": "有效出勤",
              "num": 0,
              "score": "1.63",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 40,
                "name": "课后作业",
                "num": 622,
                "score": "3.05",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 41,
                "name": "智能推题",
                "num": 1443,
                "score": "0.03",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 39,
              "name": "有效做题",
              "num": 0,
              "score": "3.08",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 33,
                "name": "主帖",
                "num": 13,
                "score": "0.01",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 34,
                "name": "跟帖",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 8,
              "name": "社区运营",
              "num": 0,
              "score": "0.01",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 43,
                "name": "听课最高档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 44,
                "name": "听课中间档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 45,
                "name": "听课最低档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 42,
              "name": "创收学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 49,
                "name": "调增学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 48,
              "name": "调增学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 2,
            "name": "正面均分",
            "num": 0,
            "score": "4.73",
            "scoreRatio": "",
            "unit": ""
          }, {
            "children": [{
              "children": [{
                "children": [],
                "id": 20,
                "name": "工单初次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 21,
                "name": "工单二次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 22,
                "name": "工单三次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 19,
              "name": "工单减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 24,
                "name": "事件",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 25,
                "name": "班投",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 26,
                "name": "退费",
                "num": 3,
                "score": "-0.19",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 27,
                "name": "投诉",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 23,
              "name": "底线减分",
              "num": 0,
              "score": "-0.19",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 47,
                "name": "退挽",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 46,
              "name": "退挽",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 12,
                "name": "开班电话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 13,
                "name": "随堂考",
                "num": 17,
                "score": "1.54",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 11,
              "name": "优新学分",
              "num": 0,
              "score": "1.54",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 29,
                "name": "一级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 30,
                "name": "二级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 31,
                "name": "三级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 28,
              "name": "质检减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 15,
                "name": "未回复会话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 16,
                "name": "不满意会话",
                "num": 5,
                "score": "-1.01",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 17,
                "name": "不及时消息",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 14,
              "name": "IM减分",
              "num": 0,
              "score": "-1.01",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 51,
                "name": "调减学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 50,
              "name": "调减学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 10,
            "name": "负面均分",
            "num": 0,
            "score": "0.33",
            "scoreRatio": "",
            "unit": ""
          }],
          "id": 1,
          "name": "学分均分",
          "num": 0,
          "score": "5.06",
          "scoreRatio": "",
          "unit": ""
        }],
        "groupId": 141,
        "groupName": "狐逻财经3组",
        "primaryKey": 141,
        "ranking": 17,
        "rankingFlag": 0
      }, {
        "cpName": "",
        "creditRankingCoefficient": 0.8,
        "dimensionList": [{
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "id": 37,
                "name": "有效直播",
                "num": 231,
                "score": "1.53",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 38,
                "name": "有效重播",
                "num": 354,
                "score": "1.17",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 36,
              "name": "有效出勤",
              "num": 0,
              "score": "2.70",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 40,
                "name": "课后作业",
                "num": 646,
                "score": "4.27",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 41,
                "name": "智能推题",
                "num": 1894,
                "score": "0.04",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 39,
              "name": "有效做题",
              "num": 0,
              "score": "4.31",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 33,
                "name": "主帖",
                "num": 21,
                "score": "0.02",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 34,
                "name": "跟帖",
                "num": 5,
                "score": "0.00",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 8,
              "name": "社区运营",
              "num": 0,
              "score": "0.02",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 43,
                "name": "听课最高档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 44,
                "name": "听课中间档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 45,
                "name": "听课最低档",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 42,
              "name": "创收学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 49,
                "name": "调增学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 48,
              "name": "调增学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 2,
            "name": "正面均分",
            "num": 0,
            "score": "7.03",
            "scoreRatio": "",
            "unit": ""
          }, {
            "children": [{
              "children": [{
                "children": [],
                "id": 20,
                "name": "工单初次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 21,
                "name": "工单二次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 22,
                "name": "工单三次减分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 19,
              "name": "工单减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 24,
                "name": "事件",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 25,
                "name": "班投",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 26,
                "name": "退费",
                "num": 2,
                "score": "-0.13",
                "scoreRatio": "",
                "unit": "次"
              }, {
                "children": [],
                "id": 27,
                "name": "投诉",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 23,
              "name": "底线减分",
              "num": 0,
              "score": "-0.13",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 47,
                "name": "退挽",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 46,
              "name": "退挽",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 12,
                "name": "开班电话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 13,
                "name": "随堂考",
                "num": 19,
                "score": "1.22",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 11,
              "name": "优新学分",
              "num": 0,
              "score": "1.22",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 29,
                "name": "一级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 30,
                "name": "二级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }, {
                "children": [],
                "id": 31,
                "name": "三级质检",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "分"
              }],
              "id": 28,
              "name": "质检减分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 15,
                "name": "未回复会话",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 16,
                "name": "不满意会话",
                "num": 1,
                "score": "-0.21",
                "scoreRatio": "",
                "unit": "个"
              }, {
                "children": [],
                "id": 17,
                "name": "不及时消息",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 14,
              "name": "IM减分",
              "num": 0,
              "score": "-0.21",
              "scoreRatio": "",
              "unit": ""
            }, {
              "children": [{
                "children": [],
                "id": 51,
                "name": "调减学分",
                "num": 0,
                "score": "0",
                "scoreRatio": "",
                "unit": "个"
              }],
              "id": 50,
              "name": "调减学分",
              "num": 0,
              "score": "0",
              "scoreRatio": "",
              "unit": ""
            }],
            "id": 10,
            "name": "负面均分",
            "num": 0,
            "score": "0.89",
            "scoreRatio": "",
            "unit": ""
          }],
          "id": 1,
          "name": "学分均分",
          "num": 0,
          "score": "7.91",
          "scoreRatio": "",
          "unit": ""
        }],
        "groupId": 215,
        "groupName": "狐逻财经4组",
        "primaryKey": 215,
        "ranking": 14,
        "rankingFlag": 0
      }]
    }
  }
  componentDidMount() {


  }
  fillDataSource() {
    this.state.profitList.map(item => {
      item.child = this.flatTree(item.dimensionList[0])
      item.obj = {};
      this.flatTree(item.dimensionList[0]).map(item2 => {
        item.obj[item2.id] = item2
      })
    })

    return this.state.profitList
  }

  flatTree({ id, name, score, children }, flag = 1, result = [], pid = "", level = 1) {
    result = [{ id, name, score, pid, level, flag }]
    if (Array.isArray(children) && children.length) {
      children.reduce((result, data, currentIndex, arr) => {
        if (data.name === '负面均分') {
          result.push(...this.flatTree(data, 2, result, id, level + 1))
        } else {
          result.push(...this.flatTree(data, flag, result, id, level + 1))
        }
        // result.push(...this.flatTree(data, result, id, level + 1))
        return result
      }, result)
    }
    return result
  }

  columns = () => {
    const columns = [
      {
        title: '集团排名',
        dataIndex: 'creditRanking',
        fixed: 'left',
        key: 'creditRanking',
        render: (text, record) => {
          let src = null;
          let className = '';
          if (record.rankingFlag == 1) {
            src = up
          } else if (record.rankingFlag == 2) {
            src = down
          } else {
            className = 'normal'
            src = normal
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {text}<img className={styles.changes} src={src} />
            </div>
          )
        },
        width: 80
      }, {
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
        fixed: 'left',
        width: 100
      }, {
        title: '运营长',
        dataIndex: 'cpName',
        key: 'cpName',
        fixed: 'left',
        width: 80
      }, {
        title: '排名系数',
        fixed: 'left',
        dataIndex: 'creditRankingCoefficient',
        key: 'creditRankingCoefficient',
        width: 80
      },
    ];
    if (this.fillDataSource().length > 0) {
      const arr = this.fillDataSource()[0].child
      let className = ''
      arr.map(item => {
        if (item.level >= 4) return;
        if (item.flag == 1 && item.level != 1) {
          className = styles.bgColor
        } else if (item.flag == 2) {
          className = styles.bgColor2
        }
        columns.push({
          title: item.name,
          dataIndex: item.id,
          key: item.id,
          width: 100,
          fixed: item.name == '学分均分' ? 'left' : '',
          className: className,
          render: (text, record) => {
            if (record.obj[item.id].name == '正面均分') {
              return <div>
                <div>{record.obj[item.id].score}</div>
                <SmallProgress isColor="green" percent="20%"></SmallProgress>
              </div>
            }
            if (record.obj[item.id].name == '负面均分') {
              let isColor = 'green';
              if (record.obj[item.id].score < 0) {
                isColor = 'red';
              }
              return <div>
                <div style={{ paddingLeft: '40px' }}>{record.obj[item.id].score}</div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '44px' }}>{record.obj[item.id].score < 0 ? <SmallProgress isColor={isColor} percent="20%"></SmallProgress> : null}</div>
                  <div style={{ width: '44px' }}>{record.obj[item.id].score > 0 ? <SmallProgress isColor={isColor} percent="20%"></SmallProgress> : null}</div>
                </div>

              </div>
            }
            return <div>{record.obj[item.id].score}</div>
          }
        })
      })
    }

    return columns || [];
  };

  render() {
    const { profitList = [] } = this.state;
    return (
      <div className={styles.tableList}>
        <BITable
          columns={this.columns()}
          dataSource={profitList}
          pagination={false}
          loading={this.props.loading}
          rowKey={record => record.id}
          scroll={{ x: 'max-content', y: 420 }}
        />
      </div>

    );
  }
}

export default ProfitList;
