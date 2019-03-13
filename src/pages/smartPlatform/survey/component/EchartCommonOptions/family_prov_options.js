export function famProOPtion(){
  return {
    title: {
      text: '各省考试计划人数',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: 0,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data: ['老生触达率', '新生触达率','人均服务老生人数', '人均服务新生人数']
    },
    color:['#0080FF','#FF4165','#fff','#52C9C2','#FD9E3B'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      axisTick: {
        show: false,
      },
      show:false,
    },{
      type: 'value',
      show:false,
    }],
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      // inverse:true,
      show:false,
      // data: ['巴西','印尼','美国','印度','中国','北京']
    },
    series: [{
      name: '老生触达率',
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },{
      name: '新生触达率',
      type: 'line',
      xAxisIndex: 1,
      symbol: 'circle',
      symbolSize: 6,
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }, {
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        formatter:function (params) {
          return params.name
        },
        position:  [0, 0],
        color:'#000',
        fontSize:'14px'
      },
      data:  [{name:'巴西',value:134141},
        {name:'印尼',value:134141},
        {name:'美国',value:134141},
        {name:'印度',value:134141},
        {name:'中国',value:134141},
        {name:'北京',value:134141}]
    }, {
      name: '人均服务老生人数',
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    }, {
      name: '人均服务新生人数',
      type: 'bar',
      barWidth: 10,
      label: {
        show: true,
        position: 'right',
        color:'#000',
        fontSize:'12px',
      },
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
    ]
  };
}
