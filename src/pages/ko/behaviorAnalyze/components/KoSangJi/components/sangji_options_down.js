import { seriesConfig, Config } from './common_options';
import { thousandsFormat } from '@/utils/utils';

const sangjiColor = ['#FF6B71', '#2EBBFF', '#00CCC3', '#FF9254', '#FFC94C', '#FFE65A', '#7A81FF', '#7F7F7F', '#FF6B71', '#2EBBFF', '#00CCC3', '#FF9254', '#FFC94C', '#FFE65A', '#7A81FF', '#7F7F7F'];

export function getSangJiDownOption(downPage, currentPage) {
  const { node = [], links = [] } = downPage;
  for (let d = 0; d < node.length; d++) {
    if (node[d].id !== currentPage) {
      node[d].itemStyle = {
        normal: {
          color: sangjiColor[d % sangjiColor.length],
        },
      };
    } else {
      node[d].itemStyle = {
        normal: {
          color: '#2EBBFF',
        },
      };
    }
    node[d].label = {
      normal: {
        position: 'left',
      },
    };
  }
  const newlinks = [];
  links.forEach((v) => {
    v.value = v.flowValue;
    const target = node.find(r => r.id === v.target);
    const color = target ? target.itemStyle.normal.color : '#2EBBFF';
    newlinks.push(
      {
        source: v.source,
        target: v.target,
        value: v.value,
        lineStyle: {
          color: color,
        },
      });
  });
  // 桑吉图 下游option
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function(param) {
        const { data } = param;
        const { pageView = undefined, id = undefined, proportion = undefined, flowValue = undefined } = data;
        if (id) {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(pageView)}次</div><div>占比：${(proportion * 100).toFixed(2) + '%'}</div></div>`;
        } else {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(flowValue)}次</div><div>占比：${(proportion * 100).toFixed(2) + '%'}</div></div>`;
        }
      },
    },
    series: {
      data: node,
      links: newlinks,
      nodeGap: 12,
      label: {
        normal: {
          color: '#000',
          fontSize: 10,
          formatter: function(params, i) {
            if (params.data.id === currentPage) {
              // return "下\n\n游\n\n页\n\n面";
              return '';
            }
            return params.data.name;
          },
          rich: {
            white: {
              fontSize: 10,
              padding: [3, 0, 0, 3],
            },
          },
        },
      },
    },
  };
  option.series = { ...option.series, ...seriesConfig };
  option = { ...option, ...Config };
  return option;
}
