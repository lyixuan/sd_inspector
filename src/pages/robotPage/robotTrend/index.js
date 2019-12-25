import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import examEmpty from '@/assets/examEmpty.png';
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
      name: '机器人独立接待人数'
    }, {
      value: pieData.robotAndTeacherNum,
      name: '机器人协同接待人数'
    }, {
      value: pieData.teacherOnlyNum,
      name: '班主任独立接待人数'
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
        formatter: "{b} <br> {c}<br>{d}%"
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['机器人独立接待人数', '机器人协同接待人数', '班主任独立接待人数'],
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
          type: 'pie',
          radius: '75%',
          center: ['30%', '48%'],
          color: ["#33D195", "#FFC442", "#3CB3FC"],
          data: datas,
          hoverOffset: 0,
          stillShowZeroSum: false,
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
    let optionEmpty = {
      animation: false,
      silent: true,
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
      zlevel: 1,
      graphic: [{
        type: 'text',
        left: '23%',
        top: '47%',
        style: {
          text: '暂无数据',
          textAlign: 'center',
          fill: '#9B9B9B',
          fontSize: '12',
          fontWeight: 'normal',
          width: 30,
          height: 30,
          zlevel: 2
        }
      }],
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['机器人独立访问', '机器人协同会话', '班主任独立接待人数'],
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
          type: 'pie',
          radius: '75%',
          center: ['30%', '48%'],
          color: ["#F2F2F2", "#F2F2F2", "#F2F2F2"],
          data: datas,
          hoverOffset: 0,
          hoverAnimation: false,
          legendHoverLink: false,
          itemStyle: {
            normal: {
              label: { show: false },
              labelLine: { show: false },
            },
          },
        }
      ]
    }
    if (pieData.robotOnlyNum === 0 && pieData.robotAndTeacherNum === 0 && pieData.teacherOnlyNum === 0) {
      return optionEmpty
    } else {
      return option
    }


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
        text: '会话满意度',
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
        formatter: "{b} <br> {c}<br>{d}%"
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

    let optionEmpty = {
      animation: false,
      silent: true,
      title: {
        text: '会话满意度',
        x: 'center',
        bottom: 0,
        left: '20%',
        textStyle: {
          color: '#282828',
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      zlevel: 1,
      graphic: [{
        type: 'text',
        left: '23%',
        top: '47%',
        style: {
          text: '暂无数据',
          textAlign: 'center',
          fill: '#9B9B9B',
          fontSize: '12',
          fontWeight: 'normal',
          width: 30,
          height: 30,
          zlevel: 2
        }
      }],
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
          type: 'pie',
          radius: '75%',
          center: ['30%', '48%'],
          color: ["#F2F2F2", "#F2F2F2", "#F2F2F2", "#F2F2F2"],
          data: datas,
          hoverOffset: 0,
          hoverAnimation: false,
          legendHoverLink: false,
          itemStyle: {
            normal: {
              label: { show: false },
              labelLine: { show: false },
            },
          },
        }
      ]
    }

    if (pieData.veryGoodNum === 0 && pieData.goodNum === 0 && pieData.commonNum === 0 && pieData.badNum === 0) {
      return optionEmpty
    } else {
      return option
    }

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
        text: '机器人拦截率',
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        trigger: 'item',
        // formatter: "{b} : {c}",
        formatter: function (parms) {
          var str = parms.name + ': ' + (parms.value * 100).toFixed(2) + '%';
          return str;
        },
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
        max: 1,
        axisLabel: {
          color: '#000000 ',
          // formatter: '{value}\n',
          formatter: function (value) {
            const val = value * 100 + '%'
            return val;
          }
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
        text: '会话满意度',
        textStyle: {
          fontSize: 16,
        }
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: 12,
        },
        formatter: function (params) {
          let results = '';
          for (let i = 0; i < params.length; i++) {
            results += `<div><span style="width:6px;display:inline-block; height:6px;border-radius:100%;font-size:1px;margin-right:5px;background:${params[i].color}"></span>${params[i].seriesName}: ${(params[i].value * 100).toFixed(2)}%</div>`;
          }
          return results;
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
      yAxis: {
        type: 'value',
        max: 1,
        axisLabel: {
          color: '#000000 ',
          // formatter: '{value}\n',
          formatter: function (value) {
            const val = value * 100 + '%'
            return val;
          }
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
      series: [
        {
          name: '非常满意率',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: data1,
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
          data: data4,
          color: "#FF9B7D"
        },
      ]
    };

    return option
  }

  render() {
    const { dataIsEmpty } = this.props.robotPage;
    const { interceptArr, parse1, parse2, parse3, parse4 } = dataIsEmpty
    const empty1 = interceptArr.some(item => item !== 0)
    const empty2 = parse1.some(item => item !== 0) || parse2.some(item => item !== 0) || parse3.some(item => item !== 0) || parse4.some(item => item !== 0)
    return <div className={styles.sessonTrend}>
      <div className={styles.chartPie}>
        <Echart options={this.drawChart()} style={{ width: '320px', height: '220px', }}></Echart>
        <Echart options={this.drawChart2()} style={{ width: '320px', height: '220px' }}></Echart>
      </div>
      <div className={styles.chart1}>
        {
          empty1 ? <Echart options={this.chartIntercept()} style={{ width: '100%', height: '450px' }}></Echart> : <div className={styles.empty}>
            <h4>机器人拦截率</h4>
            <img src={examEmpty} />
            <p>暂无数据</p>
          </div>
        }
      </div>
      <div className={styles.chart2}>
        {
          empty2 ? <Echart options={this.chartCategory()} style={{ width: '100%', height: '450px' }}></Echart> : <div className={styles.empty}>
            <h4>会话满意度</h4>
            <img src={examEmpty} />
            <p>暂无数据</p>
          </div>
        }
      </div>
    </div>
  }

}

export default RobotTrend;
