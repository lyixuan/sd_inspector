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
        const zb = params[0]?"<br>直播：" + Math.ceil(params[0].value[1]/60) +"分钟":'';
        const cb =  params[1]?"<br>重播：" +  Math.ceil(params[1].value[1]/60)+"分钟":'';
        return '学习状况' + zb + cb;
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
      // interval: 2,
      splitNumber:10,
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
          normal: {
            show: false
          },
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
