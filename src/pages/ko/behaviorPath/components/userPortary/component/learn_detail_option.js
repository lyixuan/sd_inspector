export function getOption(obj) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(0,0,0,0.2)',
          width: 1,
          type: 'solid'
        }
      },
      formatter: function (params) {
        if(params[0]&& params[1]) {
          return '学习状况' +
            "<br>直播：" + Math.ceil(params[0].value[1]/60) +"分钟"+
            "<br>重播：" +  Math.ceil(params[1].value[1]/60)+"分钟";
        }
      }
    },
    legend: {
      data: obj.legend,
      bottom: 5,
      itemHeight: 30,
      right:30,
      orient:'horizontal',
      textStyle: {
        color: '#7B7C80',
        fontSize:13
      },
      icon:'circle',
      itemWidth:10
    },
    singleAxis: {
      top: 10,
      bottom: 80,
      left: 70,
      right:60,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        // animation: true,
        label: {
          // show: true
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color:'RGBA(229, 229, 229, 0.8)',
          type: 'dashed',
        }
      },
      axisLine: {
        show: true,
        symbol: 'none',
        // symbolSize: [10, 15],
        // symbolOffset: [0, 0],
        lineStyle: {
          color: '#333',
          width: 1,
          type: 'solid'
        }
      },
      splitArea:{
        areaStyle:{
        }
      },
    },
    color: [ "#FECF57","#55DBD4"],
    series: [
      {
        type: 'themeRiver',
        label:{
          show:true,
          color:'#666'
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        },
        data: obj.data
      }
    ]
  };
}
