export function getOption(obj) {
  const bg1 = [];
  const bg2 = [];
  let negData = [];
  function getNegative () {
    if(obj.negativeCount) negData = obj.negativeCount.map((v)=>-v);
  }
  getNegative();
  const positiveMax =  Math.max.apply(null, obj.positiveCount);
  const navMax = Math.min.apply(null, negData);

  obj.xAxisData && obj.xAxisData.forEach((v)=>{
    bg1.push(positiveMax);
    bg2.push(navMax);
  });


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
      shadowColor: 'rgba(0,0,0,0.1)'
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

  return {
    color: ["#50D4FD", "#FD8188"],
    tooltip: {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        // type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        if(params[0]) {
          return params[0].name +
            "<br>正面：" + (params[1]?params[1].value:0) +"个"+
            "<br>负面：" +  (params[3]?-params[3].value:0)+"个";
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
      // type:'category',
      silent: false,
      // axisPointer: {
      //   type: 'shadow'
      // },
      axisLine:{
        lineStyle:{
          type:'dotted',
          color:"#4A90E2"
        }
      },
      axisLabel:{
        color:'#000000 '
      },
      splitLine: {show: false},
      splitArea: {show: false}
    },
    yAxis: [{
      inverse: false,
      splitArea: {show: false},
      type: 'value',
      min: navMax,
      max: positiveMax,
      axisLabel:{
        color:'#000000 '
      },
      axisLine:{
        lineStyle:{
          type:'dotted',
          color:"RGBA(229, 229, 229, 0.8)"
        }
      },
      splitLine:{
        lineStyle:{
          type:'dotted',
          color:"RGBA(229, 229, 229, 0.5)"
        }
      }
    },{
      inverse: false,
      splitArea: {show: false},
      type: 'value',
      min: navMax,
      max: positiveMax,
      axisLabel:{
        show:false,
        color:'#000000 '
      },
      axisLine:{
        lineStyle:{
          type:'dotted',
          color:"RGBA(229, 229, 229, 0.8)"
        }
      },
      splitLine:{
        lineStyle:{
          type:'dotted',
          color:"RGBA(229, 229, 229, 0.5)"
        }
      }
    }
    ],
    grid: {
      left: 80,
      right:60,
      top:20,
      bottom:60
    },
    // barGap:'-100%',
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: {color: 'rgba(71,211,255,0.04)'}
        },
        barGap:'-100%',
        // barCategoryGap:'40%',
        // barWidth:50,
        data: bg1,
        animation: false
      },
      {
        name: '正面',
        type: 'bar',
        stack: 'one',
        // barWidth:50,
        itemStyle: itemStyle1,
        data: obj.positiveCount
      },
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: {color: 'rgba(255,128,134,0.04)'}
        },
        barGap:'-100%',
        // barCategoryGap:'40%',
        // barWidth:50,
        data: bg2,
        animation: false
      },
      {
        name: '负面',
        type: 'bar',
        stack: 'one',
        // barWidth:50,
        itemStyle: itemStyle2,
        data: negData
      },
    ]
  }
}
