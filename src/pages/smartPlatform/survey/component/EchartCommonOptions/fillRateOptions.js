function handleOptionsData(data = []) {
  const xAxisData = [];
  const seriesData = [];
  data.sort((a, b) => b.admissionFillRatio - a.admissionFillRatio).forEach(item => {
    xAxisData.push(item.collegeName);
    seriesData.push({
      ...item,
      value: ((item.admissionFillRatio || 0) * 100).toFixed(2),
    })
  });
  return {
    xAxisData,
    seriesData,
  }
}
export function fillCollege(data) {
  const collegeData = handleOptionsData(data);
  const option = {
    xAxis: {
      type: 'category',
      data: collegeData.xAxisData,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisLabel: {
        color: '#5e5e5e'
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: {
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisLabel: {
        formatter: '{value}%',
        color: '#8a8c91'
      },
      splitLine: false,
      axisTick: {
        show: false,
      },
    },
    series: [{
      label: {
        normal: {
          show: true,
          position: 'top',
          fontSize: 12,
          formatter: '{c}%',
          color: '#000'
        }
      },
      barWidth: 34,
      color: '#52c9c2',
      data: collegeData.seriesData,
      type: 'bar'
    }]
  };
  return option
}
