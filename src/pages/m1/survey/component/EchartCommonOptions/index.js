export function commonOptions(params) {
  const {text,legendData=[],xData=[],max,interval,color,series,yAxis} = params;
  const option={
    title: {
      text,
      x:'center',
      textStyle:{
        color:'#fff',
        fontSize:'16px'
      },
      top:20
    },
    grid:{
      top:80
    },
    legend: {
      bottom: 0,
      textStyle:{
        color:'#bdc0c6'
      },
      itemWidth:10,
      itemHeight:10,
      data:legendData
    },
    tooltip: {
      trigger: 'axis',
      textStyle:{
        align:'left'
      },
      // axisPointer: {
      //   type: 'cross',
      //   crossStyle: {
      //     color: '#999'
      //   }
      // }
    },
    xAxis: [
      {
        axisLine:{
          lineStyle:{
            color:'#bdc0c6'
          }
        },
        axisLabel:{// 横坐标轴标签
          interval:0
        },
        axisTick:{
          show:false,
        },
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [{
      axisLine:{
        lineStyle:{
          color:'#bdc0c6'
        }
      },
      axisTick:{
        show:false,
      },
      type: 'value',
      splitLine:{
        show:false
      },
      min: 0,
      max,
      interval,
      axisLabel: {
        formatter: '{value}'
      },
    },yAxis?yAxis:null],
    color,
    series: [
      {
        name:legendData[0],
        ...series[0],
      },
      {
        name:legendData[1],
        ...series[1],
      },
      {
        name:legendData[2],
        ...series[2],
      },
    ],
    // toolbox: {
    //   feature: {
    //     dataView: {show: true, readOnly: false},
    //     magicType: {show: true, type: ['line', 'bar']},
    //     restore: {show: true},
    //     saveAsImage: {show: true}
    //   }
    // },
  };
  return option;
}
