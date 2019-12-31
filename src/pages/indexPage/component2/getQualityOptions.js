import { Tooltip } from 'antd';

// const colorArr = ['#FFC442', '#6665DD'];

export function getOptions(data) {
  let newName = [];
  let newdata = [];
  let contentData = [];
  let dataX = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let data4 = [];
  let data5 = [];
  let data6 = [];
  let data7 = [];
  let data8 = [];
  let data9 = [];
  let data10 = [];
  let data11 = [];
  if (data && data.class && data.class.detailList) {
    data.class.detailList.map((item, index) => {
      newName.push(item.name);
      dataX.push(item.value);
      if (item.status) {
        data1.push(Number(item.status.preAppealNum));
        data2.push(Number(item.status.oneSopPreAppealNum));
        data3.push(Number(item.status.twoSopPreAppealNum));
        data4.push(Number(item.status.oneSopRejectedNum));
        data5.push(Number(item.status.twoSopRejectedNum));
        data6.push(Number(item.status.oneFailAppealNum));
        data7.push(Number(item.status.twoFailAppealNum));
        data8.push(Number(item.status.oneMasterPreAppealNum));
        data9.push(Number(item.status.twoMasterPreAppealNum));
        data10.push(Number(item.status.oneTimeOutAppealNum));
        data11.push(Number(item.status.twoTimeOutAppealNum));
      } else {
        data1.push(0);
        data2.push(0);
        data3.push(0);
        data4.push(0);
        data5.push(0);
        data6.push(0);
        data7.push(0);
        data8.push(0);
        data9.push(0);
        data10.push(0);
        data11.push(0);
      }
    });
  }

  const maxData =
    Number(Math.max.apply(Math, dataX)) +
    Number(Math.max.apply(Math, data1)) +
    Number(Math.max.apply(Math, data2)) +
    Number(Math.max.apply(Math, data3)) +
    Number(Math.max.apply(Math, data4)) +
    Number(Math.max.apply(Math, data5)) +
    Number(Math.max.apply(Math, data6)) +
    Number(Math.max.apply(Math, data7)) +
    Number(Math.max.apply(Math, data8)) +
    Number(Math.max.apply(Math, data9)) +
    Number(Math.max.apply(Math, data10)) +
    Number(Math.max.apply(Math, data11));
  let maxDataArr = [];
  if (data && data.class && data.class.detailList) {
    data.class.detailList.map(item => {
      maxDataArr.push(maxData);
    });
  }

  const itemStyle = {
    normal: {
      color: '#666ffd',
    },
  };
  const itemStyle1 = {
    normal: {
      color: '#6665DD',
    },
  };
  const itemStyle2 = {
    normal: {
      color: '#FF602F',
    },
  };
  const itemStyle3 = {
    normal: {
      color: '#33D195',
    },
  };
  const itemStyle4 = {
    normal: {
      color: '#B5E1F9',
    },
  };
  const itemStyle5 = {
    normal: {
      color: '#0064FF',
    },
  };
  const itemStyle6 = {
    normal: {
      color: '#FFC442',
    },
  };
  const itemStyle7 = {
    normal: {
      color: '#4A5F75',
    },
  };
  const itemStyle8 = {
    normal: {
      color: '#0496FF',
    },
  };
  const itemStyle9 = {
    normal: {
      color: '#AEB89F',
    },
  };
  const itemStyle10 = {
    normal: {
      color: '#E2E2EB',
    },
  };
  const itemStyle11 = {
    normal: {
      color: '#FF9031',
    },
  };
  return {
    tooltip: {
      // trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      show: true,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      textStyle: {
        color: '#3c3c3c',
        fontSize: 12,
      },
      // trigger: 'axis',
      formatter: function(p, index) {
        if (p.seriesIndex == 12) return;
        return p.name + '<br>' + p.seriesName + ':' + p.value;
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    grid: {
      left: 3,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          rotate: 60,
        },
        splitLine: { show: false },
        splitArea: { show: false },

        type: 'category',
        data: newName,
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#CAD2DC',
        },
        axisTick: {
          show: false,
        },
        splitLine: { show: false },
        splitArea: { show: false },
        type: 'value',
      },
    ],
    series: [
      {
        barWidth: 16,
        name: 'value',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle,
        data: dataX,
      },
      {
        barWidth: 16,
        name: '待申诉	',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle1,
        data: data1,
      },
      {
        barWidth: 16,
        name: '一次SOP待审核',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle2,
        data: data2,
      },
      {
        barWidth: 16,
        name: '二次SOP待审核',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle3,
        data: data3,
      },
      {
        barWidth: 16,
        name: '一次SOP已驳回',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle4,
        data: data4,
      },
      {
        barWidth: 16,
        name: '二次SOP已驳回',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle5,
        data: data5,
      },
      {
        barWidth: 16,
        name: '一次申诉失败',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle6,
        data: data6,
      },
      {
        barWidth: 16,
        name: '二次申诉失败',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle7,
        data: data7,
      },
      {
        barWidth: 16,
        name: '一次质检主管待审核',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle8,
        data: data8,
      },
      {
        barWidth: 16,
        name: '二次质检主管待审核',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle9,
        data: data9,
      },
      {
        barWidth: 16,
        name: '一次申诉超时',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle10,
        data: data10,
      },
      {
        barWidth: 16,
        name: '二次申诉超时',
        type: 'bar',
        stack: '广告',
        itemStyle: itemStyle11,
        data: data11,
      },
      {
        // 灰色背景柱状图
        type: 'bar',
        barGap: '-100%',
        barWidth: 16,
        itemStyle: {
          normal: {
            color: '#F6F6F4',
            barBorderRadius: [20, 20, 0, 0],
          },
          emphasis: {
            color: '#F6F6F4',
          },
        },
        z: -10,
        data: maxDataArr,
      },
    ],
  };
}

