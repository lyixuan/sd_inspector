export function getSangJiUpOption() {
  // 桑吉图 上游option
  const option = {

    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: {
      type: 'sankey',
      layout:'none',
      draggable:false,  // 不可拖动节点
      focusNodeAdjacency: true,   // hover 高亮
      itemStyle: {
        normal: {    // 节点样式
          borderWidth: 1,
          borderColor: '#aaa'
        }
      },
      lineStyle: {
        normal: {   // 流量样式
          color: 'source',
          curveness: 0.6
        }
      },
      // color:['#FE7413','#D02124', '#1BB5C7', '#747474', '#1A6DAA','#749f83',  '#1BB5C7'],
      data: [{
        name: '启动页',
        itemStyle:{
          color:'#1BB5C7'
        }
      }, {
        name: '学习',
        itemStyle:{
          color:'#1A6DAA'
        }
      }, {
        name: '消息'
      }, {
        name: '社区'
      }, {
        name: '我的'
      }, {
        name: '商城列表'
      }, {
        name: '课程公开计划列表'
      }, {
        name: '课程详情页'
      }, {
        name: '其他',

      }, {
        name: ' ',
        itemStyle:{
          normal:{
            color:"#D40404"
          }

        },
        label:{
          normal:{
            position:'left'
          }
        }

      }],
      links: [{
        source: '启动页',
        target: ' ',
        value: 12
      }, {
        source: '学习',
        target: ' ',
        value: 3
      }, {
        source: '消息',
        target: ' ',
        value: 8
      }, {
        source: '社区',
        target: ' ',
        value: 3
      }, {
        source: '我的',
        target: ' ',
        value: 1
      }, {
        source: '商城列表',
        target: ' ',
        value: 2
      }, {
        source: '课程公开计划列表',
        target: ' ',
        value: 3
      }, {
        source: '课程详情页',
        target: ' ',
        value: 13
      }, {
        source: '其他',
        target: ' ',
        value: 13
      }]
    }
  };
  return option;
}
