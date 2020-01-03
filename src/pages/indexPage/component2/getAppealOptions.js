// const colorArr = ['#FFC442', '#6665DD'];

export function getOption(data) {
  let newName = [];
  let newdata = [];
  let contentData = [];
  let data1 = [];
  let data2 = [];
  // let nameArr = ['审核失败', '审核中'];
  if (data && data.detailList) {
    data.detailList.map((item, index) => {
      newName.push(item.name);
      data2.push(item.appealCount);
      data1.push(item.failCount);
    });
  }
  let maxData = Number(Math.max.apply(Math, data1)) + Number(Math.max.apply(Math, data2));
  let maxDataArr = [];
  if (data && data.detailList) {
    data.detailList.map(item => {
      maxDataArr.push(maxData);
    });
  }

  const itemStyle1 = {
    normal: {
      color: '#6665DD',
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.1)',
    },
  };

  const itemStyle2 = {
    normal: {
      color: '#FFC442',
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.1)',
    },
  };
  return {
    grid: {
      containLabel: true,
      left: 0,
      right: 15,
      top: 10,
      bottom: 40,
    },
    tooltip: {
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
        if (p.seriesIndex == 2) return;
        return p.name + '<br>' + p.seriesName + ':' + p.value;
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    xAxis: {
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        data: newName,
        axisLabel: {
          fontSize: 12,
          color: '#444444',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      {
        show: false,
        data: newName,
        axisLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: '审核失败',
        stack: '2',
        // label: _label,
        // barGap: '-100%',
        legendHoverLink: false,
        barWidth: 16,
        itemStyle: itemStyle1,
        data: data1,
      },
      {
        type: 'bar',
        name: '审核中',
        stack: '2',
        // barGap: '-100%',
        legendHoverLink: false,
        barWidth: 16,
        // label: _label,
        itemStyle: itemStyle2,
        data: data2,
      },
      {
        // 灰色背景柱状图
        type: 'bar',
        barGap: '-100%',
        barWidth: 16,
        itemStyle: {
          normal: {
            color: '#F6F6F4',
            barBorderRadius: [0, 20, 20, 0],
          },
          emphasis: {
            color: '#F6F6F4',
          },
        },
        z: -10,
        data: maxDataArr,
      },
    ],
    // },] [
    //     {
    //       type: 'bar',
    //       name: '审核失败',
    //       stack: '2',
    //       label: _label,
    //       legendHoverLink: false,
    //       barWidth: 16,
    //       itemStyle: {
    //         barBorderRadius: [10, 10, 0, 0],
    //         normal: {
    //           color: '6665DD',
    //         },
    //         emphasis: {
    //           color: '6665DD',
    //         },
    //       },
    //       data: data1,
    //     },
    //     {
    //       type: 'bar',
    //       name: '审核中',
    //       stack: '2',
    //       label: _label,
    //       legendHoverLink: false,
    //       barWidth: 16,
    //       itemStyle: {
    //         barBorderRadius: [10, 10, 0, 0],
    //         normal: {
    //           color: '#FFC442',
    //         },
    //         emphasis: {
    //           color: '#FFC442',
    //         },
    //       },
    //       data: data2,
    //     },
    //   ],
  };
}