// export function getOptions(data) {
//   let list = [];
//   if (data && data.class && data.class.detailList) {
//     list = data.class.detailList;
//   }
//   const bg1 = [];
//   const bg2 = [];
//   let positiveData = [];
//   let negData = [];
//   const scores = [];
//   const xArr = [];
//   list.forEach(item => {
//     scores.push(item.value);
//     xArr.push(item.name);
//     if (item.value >= 0) {
//       positiveData.push(item.value);
//       negData.push(0);
//     } else {
//       negData.push(item.value);
//       positiveData.push(0);
//     }
//   });

//   const positiveMax = Math.max.apply(null, positiveData);
//   const navMax = Math.min.apply(null, negData);
//   list.forEach(item => {
//     bg1.push(positiveMax);
//     bg2.push(navMax);
//   });

//   const itemStyle1 = {
//     color: '#ccc',
//     normal: {
//       barBorderRadius: [10, 10, 0, 0],
//       color: {
//         type: 'linear',
//         x: 0,
//         y: 0,
//         x2: 0,
//         y2: 1,
//         colorStops: [
//           {
//             offset: 0,
//             color: '#00BFCC', // 0% 处的颜色
//           },
//           {
//             offset: 1,
//             color: '#5384DF', // 100% 处的颜色
//           },
//         ],
//         global: false, // 缺省为 false
//       },
//     },
//     emphasis: {
//       barBorderWidth: 1,
//       shadowBlur: 10,
//       shadowOffsetX: 0,
//       shadowOffsetY: 0,
//       shadowColor: 'rgba(0,0,0,0.1)',
//     },
//   };
//   const itemStyle2 = {
//     color: '#ccc',
//     normal: {
//       barBorderRadius: [0, 0, 10, 10],
//       color: {
//         type: 'linear',
//         x: 0,
//         y: 0,
//         x2: 0,
//         y2: 1,
//         colorStops: [
//           {
//             offset: 0,
//             color: '#00BFCC', // 0% 处的颜色
//           },
//           {
//             offset: 1,
//             color: '#5384DF', // 100% 处的颜色
//           },
//         ],
//         global: false, // 缺省为 false
//         barBorderRadius: [0, 0, 10, 10],
//       },
//     },
//     emphasis: {
//       barBorderWidth: 1,
//       shadowBlur: 10,
//       shadowOffsetX: 0,
//       shadowOffsetY: 0,
//       shadowColor: 'rgba(0,0,0,0.5)',
//     },
//   };

