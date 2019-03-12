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
        fontSize: 12
      },
      itemWidth: 10,
      itemHeight: 10,
      data: ['老生触达率', '新生触达率', '人均服务老生人数', '人均服务新生人数']
    },
    color:['#0080FF','#FF4165','#52C9C2','#FD9E3B'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [{
      type: 'value',
    },{
      type: 'value',
    },],
    yAxis: {
      type: 'category',
      data: ['巴西','印尼','美国','印度','中国','北京']
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
    },
      {
        name: '人均服务老生人数',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '人均服务新生人数',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  };
}
