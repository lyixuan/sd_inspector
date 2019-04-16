import { seriesConfig,Config,sangjiColor } from '@/pages/ko/behaviorAnalyze/components/KoSangJi/components/common_options';

const node = [{
  name: '启动页',
  value:10,
}, {
  name: '学习',
  value:9,
}, {
  name: '消息',
  value:8,
}, {
  name: '社区',
  value:7,
}, {
  name: '我的',
  value:6,
}, {
  name: '商城列表',
  value:5,
}, {
  name: '课程公开计划列表',
  value:4,
}, {
  name: '课程详情页',
  value:3,
}, {
  name: '其他',
  value:2,

}, {
  id: '0-1',
  name: '下游页面',
  itemStyle:{
    normal:{
      color:"#1D78B3"
    }
  },
}];

const links = [{
  source: '启动页',
  target: '0-1',
  value: 12
}, {
  source: '学习',
  target: '0-1',
  value: 3
}, {
  source: '消息',
  target: '0-1',
  value: 8
}, {
  source: '社区',
  target: '0-1',
  value: 3
}, {
  source: '我的',
  target: '0-1',
  value: 1
}, {
  source: '商城列表',
  target: '0-1',
  value: 2
}, {
  source: '课程公开计划列表',
  target: '0-1',
  value: 3
}, {
  source: '课程详情页',
  target: '0-1',
  value: 13
}, {
  source: '其他',
  target: '0-1',
  value: 13
}];
for (let d = 0; d < node.length; d++) {
  if (node[d].id !== '0-1') {
    node[d].itemStyle = {
      normal: {
        color: sangjiColor[d%sangjiColor.length]
      }
    };
  }
  node[d].label ={
    normal:{
      position:'right'
    }
  };
}
export function getSangJiUpOption() {
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: {
      data: node,
      links: links,
      left: 0,
      right:30,
      label: {
        normal: {
          color: "#000",
          fontSize: 10,
          formatter: function(params, i) {
            if (params.data.id==='0-1') {
              return "上\n\n游\n\n页\n\n面";
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
  option.series = {...option.series,...seriesConfig}
  option = {...option,...Config}
  return option;
}
