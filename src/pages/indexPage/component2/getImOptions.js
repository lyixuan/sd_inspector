export function getOption(data) {
  const colorArr = [
    { color: '#6665DD' },
    { color: '#FF602F' },
    { color: '#33D195' },
    { color: '#B5E1F9' },
    { color: '#FFC442' },
    { color: '#4A5F75' },
    { color: '#0496FF' },
    { color: '#AEB89F' },
  ];
  const newData = [];
  let total = 0;
  if (Object.prototype.toString.call(data) == '[object Array]' && data.length > 0) {
    data.map((item, index) => {
      newData.push({
        value: item.noStatisticNum,
        name: item.reasonTypeName.replace('方向', ''),
        reasonTypeId: item.reasonTypeId,
        itemStyle: colorArr[index],
      });
      total += item.noStatisticNum;
    });
  }
  return {
    grid: {
      containLabel: true,
      left: 0,
      right: 15,
      top: 10,
      bottom: 10,
    },
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
        text: total,
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
    // tooltip: {
    //   trigger: 'item',
    //   // formatter: function(parms) {
    //   //   var str =
    //   //     parms.seriesName +
    //   //     '</br>' +
    //   //     parms.marker +
    //   //     '' +
    //   //     parms.data.name +
    //   //     '</br>' +
    //   //     '数量：' +
    //   //     parms.data.value +
    //   //     '</br>';
    //   //   return str;
    //   // },
    // },
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