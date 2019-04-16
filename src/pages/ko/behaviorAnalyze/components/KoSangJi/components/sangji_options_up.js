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
  }
};
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
      position:'right'
    }
  };
  itemStyleSource.push(node[d]);
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
    }
  };
  option.series = {...option.series,...config}
  return option;
}
