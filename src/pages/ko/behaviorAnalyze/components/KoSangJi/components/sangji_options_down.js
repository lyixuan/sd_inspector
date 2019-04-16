import {seriesConfig,Config,sangjiColor} from './common_options';

const node=  [
  {
    id: '1-1',
    name: '商城列表',
    pv:'190',
    zb: '50%'
  }, {
    id: '1-2',
    name: 'KO课程列表',
    pv:'190',
    zb: '40%'
  }, {
    id: '1-3',
    name: '热门推荐',
    pv:'190',
    zb: '30%'
  }, {
    id: '1-4',
    name: '演出经纪免费学',
    pv:'190',
    zb: '10%'
  }, {
    id: '2-1',
    name: '初级经济师',
    pv:'190',
    zb: '50%'
  }, {
    id: '2-2',
    name: '基础英语',
    pv:'190',
    zb: '50%'
  }, {
    id: '2-3',
    name: '幼儿园教师资格证',
    pv:'190',
    zb: '50%'
  }, {
    id: '2-4',
    name: '普通话水平测试',
    pv:'190',
    zb: '50%'
  }, {
    id: '2-5',
    name: '英语口语',
    pv:'190',
    zb: '50%'
  },{
    id: '2-6',
    name: '一级注册消防工程师',
    pv:'190',
    zb: '50%'
  },{
    id: '2-7',
    name: '人力资源管理师司机',
    pv:'190',
    zb: '50%'
  },{
    id: '2-8',
    name: '雅思',
    pv:'190',
    zb: '50%'
  },{
    id: '2-9',
    name: '会记初级职称',
    pv:'190',
    zb: '50%'
  },{
    id: '2-10',
    name: '房地产经纪人助理',
    pv:'190',
    zb: '50%'
  },{
    id: '3-1',
    name: '选课',
    pv:'190',
    zb: '50%'
  }, {
    id: '0-1',
    name: '下游页面',
    pv:'190',
    zb: '50%',
    itemStyle:{
      normal:{
        color:"#1D78B3",
      }
    },
}];

const links = [{
  source: '0-1',
  sourceName: '下游页面',
  target: '1-1',
  targetName: '商城列表',
  lv:'190',
  cszb: '50%',
  value: 10
}, {
  source: '0-1',
  sourceName: '下游页面',
  target: '1-2',
  targetName: 'KO课程列表',
  value: 25,
  lv:'190',
  cszb: '50%',
}, {
  source: '0-1',
  sourceName: '下游页面',
  target: '1-3',
  targetName: '热门推荐',
  value: 3,
  lv:'190',
  cszb: '50%',
}, {
  source: '0-1',
  sourceName: '下游页面',
  target: '1-4',
  targetName: '演出经纪免费学',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '1-2',
  target: '2-1',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '1-2',
  target: '2-2',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '1-2',
  target: '2-3',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '1-2',
  target: '2-4',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '1-2',
  target: '2-5',
  lv:'190',
  cszb: '50%',
  value: 7
}, {
  source: '1-2',
  target: '2-6',
  lv:'190',
  cszb: '50%',
  value: 6
}, {
  source: '1-2',
  target: '2-7',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '1-2',
  target: '2-8',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '1-2',
  target: '2-9',
  lv:'190',
  cszb: '50%',
  value: 2
}, {
  source: '1-2',
  target: '2-10',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '2-1',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 8
}, {
  source: '2-2',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 8
}, {
  source: '2-3',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 8
}, {
  source: '2-4',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 8
}, {
  source: '2-5',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 8
}, {
  source: '2-6',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '2-7',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '2-8',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 2
}, {
  source: '2-9',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '2-10',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 1
}, {
  source: '0-1',
  target: '2-1',
  lv:'190',
  cszb: '50%',
  value: 2
}, {
  source: '0-1',
  target: '2-2',
  lv:'190',
  cszb: '50%',
  value: 3
}, {
  source: '0-1',
  target: '2-3',
  lv:'190',
  cszb: '50%',
  value: 3
}, {
  source: '0-1',
  target: '2-4',
  lv:'190',
  cszb: '50%',
  value: 2
}, {
  source: '0-1',
  target: '2-5',
  lv:'190',
  cszb: '50%',
  value: 5
}, {
  source: '0-1',
  target: '2-6',
  lv:'190',
  cszb: '50%',
  value: 3
}, {
  source: '1-1',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 0.0001,
  lineStyle:{
    opacity:0
  },
}, {
  source: '1-3',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 0.0001,
  lineStyle:{
    opacity:0
  },
}, {
  source: '1-4',
  target: '3-1',
  lv:'190',
  cszb: '50%',
  value: 0.0001,
  lineStyle:{
    opacity:0
  },
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
      position:'left'
    }
  };
}


export function getSangJiDownOption() {
  // 桑吉图 下游option
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function (param) {
        const {data} = param;
        const {pv = undefined,zb = undefined,lv = undefined,cszb = undefined} = data;
        if (pv && zb) {
          return `<div><div>pv：${pv}</div><div>次数占比：${zb}</div></div>`
        } else {
          return `<div><div>流量：${lv}</div><div>次数占比：${cszb}</div></div>`
        }
      }
    },
    series: {
      data: node,
      links: links,
      left: 30,
      right:30,
      label: {
        normal: {
          color: "#000",
          fontSize: 10,
          formatter: function(params, i) {
            if (params.data.id==='0-1') {
              return "下\n\n游\n\n页\n\n面";
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
  option.series = {...option.series,...seriesConfig};
  option = {...option,...Config};
  return option;
}

