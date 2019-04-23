
const config = {
  splitLine:{
    lineStyle:{
      color:['#F5F6F7']
    }
  },
  axisTick: {
    show: false,
  },
  axisLine:{
    show: false,
    lineStyle: {
      color: '#787A7F'
    }
  },
};
// const dataFn= ()=> {
//   const data=[];
//   for(let i=0;i<15;i++){
//     data.push({
//       name:`name${i}`,
//       actionKey:`actionKey${i}`,
//       clickNum:i*12,
//       convertPer:(i/15*100).toFixed(2),
//       time:`2019-02-03 周二`,
//     })
//   }
//   return data;
// };

// const getData = (data,name)=>{
//   data=[];
//   dataFn().forEach(item=>{
//     data.push({name:item,value:item[name]})
//   });
//   return data;
// };
// const data1 = getData('data1','name');
// const data3 = getData('data3','clickNum');
// const data4 = getData('data4','convertPer');

export function options(data){
  console.log(data)
  return  {
    grid: {
      top: 30,
      bottom: 63,
      left: 30,
      right: 30,
      // height: 120,
      // width:980,
    },
    color:['#52C9C2','#FFD75E'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        lineStyle:{
          color:' #CFD0D4'
        }
      },
      formatter: function (params) {
        let tipItem='';
        if(params&&params.length){
          for(let i=0;i<params.length;i++){
            tipItem += `<div class="tipItem"><span class="tipIcon" style="background-color:${params[i].color}"></span><span>${params[i].seriesName}：${params[i].value}${i===0?'次':'%'}</span></div>`
          }
        }
        return `<div class="tipWrap"><div>${params[0].name.time}</div>${tipItem}</div>`;

      },
    },
    legend: {
      left:0,
      bottom: 5,
      textStyle: {
        fontSize: '12px'
      },
      itemGap:30,
      itemWidth: 6,
      itemHeight: 6,
      data: [{ name: '点击数', icon: 'circle'},{ name: '转化率', icon: 'circle'}]
    },
    xAxis: {
      type: 'category',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine,
      data: data.name
    },
    yAxis: [{
      type: 'value',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine
    },{
      type: 'value',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine
    }],
    series: [{
      name:'点击数',
      type: 'bar',
      barWidth: '14%',
      data: data.clickNum,
    },{
      name: '转化率',
      type: 'line',
      data: data.choiceLessonPercent
    }
    ]
  };
};
