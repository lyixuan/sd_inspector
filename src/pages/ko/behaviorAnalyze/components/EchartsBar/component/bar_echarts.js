
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
export function options(data){
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
        return `<div class="tipWrap"><div>2019-02-12 周二</div>${tipItem}</div>`;

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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
      data: [120, 230, 150, 80, 70, 110, 130],
    },{
      name: '转化率',
      type: 'line',
      data: [20, 200, 150, 80, 70, 110, 130]
    }
    ]
  };
};