//   const itemStyleBg1 = {
//     normal: {
//       color: '#F6F6F4',
//       barBorderRadius: [10, 10, 0, 0],
//     },
//     emphasis: {
//       color: '#F6F6F4',
//     },
//   };
//   const itemStyleBg2 = {
//     normal: {
//       color: '#F6F6F4',
//       barBorderRadius: [0, 0, 10, 10],
//     },
//     emphasis: {
//       color: '#F6F6F4',
//     },
//   };

//   return {
//     color: ['#50D4FD', '#FD8188'],
//     tooltip: {
//       backgroundColor: '#fff',
//       borderColor: '#eee',
//       borderWidth: 1,
//       borderRadius: 10,
//       shadowBlur: 10,
//       shadowOffsetX: 1,
//       shadowOffsetY: 0,
//       shadowColor: 'rgba(0,0,0,0.8)',
//       textStyle: {
//         color: '#666',
//         fontSize: 12,
//       },
//       trigger: 'axis',
//       axisPointer: {
//         // 坐标轴指示器，坐标轴触发有效
//         type: 'none', // 默认为直线，可选为：'line' | 'shadow'
//       },
//       animation: false,
//       formatter: function(params) {
//         if (params[0]) {
//           return params[0].name + '<br>违规数量：' + (params[1] ? params[1].value : 0) + '个';
//         }
//       },
//     },
//     xAxis: {
//       data: xArr,
//       name: '',
//       // type:'category',
//       silent: false,
//       // axisPointer: {
//       //   type: 'shadow'
//       // },
//       axisLine: {
//         show: false,
//       },
//       axisLabel: {
//         rotate: 45,
//         color: '#000000 ',
//         formatter: function(val) {
//           return val.length > 5 ? val.substr(0, 4) + '...' : val;
//         },
//       },
//       axisTick: {
//         show: false,
//       },
//       splitLine: { show: false },
//       splitArea: { show: false },
//     },
//     yAxis: [
//       {
//         inverse: false,
//         type: 'value',
//         min: navMax,
//         max: positiveMax,
//         axisLine: {
//           show: false,
//         },
//         axisLabel:{
//           color:'#CAD2DC'
//         },
//         axisTick: {
//           show: false,
//         },
//         splitLine: { show: false },
//         splitArea: { show: false },
//       },
//       {
//         inverse: false,
//         type: 'value',
//         min: navMax,
//         max: positiveMax,
//         axisLabel: {
//           show: false,
//           color: '#7D90AA',
//         },
//         axisLine: {
//           show: false,
//         },
//         axisTick: {
//           show: false,
//         },
//         splitLine: { show: false },
//         splitArea: { show: false },
//       },
//     ],
//     grid: {
//       left: 40,
//       right: 20,
//       top: 30,
//       bottom: 60,
//     },
//     // barGap:'-100%',
//     series: [
//       {
//         // For shadow
//         type: 'bar',
//         barGap: '-100%',
//         // barCategoryGap:'40%',
//         barWidth: 17,
//         data: bg1,
//         animation: false,
//         itemStyle: itemStyleBg1,
//       },
//       {
//         name: '违规数量',
//         type: 'bar',
//         stack: 'one',
//         barWidth: 17,
//         itemStyle: itemStyle1,
//         data: positiveData,
//       },
//       {
//         // For shadow
//         type: 'bar',
//         barGap: '-100%',
//         // barCategoryGap:'40%',
//         barWidth: 17,
//         data: bg2,
//         itemStyle: itemStyleBg2,
//         animation: false,
//       },
//       {
//         name: '违规数量',
//         type: 'bar',
//         stack: 'one',
//         barWidth: 17,
//         itemStyle: itemStyle2,
//         data: negData,
//       },
//     ],
//   };
// }
