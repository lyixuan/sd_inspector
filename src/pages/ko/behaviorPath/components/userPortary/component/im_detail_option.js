export function getOption(obj) {

  const itemStyle = {
    normal: {
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };
  return {
    backgroundColor: '#eee',
    legend: {
      data: ['正面', '负面'],
      align: 'left',
      left: 10
    },
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      xAxisIndex: 0
    },
    toolbox: {
      feature: {
        magicType: {
          type: ['stack', 'tiled']
        },
        dataView: {}
      }
    },
    tooltip: {},
    xAxis: {
      data: obj.xAxisData,
      name: 'X Axis',
      silent: false,
      axisLine: {onZero: true},
      splitLine: {show: false},
      splitArea: {show: false}
    },
    yAxis: {
      inverse: true,
      splitArea: {show: false}
    },
    grid: {
      left: 100
    },
    visualMap: {
      type: 'continuous',
      dimension: 1,
      text: ['High', 'Low'],
      inverse: true,
      itemHeight: 200,
      calculable: true,
      min: -2,
      max: 6,
      top: 60,
      left: 10,
      inRange: {
        colorLightness: [0.4, 0.8]
      },
      outOfRange: {
        color: '#bbb'
      },
      controller: {
        inRange: {
          color: '#2f4554'
        }
      }
    },
    series: [
      {
        name: 'bar',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: obj.positiveCount
      },
      {
        name: 'bar2',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: obj.negativeCount
      },
    ]
  }
}
