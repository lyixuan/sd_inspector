export function getOption(m2R2Data) {
  // const newX = [];
  // m2R2Data.xAxis &&
  // m2R2Data.xAxis.forEach(item => {
  //     let arr = [];
  //     let newDate = '';
  //     arr = item.split('-');
  //     newDate = `${arr[1]}-${arr[2]}\n${arr[0]}`;
  //     newX.push(newDate);
  //   });

  // const newCorrectRatio = [];
  // m2R2Data.correctRatio &&
  // m2R2Data.correctRatio.forEach(item => {
  //     newCorrectRatio.push((item * 100).toFixed(2));
  //   });

  return {
    title: [
      {
        text: '',
        textStyle: {
          fontSize: 12,
          color: 'black',
        },
        // left: '2%',
      },
      {
        orient: 'vertical',
        x: 'center',
        y: '40%',
        text: 12312,
        subtext: '总量',
        textStyle: {
          fontSize: 26,
          color: '#282828',
        },
        subtextStyle: {
          fontSize: 17,
          color: '#282828',
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: function(parms) {
        var str =
          parms.seriesName +
          '</br>' +
          parms.marker +
          '' +
          parms.data.legendname +
          '</br>' +
          '数量：' +
          parms.data.value +
          '</br>' +
          '占比：' +
          parms.percent +
          '%';
        return str;
      },
    },
    legend: {
      icon: 'circle',
      itemWidth: 4,
      icon: 'circle',
      orient: 'horizontal',
      top: 'bottom',
      textStyle: {
        fontSize: '12',
        width: 120,
        color: '#8C8C8C',
      },
      width: 204,
      //   height: 175,
    },
    series: [
      {
        name: 'IM',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '65%'],
        clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          normal: {
            position: 'inside',
            formatter: function(parms) {
              return parms.data.legendname;
            },
          },
        },
        textStyle: {
          fontSize: '12',
          textAlign: 'center',
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 3,
            smooth: true,
          },
        },
        data: m2R2Data,
      },
    ],
  };
}
