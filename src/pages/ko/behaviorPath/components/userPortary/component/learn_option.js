import { thousandsFormat } from '@/utils/utils';

export function getOption(obj) {
  return {
    tooltip: {},
    legend: {
      data: [obj.data[0]&&obj.data[0].name,obj.data[1]&&obj.data[1].name],
      right:'right',
      bottom:true
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: obj.indicator
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : obj.data
    }]
  };
}
