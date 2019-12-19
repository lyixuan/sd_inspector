export function getAppealLeftOption(data) {
  const colorArr = [{ color: '#6665DD' }, { color: '#FFC442' }];
  const newData = [];
  if (data.appealCount) {
    newData.push(
      {
        value: data.appealCount,
        itemStyle: colorArr[0],
      },
      {
        value: data.failCount,
        itemStyle: colorArr[1],
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
          fontSize: 17,
          color: '#282828',
        },
      },
    ],
    // tooltip: {
    //   trigger: 'item',
    //   triggerOn: 'mousemove',
    //   formatter: function(param) {
    //     const { data } = param;
    //     const { name = undefined } = data;
    //     return `<div style='font-size: 12px;background: #fff;color: #414D55;width: 100%'>${name}</div>`;
    //   },
    // },
    tooltip: {
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
    legend: {
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
            formatter: function(params) {
              return params.data.value;
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
        data: newData,
      },
    ],
  };
}
