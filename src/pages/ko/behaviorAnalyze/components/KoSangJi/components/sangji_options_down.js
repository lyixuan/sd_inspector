import { seriesConfig, Config, sangjiColor } from './common_options';
import { thousandsFormat } from '@/utils/utils';

export function getSangJiDownOption(downPage, currentPage) {
  const { node = [], links = [] } = downPage;
  for (let d = 0; d < node.length; d++) {
    if (node[d].id !== currentPage) {
      node[d].itemStyle = {
        normal: {
          color: sangjiColor[d % sangjiColor.length]
        }
      };
    } else {
      node[d].itemStyle = {
        normal: {
          color: "#1D78B3"
        }
      };
    }
    node[d].label = {
      normal: {
        position: 'left'
      }
    };
  }
  // 桑吉图 下游option
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function (param) {
        const { data } = param;
        const { pageView = undefined, id = undefined, proportion = undefined,flowValue = undefined } = data;
        if (id) {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(pageView)}次</div><div>占比：${proportion*100+'%'}</div></div>`
        } else if (pageView) {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(flowValue)}次</div><div>占比：${proportion*100+'%'}</div></div>`
        }
      }
    },
    series: {
      data: node,
      links: links,
      nodeGap: 15,
      label: {
        normal: {
          color: "#000",
          fontSize: 10,
          formatter: function (params, i) {
            if (params.data.id === currentPage) {
              // return "下\n\n游\n\n页\n\n面";
              return "";
            }
            return params.data.name;
          },
          rich: {
            white: {
              fontSize: 10,
              padding: [0, 0, 0, 0]
            }
          }
        }
      },
    }
  };
  option.series = { ...option.series, ...seriesConfig };
  option = { ...option, ...Config };
  return option;
}

// 之前调试模拟的数据
// const node=  [
//   {
//     id: '1-1',
//     name: '商城列表',
//   }, {
//     id: '1-2',
//     name: 'KO课程列表',
//   }, {
//     id: '1-3',
//     name: '热门推荐',
//   }, {
//     id: '1-4',
//     name: '演出经纪免费学',
//   }, {
//     id: '2-1',
//     name: '初级经济师',
//   }, {
//     id: '2-2',
//     name: '基础英语',
//   }, {
//     id: '2-3',
//     name: '幼儿园教师资格证',
//   }, {
//     id: '2-4',
//     name: '普通话水平测试',
//   }, {
//     id: '2-5',
//     name: '英语口语',
//   },{
//     id: '2-6',
//     name: '一级注册消防工程师',
//   },{
//     id: '2-7',
//     name: '人力资源管理师司机',
//   },{
//     id: '2-8',
//     name: '雅思',
//   },{
//     id: '2-9',
//     name: '会记初级职称',
//   },{
//     id: '2-10',
//     name: '房地产经纪人助理',
//   },{
//     id: '3-1',
//     name: '选课',
//   }, {
//     id: '0-1',
//     name: '下游页面',
//     itemStyle:{
//       normal:{
//         color:"#1D78B3",
//       }
//     },
//   }];
//
// const links = [{
//   source: '0-1',
//   sourceName: '下游页面',
//   target: '1-1',
//   targetName: '商城列表',
//   pv:'190',
//   zb: '50%',
//   value: 10
// }, {
//   source: '0-1',
//   sourceName: '下游页面',
//   target: '1-2',
//   targetName: 'KO课程列表',
//   value: 25,
//   pv:'190',
//   zb: '50%',
// }, {
//   source: '0-1',
//   sourceName: '下游页面',
//   target: '1-3',
//   targetName: '热门推荐',
//   value: 3,
//   pv:'190',
//   zb: '50%',
// }, {
//   source: '0-1',
//   sourceName: '下游页面',
//   target: '1-4',
//   targetName: '演出经纪免费学',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '1-2',
//   target: '2-1',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '1-2',
//   target: '2-2',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '1-2',
//   target: '2-3',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '1-2',
//   target: '2-4',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '1-2',
//   target: '2-5',
//   pv:'190',
//   zb: '50%',
//   value: 7
// }, {
//   source: '1-2',
//   target: '2-6',
//   pv:'190',
//   zb: '50%',
//   value: 6
// }, {
//   source: '1-2',
//   target: '2-7',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '1-2',
//   target: '2-8',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '1-2',
//   target: '2-9',
//   pv:'190',
//   zb: '50%',
//   value: 2
// }, {
//   source: '1-2',
//   target: '2-10',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '2-1',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 8
// }, {
//   source: '2-2',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 8
// }, {
//   source: '2-3',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 8
// }, {
//   source: '2-4',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 8
// }, {
//   source: '2-5',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 8
// }, {
//   source: '2-6',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '2-7',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '2-8',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 2
// }, {
//   source: '2-9',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '2-10',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 1
// }, {
//   source: '0-1',
//   target: '2-1',
//   pv:'190',
//   zb: '50%',
//   value: 2
// }, {
//   source: '0-1',
//   target: '2-2',
//   pv:'190',
//   zb: '50%',
//   value: 3
// }, {
//   source: '0-1',
//   target: '2-3',
//   pv:'190',
//   zb: '50%',
//   value: 3
// }, {
//   source: '0-1',
//   target: '2-4',
//   pv:'190',
//   zb: '50%',
//   value: 2
// }, {
//   source: '0-1',
//   target: '2-5',
//   pv:'190',
//   zb: '50%',
//   value: 5
// }, {
//   source: '0-1',
//   target: '2-6',
//   pv:'190',
//   zb: '50%',
//   value: 3
// }, {
//   source: '1-1',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 0.0001,
//   lineStyle:{
//     opacity:0
//   },
// }, {
//   source: '1-3',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 0.0001,
//   lineStyle:{
//     opacity:0
//   },
// }, {
//   source: '1-4',
//   target: '3-1',
//   pv:'190',
//   zb: '50%',
//   value: 0.0001,
//   lineStyle:{
//     opacity:0
//   },
// }];
//
//

