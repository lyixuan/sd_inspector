import {  changeToThousandsForIncome } from '@/utils/utils';
export function getOptioBossL(list) {
  const bg1 = [];
  const bg2 = [];
  let positiveData = [];
  let negData = [];
  const xArr = [];
  list.forEach((item)=>{
    xArr.push(item.name);
    if(item.value>=0){
      positiveData.push(changeToThousandsForIncome(item.value,1));
      negData.push(0);
    } else {
      negData.push(changeToThousandsForIncome(item.value,1));
      positiveData.push(0);
    }
  });

  const positiveMax =  Math.ceil(Math.max.apply(null, positiveData));
  const navMax = Math.ceil(Math.min.apply(null, negData));
  list.forEach((item)=>{
    bg1.push(positiveMax);
    bg2.push(navMax);
  });

  const itemStyle1 = {
    color:'#ccc',
    normal: {
      barBorderRadius: [10,10,0,0],
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#00BFCC', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#5384DF', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      }
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
      barBorderRadius: [0,0,10,10],
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#00BFCC', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#5384DF', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
        barBorderRadius: [0,0,10,10]
      }},
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };

  const itemStyleBg1 = {
    normal: {
      color: '#F6F6F4',
      barBorderRadius: [10, 10, 0, 0],
    },
    emphasis: {
      color:'#F6F6F4',
    }
  };
  const itemStyleBg2 = {
    normal: {
      color: '#F6F6F4',
      barBorderRadius: [0, 0, 10, 10],
    },
    emphasis: {
      color:'#F6F6F4',
    }
  };

  return {
    color: ["#50D4FD", "#FD8188"],
    tooltip: {
      backgroundColor:'#fff',
      borderColor:'#eee',
      borderWidth:1,
      borderRadius:10,
      shadowBlur: 10,
      shadowOffsetX: 1,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.8)',
      textStyle:{
        color:'#666',
        fontSize:12,
      },
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
      },
      animation:false,
      formatter: function (params) {
        if(params[0]) {
          return "创收流水:<br>" + (params[1]?params[1].value:params[3].value)+'万元'
        }
      }
    },
    xAxis: {
      data: xArr,
      name: '',
      // type:'category',
      silent: false,
      // axisPointer: {
      //   type: 'shadow'
      // },
      axisLine:{
        show:false
      },
      axisLabel:{
        rotate:45,
        color:'#000000 '
      },
      axisTick:{
        show:false
      },
      splitLine: {show: false},
      splitArea: {show: false}
    },
    yAxis: [{
      inverse: false,
      type: 'value',
      min: navMax,
      max: positiveMax,
      axisLine:{
        show:false
      },
      axisLabel:{
        // color:'#7D90AA'
        color:'#CAD2DC'
      },
      axisTick:{
        show:false
      },
      splitLine: {show: false},
      splitArea: {show: false}
    },{

      inverse: false,
      type: 'value',
      min: navMax,
      max: positiveMax,
      axisLabel:{
        show:false,
        color:'#000000 '
      },
      axisLine:{
        show:false
      },
      axisTick:{
        show:false
      },
      splitLine: {show: false},
      splitArea: {show: false}
    }
    ],
    grid: {
      left: 70,
      right:10,
      top:50,
      bottom:60
    },
    // barGap:'-100%',
    series: [
      { // For shadow
        type: 'bar',
        barGap:'-100%',
        // barCategoryGap:'40%',
        barWidth:17,
        data: bg1,
        animation: false,
        itemStyle: itemStyleBg1,
      },
      {
        name: '正面',
        type: 'bar',
        stack: 'one',
        barWidth:17,
        itemStyle: itemStyle1,
        data: positiveData

      },
      { // For shadow
        type: 'bar',
        barGap:'-100%',
        // barCategoryGap:'40%',
        barWidth:17,
        data: bg2,
        itemStyle: itemStyleBg2,
        animation: false
      },
      {
        name: '负面',
        type: 'bar',
        stack: 'one',
        barWidth:17,
        itemStyle: itemStyle2,
        data: negData
      },
    ]
  }
}
