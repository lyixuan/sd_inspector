/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Echart from '@/components/Echart';
import { connect } from 'dva';

import styles from '../style.less'


function option() {
  return {
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#F5F6F7',
            fontSize: 12
          }
        },
        axisLabel: {// 横坐标轴标签
          color: '#787A7F',
        },
        axisTick: {
          show: false,
        },
        type: 'category',
        data: ['考试计划人数', '触达人数', '未读人数'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [{
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#F5F6F7'
        }
      },
      axisTick: {
        show: false,
      },
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        color: '#787A7F'
      },
    }],
    color: ['#46A3EF', "#52C9C2", '#F29F38'],
    series: [
      {
        itemStyle: {
          normal: {
            color: function (params) {
              const colorList = ['#46A3EF', '#52C9C2', '#F29F38'];
              return colorList[params.dataIndex]
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            fontSize: 12,
            formatter: '{c}',
            color: '#000'
          }
        },
        barWidth: 44,
        data: [120, 200, 3000],
        color: '#52c9c2',
        type: 'bar'
      }
    ]
  }
}

const option1 = option();
class InitChart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (

      <>
        <div style={{ height: "500px" }}>
          <Echart
            style={{ width: '100%', height: "380px", backgroundColor: ' #fff' }}
            options={option1}
          />
        </div>
      </>
    );
  }
}

export default InitChart;