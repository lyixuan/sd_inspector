import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import styles from './style.less';

@connect(({ robotPage }) => ({
  robotPage,
  dayData: robotPage.dayData,
  pieData: robotPage.pieData
}))
class RobotTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  drawChart = () => {
    const { pieData } = this.props;
    const datas = [{
      value: pieData.robotOnlyNum,
      name: '机器人独立访问'
    }, {
      value: pieData.robotAndTeacherNum,
      name: '机器人协同会话'
    }, {
      value: pieData.teacherOnlyNum,
      name: '班主任独立会话'
    }]
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
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}"
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
          data: datas,
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
  drawChart2 = () => {
    const { pieData } = this.props;
    const datas = [{
      value: pieData.veryGoodNum,
      name: '非常满意'
    }, {
      value: pieData.goodNum,
      name: '满意'
    }, {
      value: pieData.commonNum,
      name: '一般'
    }, {
      value: pieData.badNum,
      name: '不满意'
    }]
    let option = {
      title: {
        text: '满意度',
        x: 'center',
        bottom: 0,
        left: '20%',
        textStyle: {
          color: '#282828',
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}"
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['非常满意', '满意', '一般', '不满意'],
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
          color: ["#33D195", "#33D1BB", "#FFC442", "#FF602F"],
          data: datas,
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
    const data = this.props.dayData
    let data1 = [];
    let data2 = [];
    if (data.length > 0) {
      data.map(item => {
        data1.push(item.interceptPercent)
        data2.push(item.date)
      })
    }
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
        data: data2,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            type: 'dotted',
            color: 'RGBA(229, 229, 229, 0.8)',
          },
        },
        axisLabel: {
          color: '#000000',
          show: true,
          interval: 0,
          formatter: function (value) {
            const val = value.split("-")[1] + '-' + value.split("-")[2] + '\n' + value.split("-")[0]
            return val;
          }
        },
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
          data: data1
        }

      ]
    };

    return option
  }
  chartCategory = () => {
    const data = this.props.dayData
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let dataX = [];
    if (data.length > 0) {
      data.map(item => {
        dataX.push(item.date)
        data1.push(item.veryGoodPercent)
        data2.push(item.commonPercent)
        data3.push(item.goodPercent)
        data4.push(item.badPercent)
      })
    }
    let option = {
      title: {
        text: '满意度',
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: 12,
        }
      },
      legend: {
        data: ['差评率', '一般率', '满意率', '非常满意率'],
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
          data: dataX,
          axisLabel: {
            color: '#000000',
            show: true,
            interval: 0,
            formatter: function (value) {
              const val = value.split("-")[1] + '-' + value.split("-")[2] + '\n' + value.split("-")[0]
              return val;
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '非常满意率',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: data4,
          color: "#52E8AF"
        },
        {
          name: '满意率',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: data3,
          color: "#50DAC7",
        },
        {
          name: '一般率',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: data2,
          color: "#FFC442"
        },
        {
          name: '差评率',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: data1,
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
        <Echart options={this.drawChart2()} style={{ width: '320px', height: '220px' }}></Echart>
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
