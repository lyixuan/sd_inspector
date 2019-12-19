export function getAppealLeftOption(data) {
  const colorArr = [{ color: '#6665DD' }, { color: '#FFC442' }];
  const newData = [];
  if (data.appealCount) {
    newData.push(
      {
        value: data.appealCount,
        itemStyle: colorArr[0],
        name: '审核中',
      },
      {
        value: data.failCount,
        itemStyle: colorArr[1],
        name: '申诉失败',
      }
    );
  }

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
        text: data.total,
        subtext: '总量',
        textStyle: {
          fontSize: 26,
          color: '#282828',
        },
        subtextStyle: {
          fontSize: 12,
          color: '#282828',
        },
      },
    ],
    tooltip: {
      show: true,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      textStyle: {
        color: '#3c3c3c',
        fontSize: 12,
      },
      trigger: 'item',
      formatter: function(parms) {
        var str =
          parms.seriesName +
          '</br>' +
          parms.marker +
          '' +
          parms.data.name +
          '</br>' +
          '数量：' +
          parms.data.value +
          '</br>';
        return str;
      },
    },
    series: [
      {
        name: '学分申诉',
        hoverAnimation: false,
        type: 'pie',
        radius: ['50%', '60%'],
        // center: ['50%', '40%'],
        startAngle: '135',
        label: {
          normal: {
            show: false,
          },
        },

        data: newData,
        // name: '申诉',
        // type: 'pie',
        // center: ['50%', '50%'],
        // radius: ['40%', '65%'],
        // clockwise: false, //饼图的扇区是否是顺时针排布
        // avoidLabelOverlap: false,
        // label: {
        //   normal: {
        //     // position: 'inside',
        //     // formatter: function(params) {
        //     //   return params.data.value;
        //     // },
        //   },
        // },
        // textStyle: {
        //   fontSize: '12',
        //   textAlign: 'center',
        // },
        // labelLine: {
        //   normal: {
        //     length: 5,
        //     length2: 3,
        //     smooth: true,
        //   },
        // },
        // data: newData,
      },
    ],
  };
}
