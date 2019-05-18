
import {thousandsFormat} from '@/utils/utils' 
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
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null){
      len += 2;
    }else{
      len += 1;
    }
  }
    return len;
}
export function options(data,date){
  return  {
    grid: {
      top: 30,
      bottom: 63,
      left: 60,
      right: 30,
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
          tipItem += `<div class="tipItem"><span class="tipIcon" style="background-color:${params[i].color}"></span><span>${params[i].seriesName}：${i===0?thousandsFormat(params[i].value):params[i].value}${i===0?'次':'%'}</span></div>`
          }
        }
        return `<div class="tipWrap"><div>${date}</div><div>${params[0].axisValue}</div>${tipItem}</div>`;

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
      axisLabel:{
        interval:0,  //类目全显
        formatter:function(params){
          if(getByteLen(params)>16){
            return `${params.substring(0,8)}...`
          }else{
            return params
          }
        }
        // rotate:45   //顺时针旋转45度
      },
      data: data.name
    },
    yAxis: [{
      type: 'value',
      axisLine:config.axisLine,
      axisTick:config.axisTick,
      splitLine: config.splitLine
    },{
      show: false,
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value} %',
      }
    }],
    series: [{
      name:'点击数',
      type: 'bar',
      barWidth:'16',
      // barWidth: '14%',
      data: data.clickNum,
    // },{
    //   name: '转化率',
    //   type: 'line',
    //   yAxisIndex: 1,
    //   data: data.choiceLessonPercent
    }]
  };
};
