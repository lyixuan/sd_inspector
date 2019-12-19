const colorArr = ['#6665DD', '#FFC442'];

var fomatter_fn = function(v) {
  console.log(v,'cccccccccccc');
  return v.value;
};
const _label = {
  normal: {
    show: true,
    position: 'inside',
    formatter: fomatter_fn,
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
};

export function getOption(data) {
  let newName = [];
  let newdata = [];
  let contentData = [];
  let data1 = [];
  let data2 = [];
  let nameArr = ['审核失败', '审核中'];
  let totalArr = [];
  if (data && data.detailList) {
    data.detailList.map((item, index) => {
      newName.push(item.name);
      data1.push(item.failCount);
      data2.push(item.appealCount);
      totalArr.push(item.total);
    });
    totalArr = totalArr.reverse();
  }
  console.log(newdata, 'newdata');

  return {
    // legend: {
    //   itemWidth: 4,
    //   icon: 'circle',
    //   orient: 'horizontal',
    //   top: 'bottom',
    //   textStyle: {
    //     fontSize: '12',
    //     width: 120,
    //     color: '#8C8C8C',
    //   },
    //   //   height: 175,
    // },
    grid: {
      containLabel: true,
      left: 0,
      right: 15,
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
      formatter: function(p,index) {
        return (
          '名称：' +
          p.name +
          '<br>' +
          p.seriesName +
          ':' +
          p.value 
        );
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    xAxis: {
      axisLabel: {
        show: false,
        // formatter: function(v) {
        //   console.log(v, 'v');
        //   //   var _v = ((v / _max) * 100).toFixed(0);
        //   //   return _v == 0 ? _v : _v + '%';
        // },
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
        name: '审核中',
        stack: '2',
        label: _label,
        legendHoverLink: false,
        barWidth: 16,
        itemStyle: {
          normal: {
            color: '#6665DD',
          },
          emphasis: {
            color: '#6665DD',
          },
        },
        data: data1,
      },
      {
        type: 'bar',
        name: '申诉失败',
        stack: '2',
        legendHoverLink: false,
        barWidth: 16,
        label: _label,
        itemStyle: {
          barBorderRadius: [10, 10, 10, 10],
          normal: {
            color: '#FFC442',
          },
          emphasis: {
            color: '#FFC442',
          },
        },
        data: data2,
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
