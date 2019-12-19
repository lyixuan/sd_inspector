var spNum = 5,
  _max = 100;
var legendData = ['常住人口', '户籍人口', '农村人口', '城镇居民'];
var y_data = ['成都市', '绵阳市', '自贡市', '攀枝花市', '泸州市', '德阳市'];
const _datamax = [100, 100, 100, 100, 100, 100];
const _data1 = [10, 15, 10, 13, 15, 11];
const _data2 = [19, 5, 40, 33, 15, 51];
const _data3 = [21, 55, 10, 13, 35, 11];
const _data4 = [21, 55, 10, 13, 35, 11];

const colorArr = ['#6665DD', '#FFC442'];

var fomatter_fn = function(v) {
  return ((v.value / _max) * 100).toFixed(0);
};
const _label = {
  normal: {
    show: true,
    position: 'inside',
    // formatter: fomatter_fn,
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
  if (data && data.detailList) {
    data.detailList.map((item, index) => {
      newName.push(item.name);
      data1.push(item.failCount);
      data2.push(item.appealCount);
    });
    contentData.push(data1, data2);

    data.detailList.map((item, index) => {
      newdata.push({
        type: 'bar',
        name: item.name,
        stack: '2',
        label: _label,
        legendHoverLink: false,
        barWidth: 16,
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0],
          normal: {
            color: colorArr[index],
          },
          emphasis: {
            color: colorArr[index],
          },
        },
        data: contentData[index],
      });
    });
  }

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
        fontSize: 16,
      },
      formatter: function(p) {
        console.log(p);
        var _arr = p.seriesName.split('/'),
          idx = p.seriesIndex; //1，2，3
        return (
          '名称：' +
          p.seriesName +
          '<br>' +
          '完成：' +
          p.value +
          '<br>' +
          '占比：' +
          ((p.value / _max) * 100).toFixed(0) +
          '%'
        );
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    xAxis: {
      //   spliƒtNumber: spNum,
      //   interval: _max / spNum,
      //   max: _max,
      axisLabel: {
        show: false,
        formatter: function(v) {
          console.log(v, 'v');
          //   var _v = ((v / _max) * 100).toFixed(0);
          //   return _v == 0 ? _v : _v + '%';
        },
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
    series: newdata,
  };
}
