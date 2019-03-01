export function commonOptions(text,legendData=[],xData=[],max,interval) {
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
    yAxis: {
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
    },
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
