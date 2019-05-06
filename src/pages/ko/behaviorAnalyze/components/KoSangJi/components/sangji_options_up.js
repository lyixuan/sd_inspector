import { seriesConfig, Config, sangjiColor } from '@/pages/ko/behaviorAnalyze/components/KoSangJi/components/common_options';


export function getSangJiUpOption(upPage, currentPage) {
  const { node = [], links = [] } = upPage;
  for (let d = 0; d < node.length; d++) {
    if (node[d].id !== currentPage) {
      node[d].itemStyle = {
        normal: {
          color: sangjiColor[sangjiColor.length]
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
        position: 'right'
      }
    };
  }
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function (param) {
        const { data } = param;
        const { pageView = undefined, zb = undefined, value = undefined } = data;
        if (zb && value) {
          return `<div style='font-size: 12px'><div>pv：${value}次</div><div>占比：${zb}</div></div>`
        } else if (pageView) {
          return `<div style='font-size: 12px'><div>pv：${pageView}次</div></div>`
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
              // return "上\n\n游\n\n页\n\n面";
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

// 之前调试模拟的静态数据
// const node = [{
//   name: '启动页',
//   value:10,
// }, {
//   name: '学习',
//   value:9,
// }, {
//   name: '消息',
//   value:8,
// }, {
//   name: '社区',
//   value:7,
// }, {
//   name: '我的',
//   value:6,
// }, {
//   name: '商城列表',
//   value:5,
// }, {
//   name: '课程公开计划列表',
//   value:4,
// }, {
//   name: '课程详情页',
//   value:3,
// }, {
//   name: '其他',
//   value:2,
//
// }, {
//   id: '0-1',
//   name: '下游页面',
//   itemStyle:{
//     normal:{
//       color:"#1D78B3"
//     }
//   },
// }];
//
// const links = [{
//   source: '启动页',
//   target: '0-1',
//   value: 12
// }, {
//   source: '学习',
//   target: '0-1',
//   value: 3
// }, {
//   source: '消息',
//   target: '0-1',
//   value: 8
// }, {
//   source: '社区',
//   target: '0-1',
//   value: 3
// }, {
//   source: '我的',
//   target: '0-1',
//   value: 1
// }, {
//   source: '商城列表',
//   target: '0-1',
//   value: 2
// }, {
//   source: '课程公开计划列表',
//   target: '0-1',
//   value: 3
// }, {
//   source: '课程详情页',
//   target: '0-1',
//   value: 13
// }, {
//   source: '其他',
//   target: '0-1',
//   value: 13
// }];
