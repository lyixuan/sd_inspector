export function getOption(obj) {
  return {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data:['做题数量','做题正确数量']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : obj.xAxis
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'做题数量',
        type:'line',
        stack: '总量',
        areaStyle: {},
        data:obj.totalNum
      },
      {
        name:'做题正确数量',
        type:'line',
        stack: '总量',
        areaStyle: {},
        data:obj.correctNum
      },
    ]
  };
}
