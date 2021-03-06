import { seriesConfig, Config } from '@/pages/ko/behaviorAnalyze/components/KoSangJi/components/common_options';
import {thousandsFormat} from '@/utils/utils';

const sangjiColor = ['#00CCC3', '#FF9254', '#FF6B71', '#2EBBFF', '#7A81FF', '#FFE65A', '#2EBBFF', '#7A81FF', '#FF9254', '#7F7F7F', '#2EBBFF', '#FF9254', '#FF6B71', '#2EBBFF', '#7A81FF', '#FFE65A', '#2EBBFF', '#7A81FF', '#FF9254', '#7F7F7F', '#FFC94C', '#00CCC3'];
export function getSangJiUpOption(upPage, currentPage) {
  const { node = [], links = [] } = upPage;
  for (let d = 0; d < node.length; d++) {
    if (node[d].id !== currentPage) {
      node[d].itemStyle = {
        normal: {
          color: sangjiColor[d % sangjiColor.length]
        }
      };
    } else {
      node[d].itemStyle = {
        normal: {
          color: "#2EBBFF"
        }
      };
    }
    node[d].label = {
      normal: {
        position: 'right'
      }
    };
  }
  links.forEach((v)=>{
    v.value=v.flowValue;
  });
  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function (param) {
        const { data } = param;
        const { pageView = undefined, id = undefined, proportion = undefined,flowValue = undefined } = data;
        if (id) {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(pageView)}次</div><div>占比：${(proportion*100).toFixed(2)+'%'}</div></div>`
        } else {
          return `<div style='font-size: 12px'><div>pv：${thousandsFormat(flowValue)}次</div><div>占比：${(proportion*100).toFixed(2)+'%'}</div></div>`
        }
      }
    },
    series: {
      data: node,
      links: links,
      nodeGap: 12,
      label: {
        normal: {
          color: "#000",
          fontSize: 10,
          formatter: function (params, i) {
            if (params.data.id === currentPage) {
              // return "上\n\n游\n\n页\n\n面";
              return "";
            }
            return params.data.name;
          },
          rich: {
            white: {
              fontSize: 10,
              padding: [3, 0, 0, 3]
            }
          }
        }
      },
    }
  };
  option.series = { ...option.series, ...seriesConfig };
  option = { ...option, ...Config };
  return option;
}
