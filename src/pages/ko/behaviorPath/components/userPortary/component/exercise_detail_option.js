export function getOption(obj) {
  return {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function (params) {
        if(params[0]&& params[1]) {
          return params[0].name +
            "<br>做题数量：" + params[0].value +"个"+
            "<br>正确数量：" +  params[1].value+"个";
        }
      }
    },
    legend: {
      data: ['做题数量','正确数量'],
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
    grid: {
      top: '3%',
      left: 50,
      right: 60,

      bottom: 50,
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
    color: ["#FDBB2C","#22CBC2"],
    series : [
      {
        name:'做题数量',
        type:'line',
        data:obj.totalNum,
        lineStyle:{
          color:'#FDBB2C'
        },
        smooth: true,
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#FDBB2C' // 0% 处的颜色
            }, {
              offset: 1, color: '#FFFDF8' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      {
        name:'正确数量',
        type:'line',
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#22CBC2' // 0% 处的颜色
            }, {
              offset: 1, color: '#ECFBFA' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        data:obj.correctNum,
        lineStyle:{
          color:'#22CBC2'
        },
        smooth: true,
      },
    ]
  };
}
