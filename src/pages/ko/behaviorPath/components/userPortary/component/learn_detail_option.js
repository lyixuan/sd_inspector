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
      left: 60,
      right:40,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2
        }
      },
      axisLine: {
        show: true,
        symbol: 'none',
        symbolSize: [10, 15],
        symbolOffset: [0, 0],
        lineStyle: {
          color: '#333',
          width: 1,
          type: 'solid'
        }
      },
    },
    color: ["#55DBD4", "#FECF57"],
    series: [
      {
        type: 'themeRiver',
        label:{
          show:true,
          color:'#666'
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        data: obj.data
      }
    ]
  };
}
