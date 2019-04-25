import React from 'react';
import Echart from '@/components/Echart_SangJi';
import { getSangJiUpOption } from './sangji_options_up';
import { getSangJiDownOption } from './sangji_options_down';

class SangJiEcharts extends React.Component {

  render() {
    const { position = 'left', upPage, downPage, currentPage } = this.props;
    const option1 = {
      downPage: {
        node: [
          {
            id: 'homepage',
            name: '下游页面',
            itemStyle: {
              normal: {
                color: '#1D78B3'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'xuankeNode',
            name: '选课',
            itemStyle: {
              normal: {
                color: '#D4292F'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'storelist',
            name: '专业详情页',
            itemStyle: {
              normal: {
                color: '#2DBDCD'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'storelist',
            name: '班型详情页',
            itemStyle: {
              normal: {
                color: '#747474'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'studypage',
            name: '课程播放页',
            itemStyle: {
              normal: {
                color: '#2479B1'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'studypage',
            name: '课程播放页',
            itemStyle: {
              normal: {
                color: '#D3292F'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          },
          {
            id: 'studypage',
            name: '注册页面',
            itemStyle: {
              normal: {
                color: '#FB7F29'
              }
            },
            label: {
              normal: {
                position: 'left'
              }
            }
          }
        ],
          links: [
          {
            source: 'storelist',
            target: 'majordetail',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'storelist',
            target: 'productdetail',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'homepage',
            target: 'storelist',
            pv: 1,
            zb: '0%',
            value: 89802
          },
          {
            source: 'homepage',
            target: 'kolist',
            pv: 1,
            zb: '0%',
            value: 18673
          },
          {
            source: 'homepage',
            target: 'studypage',
            pv: 1,
            zb: '0%',
            value: 230332
          },
          {
            source: 'homepage',
            target: 'mypage',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'homepage',
            target: 'messagepage',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'studypage',
            target: 'replay',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'studypage',
            target: 'live',
            pv: 1,
            zb: '0%',
            value: 1
          },
          {
            source: 'studypage',
            target: 'signup',
            pv: 1,
            zb: '0%',
            value: 1
          }
        ]
      }
    }
    const option = position === 'left' ? option1 : getSangJiDownOption(downPage, currentPage);
    return (
      <Echart {...this.props} options={option}/>
    );
  }
}

export default SangJiEcharts;
