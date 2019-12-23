import React from 'react';
import Echart from '@/components/Echart';
import styles from './style.less';

class RobotTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  drawChart = () => {
    let option = {
      title: {
        text: '会话类型',
        x: 'center',
        bottom: 0,
        left: '20%',
        textStyle: {
          color: '#282828',
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['机器人独立访问', '机器人协同会话', '班主任独立会话'],
        top: '30%',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 20,
        icon: 'circle',
        textStyle: {
          color: '#444',
          fontSize: 12,
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '75%',
          center: ['30%', '48%'],
          color: ["#33D195", "#FFC442", "#3CB3FC"],
          data: [
            { value: 335, name: '机器人独立访问' },
            { value: 310, name: '机器人协同会话' },
            { value: 234, name: '班主任独立会话' },
          ],
          hoverOffset: 0,
          itemStyle: {
            normal: {
              label: { show: false },
              labelLine: { show: false },
              borderColor: "#FFFFFF",
              borderWidth: 4
            },
          }
        }
      ]
    };

    return option
  }
  chartIntercept = () => {
    var data = [["2016-10-4", 467], ["2016-10-2", 670], ["2016-10-2", 1670], ["2016-1-1", 2670]]
    let option = {
      animation: false,
      title: {
        text: '拦截率',
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        trigger: 'axis',

      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisPointer: {
          value: '2016-10-7',
          snap: true,
          lineStyle: {
            color: '#004E52',
            opacity: 0.5,
            width: 2
          },
        },
        axisLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 0.8)',
          },
        },
        axisLabel: {
          color: '#000000 ',
        },
        // data:data,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#000000 ',
          formatter: '{value}\n'
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 1)',
          },
        },
        axisLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 1)',
          },
        },
      },
      grid: {
        top: 50,
        left: 50,
        right: 60,
        bottom: 50,
      },
      series: [

        {
          type: 'line',
          smooth: true,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#3DD598'
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#3DD598', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'RGBA(26, 232, 206, 0)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          data: data
        }

      ]
    };

    return option
  }
  chartCategory = () => {
    let option = {
      title: {
        text: '满意度',
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        textStyle: {
          fontSize: 12,
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        bottom: '-5px',
        itemWidth: 8,
        itemHeight: 8,

      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
          color: "#FFC442"
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
          color: "#50DAC7",
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320],
          color: "#52E8AF"
        },
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
          color: "#FF9B7D"
        },
      ]
    };

    return option
  }

  render() {
    return <div className={styles.sessonTrend}>
      <div className={styles.chartPie}>
        <Echart options={this.drawChart()} style={{ width: '320px', height: '220px', }}></Echart>
        <Echart options={this.drawChart()} style={{ width: '320px', height: '220px' }}></Echart>
      </div>
      <div className={styles.chart1}>
        <Echart options={this.chartIntercept()} style={{ width: '100%', height: '450px' }}></Echart>
      </div>
      <div className={styles.chart2}>
        <Echart options={this.chartCategory()} style={{ width: '100%', height: '450px' }}></Echart>
      </div>
    </div>
  }

}

export default RobotTrend;
