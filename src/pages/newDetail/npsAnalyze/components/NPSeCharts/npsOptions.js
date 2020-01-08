export function getOption(data) {
  let legendData = [];
  let xAxisData = [];
  let seriesData = [];
  const colorArr = [
    '#6665DD',
    '#FF602F',
    '#33D195',
    '#FFC442',
    '#4A5F75',
    '#0496FF',
    '#AEB89F',
    '#B5E1F9',
    '#0064FF',
    '#DA43FF',
    '#FF9031',
    '#B90000',
  ];
  let max = 0;
  let min = 0;
  let maxArr = [];
  if (data.length) {
    data.map((item, index) => {
      legendData.push(item.title);
      maxArr.push(...item.value);
      seriesData.push({
        name: item.title,
        type: 'line',
        // stack: '总量',
        smooth: true,
        data: item.value,
        itemStyle: {
          normal: {
            color: colorArr[index],
          },
        },
      });
    });
    xAxisData = data[0].name;
    // max = Math.max.apply(null, maxArr);
    // min = Math.min.apply(null, maxArr);
  }

  return {
    // tooltip: {

    // },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#eee',
      borderWidth: 1,
      borderRadius: 10,
      shadowBlur: 10,
      shadowOffsetX: 1,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#666',
        fontSize: 12,
      },
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'none', // 默认为直线，可选为：'line' | 'shadow'
      },
      animation: false,
      formatter: function(params) {
        let arrFor = '';
        params.map(item => {
          arrFor +=
            '<span style="display:inline-block; margin-top:10px">' +
            item.marker +
            item.seriesName +
            '   ' +
            item.value +
            '%' +
            '</span>' +
            '</br>';
        });
        var str = params[0].axisValue + '</br>' + arrFor;
        return str;
      },
    },
    grid: {
      left: '10%',
      top: 10,
      right: 50,
      bottom: legendData.length > 7 ? '34%' : '24%',
      // containLabel: true,
    },
    legend: {
      data: legendData,
      height: 'auto',
      align: 'auto',
      bottom: '1',
      width: 710,
      itemHeight: 30,
      // right: 0,
      left: 'center',
      orient: 'horizontal',
      textStyle: {
        color: '#7B7C80',
        fontSize: 13,
      },
      icon: 'circle',
      itemWidth: 10,
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {},
      // },
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        // y轴文字颜色
        interval: 'auto',
      },
      splitLine: { show: false },
      splitArea: { show: false },
      boundaryGap: false,
      axisLine: { show: false },
      data: xAxisData,
    },
    yAxis: {
      // name: '(百分比)',
      type: 'value',
      splitLine: {
        // 网格线
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E5E5',
        },
      },
      // max: max,
      // min: min,
      splitNumber: 5,
      axisLine: { show: false },
      axisLabel: {
        // y轴文字颜色
        show: true,
        textStyle: {
          color: '#7D90AA',
        },
        formatter: '{value}%'  
      },
      axisTick: {
        show: false,
      },
    },
    series: seriesData,
  };
}
