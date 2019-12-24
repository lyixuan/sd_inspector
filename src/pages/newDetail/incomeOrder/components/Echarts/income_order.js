import echarts from 'echarts';

export function getOptionIncomeOrder(list,titleName) {
  const xArr = [];
  const yArr = [];
  const seriesData = [];
  list.forEach((item,i)=>{
    xArr.push(i);
    yArr.push(item.value);
    seriesData.push({name:i,value:item.selfGroup ?item.value:null,showName:item.name,rankNum:item.rankNum,total:list.length})
  });

  let normal1 = {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
      offset: 0,
      color: 'rgba(130, 128, 255, 0.9)',
    }, {
      offset: 1,
      color: 'rgba(130, 128, 255, 0.1)',
    }]),
  };
  let normal2 = {
    color: 'rgba(130, 128, 255, 1)',
    width: 2,
  };
  let nodeColor = 'rgba(130, 128, 255, 1)';
  if(titleName==='家族排名'){
    normal1 =  {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
        offset: 0,
        color: 'rgba(254, 197, 61, 0.9)',
      }, {
        offset: 1,
        color: 'rgba(254, 197, 61, 0.1)',
      }]),
    };
    normal2 = {
      color: 'rgba(254, 197, 61, 1)',
      width: 2,
    };
    nodeColor='rgba(254, 197, 61, 1)'
  }
  if(titleName==='小组排名'){
    normal1 =  {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
        offset: 0,
        color: 'rgba(255, 151, 112, 0.9)',
      }, {
        offset: 1,
        color: 'rgba(255, 151, 112, 0.1)',
      }]),
    };
    normal2 = {
      color: 'rgba(255, 151, 112, 1)',
      width: 2,
    };
    nodeColor='rgba(255, 151, 112, 1)'
  }

  return {
    tooltip: {
      backgroundColor:'#fff',
      borderColor:'#eee',
      borderWidth:1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      borderRadius:10,
      shadowColor: 'rgba(0,0,0,0.5)',
      textStyle:{
        color:'#666',
        fontSize:12,
      },
      trigger: 'item',
      // position: function (pos, params, dom, rect, size) {
      //   var obj = {top: 60};
      //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      //   return obj;
      // },
      formatter: function(param) {
        const { data } = param;
        const { showName = '', rankNum='',total=''} = data;
        return showName+'<br>排名:' + rankNum +'/'+total
      },
    },
    xAxis: {
      show: false,
      type: 'category',
      data: xArr,
    },
    yAxis: {
      show: false,
      type: 'value',
      min:  0,
    },
    grid: {
      top: 50,
      left: 10,
      right: 10,
      bottom: 20,
    },
    series: [{
      name: 'scatter',
      type: 'scatter',
      itemStyle: {
        normal: {
          borderWidth: '2',
          borderType: 'solid',
          borderColor: '#fff',
          color: nodeColor,
          // shadowColor: '#68b837',
          // shadowBlur: 10,
        },
      },

      data: seriesData,
    },
      {
        smooth: true,
        data: yArr,
        type: 'line',
        areaStyle: {
          normal: normal1,
        },
        symbol: 'none',

        lineStyle: {
          normal: normal2,
        },
      },
    ],
  };
}
