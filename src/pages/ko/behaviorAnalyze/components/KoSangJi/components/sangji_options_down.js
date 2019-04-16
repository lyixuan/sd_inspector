const node=  [
  {
    id: '1-1',
    name: '商城列表',
  }, {
    id: '1-2',
    name: 'KO课程列表',
    value:2
  }, {
    id: '1-3',
    name: '热门推荐',
    value:3
  }, {
    id: '1-4',
    name: '演出经纪免费学'
  }, {
    id: '2-1',
    name: '初级经济师'
  }, {
    id: '2-2',
    name: '基础英语'
  }, {
    id: '2-3',
    name: '幼儿园教师资格证'
  }, {
    id: '2-4',
    name: '普通话水平测试'
  }, {
    id: '2-5',
    name: '英语口语',
  },{
    id: '2-6',
    name: '一级注册消防工程师',
  },{
    id: '2-7',
    name: '人力资源管理师司机',
  },{
    id: '2-8',
    name: '雅思',
  },{
    id: '2-9',
    name: '会记初级职称',
  },{
    id: '2-10',
    name: '房地产经纪人助理',
  },{
    id: '3-1',
    name: '选课',
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
  source: '0-1',
  target: '1-1',
  value: 10
}, {
  source: '0-1',
  target: '1-2',
  value: 25
}, {
  source: '0-1',
  target: '1-3',
  value: 3
}, {
  source: '0-1',
  target: '1-4',
  value: 5
}, {
  source: '1-2',
  target: '2-1',
  value: 5
}, {
  source: '1-2',
  target: '2-2',
  value: 5
}, {
  source: '1-2',
  target: '2-3',
  value: 5
}, {
  source: '1-2',
  target: '2-4',
  value: 5
}, {
  source: '1-2',
  target: '2-5',
  value: 7
}, {
  source: '1-2',
  target: '2-6',
  value: 6
}, {
  source: '1-2',
  target: '2-7',
  value: 1
}, {
  source: '1-2',
  target: '2-8',
  value: 1
}, {
  source: '1-2',
  target: '2-9',
  value: 2
}, {
  source: '1-2',
  target: '2-10',
  value: 1
}, {
  source: '2-1',
  target: '3-1',
  value: 8
}, {
  source: '2-2',
  target: '3-1',
  value: 8
}, {
  source: '2-3',
  target: '3-1',
  value: 8
}, {
  source: '2-4',
  target: '3-1',
  value: 8
}, {
  source: '2-5',
  target: '3-1',
  value: 8
}, {
  source: '2-6',
  target: '3-1',
  value: 1
}, {
  source: '2-7',
  target: '3-1',
  value: 1
}, {
  source: '2-8',
  target: '3-1',
  value: 2
}, {
  source: '2-9',
  target: '3-1',
  value: 1
}, {
  source: '2-10',
  target: '3-1',
  value: 1
}, {
  source: '0-1',
  target: '2-1',
  value: 2
}, {
  source: '0-1',
  target: '2-2',
  value: 3
}, {
  source: '0-1',
  target: '2-3',
  value: 3
}, {
  source: '0-1',
  target: '2-4',
  value: 2
}, {
  source: '0-1',
  target: '2-5',
  value: 5
}, {
  source: '0-1',
  target: '2-6',
  value: 3
}];
const sangjiColor = ['#FE7413','#D02124', '#1BB5C7', '#747474', '#1A6DAA','#749f83',  '#1BB5C7','#FE7413','#D02124', '#1BB5C7', '#747474', '#1A6DAA','#749f83',  '#1BB5C7','#FE7413','#D02124', '#1BB5C7', '#747474', '#1A6DAA','#749f83',  '#1BB5C7'];
const itemStyleSource = [];
for (let d = 0; d < node.length; d++) {
  if (node[d].id !== '0-1') {
    node[d].itemStyle = {
      normal: {
        color: sangjiColor[d]
      }
    };
  }
  node[d].label ={
    normal:{
      position:'left'
    }
  };
  itemStyleSource.push(node[d]);
}
const config = {
  type: 'sankey',
  left: 30,
  top:30,
  right:30,
  bottom:30,
  lineStyle: {
    normal: {   // 流量样式
      color: 'source',
      curveness: 0.6
    }
  },
  layout:'none',
  layoutIterations:0,
  draggable:false,  // 不可拖动节点
  focusNodeAdjacency: true,   // hover 高亮
  itemStyle: {
    normal: {    // 节点样式
      borderWidth: 1,
      borderColor: '#aaa'
    }
  },
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
  }
};

export function getSangJiDownOption() {
  // 桑吉图 下游option
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: {
      data: node,
      links: links,
    }
  };
  option.series = {...option.series,...config}
  return option;
}

