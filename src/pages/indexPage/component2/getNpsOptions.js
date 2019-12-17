// export function getOption(m2R2Data) {
//     // const newX = [];
//     // m2R2Data.xAxis &&
//     // m2R2Data.xAxis.forEach(item => {
//     //     let arr = [];
//     //     let newDate = '';
//     //     arr = item.split('-');
//     //     newDate = `${arr[1]}-${arr[2]}\n${arr[0]}`;
//     //     newX.push(newDate);
//     //   });
  
//     // const newCorrectRatio = [];
//     // m2R2Data.correctRatio &&
//     // m2R2Data.correctRatio.forEach(item => {
//     //     newCorrectRatio.push((item * 100).toFixed(2));
//     //   });
  
//     return {
//             title: {
//                 text: '特性示例：渐变色 阴影 点击缩放',
//                 subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
//             },
//             xAxis: {
//                 data: dataAxis,
//                 axisLabel: {
//                     inside: true,
//                     textStyle: {
//                         color: '#fff'
//                     }
//                 },
//                 axisTick: {
//                     show: false
//                 },
//                 axisLine: {
//                     show: false
//                 },
//                 z: 10
//             },
//             yAxis: {
//                 axisLine: {
//                     show: false
//                 },
//                 axisTick: {
//                     show: false
//                 },
//                 axisLabel: {
//                     textStyle: {
//                         color: '#999'
//                     }
//                 }
//             },
//             dataZoom: [
//                 {
//                     type: 'inside'
//                 }
//             ],
//             series: [
//                 { // For shadow
//                     type: 'bar',
//                     itemStyle: {
//                         normal: {color: 'rgba(0,0,0,0.05)'}
//                     },
                      
//                     barGap:'-100%',
//                     barCategoryGap:'40%',
//                     data: dataShadow,
//                     animation: false
//                 },
//                 {
//                     type: 'bar',
//                     itemStyle: {
//                         normal: {
//                              barBorderRadius:  [10, 10, 0, 0] ,
//                             color: new echarts.graphic.LinearGradient(
//                                 0, 0, 0, 1,
//                                 [
//                                     {offset: 0, color: '#83bff6'},
//                                     {offset: 0.5, color: '#188df0'},
//                                     {offset: 1, color: '#188df0'}
//                                 ]
//                             )
//                         },
//                         emphasis: {
//                             color: new echarts.graphic.LinearGradient(
//                                 0, 0, 0, 1,
//                                 [
//                                     {offset: 0, color: '#2378f7'},
//                                     {offset: 0.7, color: '#2378f7'},
//                                     {offset: 1, color: '#83bff6'}
//                                 ]
//                             )
//                         }
//                     },
//                     data: data
//                 }
//             ]       
//   }
  