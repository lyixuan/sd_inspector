export function getOption(obj) {

  const itemStyle1 = {
    color:'#ccc',
    normal: {
      // color: '#06d3cd',
      barBorderRadius: [4,4,0,0]
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };
  const itemStyle2 = {
    color:'#ccc',
    normal: {
      // color: '#06d3cd',
      barBorderRadius: [0,0,4,4]
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };

  const positiveMax =  Math.max.apply(null, obj.positiveCount);
  const navMax = Math.min.apply(null, obj.negativeCount);

  const bg1 = [];
  const bg2 = [];
  obj.xAxisData && obj.xAxisData.forEach((v)=>{
    bg1.push(positiveMax);
    bg2.push(navMax);
  });

  return {
    color: ["#50D4FD", "#FD8188"],
    tooltip: {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        // type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        if(params[0]&& params[1]) {
          return params[0].name +
            "<br>正面：" + params[0].value +"个"+
            "<br>负面：" +  -params[1].value+"个";
        }
      }
    },
    legend: {
      data: ['正面', '负面'],
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
    xAxis: {
      data: obj.xAxisData,
      name: '',
      silent: false,
      axisLine: {onZero: true},
      splitLine: {show: false},
      splitArea: {show: false}
    },
    yAxis: {
      inverse: false,
      splitArea: {show: false},
    },
    grid: {
      left: 60,
      right:40
    },
    barGap:'-100%',
    series: [
      {
        name: '正面',
        type: 'bar',
        stack: 'one',
        barMaxWidth:50,
        itemStyle: itemStyle1,
        data: obj.positiveCount
      },
      {
        name: '负面',
        type: 'bar',
        stack: 'one',
        barMaxWidth:50,
        itemStyle: itemStyle2,
        data: obj.negativeCount
      },
    ]
  }
}
