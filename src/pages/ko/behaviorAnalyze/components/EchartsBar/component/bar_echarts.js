const config = {
  splitLine:{
    lineStyle:{
      color:['#F5F6F7']
    }
  },
  axisTick: {
    show: false,
  },
  axisLine:{
    show: false,
    lineStyle: {
      color: '#787A7F'
    }
  },
};
export function options(data){
  return  {
    grid: {
      top: 30,
      bottom: 33,
      left: 30,
      right: 30,
      height: 190,
      // width:980,
    },
    color:['#52C9C2','#FFD75E'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        lineStyle:{
          color:' #CFD0D4'
        }
      },
    },
    legend: {
      bottom: 20,
      textStyle: {
        fontSize: '12px'
      },
      itemWidth: 10,
      itemHeight: 10,
      data: ['点击数','转化率']
    },
    xAxis: {
      type: 'category',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [{
      type: 'value',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine
    },{
      type: 'value',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine
    }],
    series: [{
      name:'点击数',
      type: 'bar',
      barWidth: '14%',
      data: [120, 200, 150, 80, 70, 110, 130],
    // },{
    //   name: 'line',
    //   type: 'line',
    //   xAxisIndex: 1,
    //   symbol: 'circle',
    //   symbolSize: 6,
    //   data: [120, 200, 150, 80, 70, 110, 130]
    }
    ]
  };
};
