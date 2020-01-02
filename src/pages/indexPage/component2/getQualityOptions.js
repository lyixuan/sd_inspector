import { Tooltip } from 'antd';

// const colorArr = ['#FFC442', '#6665DD'];

export function getOptions(data) {
  let newName = [];
  let newdata = [];
  let contentData = [];
  // let dataX = [];
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

  const maxData = [];
  if (data && data.class && data.class.detailList) {
    if (data.class.detailList.length === 1) {
      const ownData = {
        name: '',
        status: {
          oneFailAppealNum: 0,
          oneMasterPreAppealNum: 0,
          oneSopPreAppealNum: 0,
          oneSopRejectedNum: 0,
          oneTimeOutAppealNum: 0,
          preAppealNum: 0,
          twoFailAppealNum: 0,
          twoMasterPreAppealNum: 0,
          twoSopPreAppealNum: 0,
          twoSopRejectedNum: 0,
          twoTimeOutAppealNum: 0,
        },
        value: data.class.detailList[0].value,
      };
      data.class.detailList = [ownData, ownData, data.class.detailList[0], ownData, ownData];
    }

    data.class.detailList.map((item, index) => {
      if (item.value) {
        newName.push(item.name);
        maxData.push(item.value);
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
      }
    });
  }

  let maxDataArr = [];
  if (data && data.class && data.class.detailList) {
    data.class.detailList.map(item => {
      if (item.value) {
        maxDataArr.push(Number(Math.max.apply(Math, maxData)));
      }
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
      color: '#FFC442',
    },
  };
  const itemStyle5 = {
    normal: {
      color: '#4A5F75',
    },
  };
  const itemStyle6 = {
    normal: {
      color: '#0496FF',
    },
  };
  const itemStyle7 = {
    normal: {
      color: '#AEB89F',
    },
  };
  const itemStyle8 = {
    normal: {
      color: '#B5E1F9',
    },
  };
  const itemStyle9 = {
    normal: {
      color: '#0064FF',
    },
  };
  const itemStyle10 = {
    normal: {
      color: '#DA43FF',
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
        if (p.seriesIndex == 11) return;
        return p.name + '<br>' + p.seriesName + ':' + p.value;
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    grid: {
      left: 3,
      top: 20,
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
          formatter: function(val) {
            return val.length > 5 ? val.substr(0, 4) + '...' : val;
          },
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
        // splitNumber : 5,
        // min: 0,
        // max: maxDataArr,
      },
    ],
    series: [
      {
        barWidth: 16,
        name: '待申诉',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle1,
        data: data1,
      },
      {
        barWidth: 16,
        name: '一次SOP待审核',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle2,
        data: data2,
      },
      {
        barWidth: 16,
        name: '二次SOP待审核',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle3,
        data: data3,
      },
      {
        barWidth: 16,
        name: '一次SOP已驳回',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle4,
        data: data4,
      },
      {
        barWidth: 16,
        name: '二次SOP已驳回',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle5,
        data: data5,
      },
      {
        barWidth: 16,
        name: '一次申诉失败',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle6,
        data: data6,
      },
      {
        barWidth: 16,
        name: '二次申诉失败',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle7,
        data: data7,
      },
      {
        barWidth: 16,
        name: '一次质检主管待审核',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle8,
        data: data8,
      },
      {
        barWidth: 16,
        name: '二次质检主管待审核',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle9,
        data: data9,
      },
      {
        barWidth: 16,
        name: '一次申诉超时',
        type: 'bar',
        stack: '2',
        itemStyle: itemStyle10,
        data: data10,
      },
      {
        barWidth: 16,
        name: '二次申诉超时',
        type: 'bar',
        stack: '2',
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
