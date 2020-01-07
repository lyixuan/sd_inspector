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
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br> {c}<br>{d}%"
      },
      legend: {
        bottom: 0,
        left: 'center',
        data: ['机器人独立接待人数', '机器人协同接待人数', '班主任独立接待人数'],
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
          radius: '70%',
          center: ['50%', '44%'],
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
      zlevel: 1,
      graphic: [{
        type: 'text',
        left: '45%',
        top: '43%',
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
        bottom: 0,
        left: 'center',
        data: ['机器人独立接待人数', '机器人协同接待人数', '班主任独立接待人数'],
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
          radius: '70%',
          center: ['50%', '44%'],
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
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br> {c}<br>{d}%"
      },
      legend: {
        bottom: 0,
        left: 'center',
        data: ['非常满意', '满意', '一般', '不满意'],
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
          radius: '70%',
          center: ['50%', '44%'],
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
      zlevel: 1,
      graphic: [{
        type: 'text',
        left: '45%',
        top: '43%',
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
        bottom: 0,
        left: 'center',
        data: ['非常满意', '满意', '一般', '不满意'],
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
          radius: '70%',
          center: ['50%', '44%'],
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
    let data3 = [];
    if (data.length > 0) {
      data.map(item => {
        data1.push(item.interceptPercent)
        data2.push(item.date)
        data3.push(item.robotAndTeacherPercent)
      })
    }
    let option = {
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
        data: ['协同接待率', '拦截率'],
        bottom: '-5px',
        itemWidth: 8,
        itemHeight: 8,

      },
      xAxis: {
        type: 'category',
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
      grid: {
        top: 20,
        left: 50,
        right: 60,
        bottom: 70,
      },
      yAxis: {
        type: 'value',
        // max: 1,
        axisLabel: {
          color: '#000000 ',
          formatter: function (value) {
            const val = parseInt(value * 100) + '%'
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
          name: '协同接待率',
          type: 'line',
          smooth: true,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#FFC442'
            }
          },
          stack: '总量',
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
                  color: '#FFC442', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'RGBA(255, 196, 66, 0)', // 100% 处的颜色
                },
              ],
            },
          },
          data: data3
        },
        {
          name: '拦截率',
          type: 'line',
          smooth: true,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#3DD598'
            }
          },
          stack: '总量',
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
            },
          },
          data: data1
        },

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
      // grid: {
      //   top: 20,
      //   left: '3%',
      //   right: '4%',
      //   bottom: 60,
      //   containLabel: true
      // },
      grid: {
        top: 20,
        left: 50,
        right: 60,
        bottom: 70,
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
  handleCheck = () => {
    const { initData } = this.props.robotPage
    const params = {
      startTime: initData.startTime1,
      endTime: initData.endTime1,
      collegeId: initData.org.length > 0 ? initData.org[0] : null,
      familyId: initData.org.length > 1 ? initData.org[1] : null
    }
    window.open(`/inspector/sessionReport/sessionReport?params=${JSON.stringify(params)}`);
    // router.push({
    //   pathname: '/sessionReport/sessionReport',
    //   query: { ...params },
    // });
  }

  render() {
    const { dataIsEmpty } = this.props.robotPage;
    const { interceptArr, parse1, parse2, parse3, parse4 } = dataIsEmpty
    const empty1 = interceptArr.some(item => item !== 0)
    const empty2 = parse1.some(item => item !== 0) || parse2.some(item => item !== 0) || parse3.some(item => item !== 0) || parse4.some(item => item !== 0)
    return <div className={styles.sessonTrend}>
      <div className={styles.chartPie}>
        <div className={styles.blockContent}>
          <h4 className={styles.title}><span className={styles.name}>会话类型</span></h4>
          <Echart options={this.drawChart()} style={{ width: '100%', height: '240px', }}></Echart>
        </div>
        <div className={styles.blockContent}>
          <h4 className={styles.title}><span className={styles.name}>会话满意度</span></h4>
          <Echart options={this.drawChart2()} style={{ width: '100%', height: '240px' }}></Echart>
        </div>


      </div>
      <div className={styles.chart1}>
        <div className={styles.blockContent}>
          <h4 className={styles.title}><span className={styles.name}>机器人接待数据</span></h4>
          {
            empty1 ? <Echart options={this.chartIntercept()} style={{ width: '100%', height: '450px' }}></Echart> : <div className={styles.empty}>
              <img src={examEmpty} />
              <p>暂无数据</p>
            </div>
          }
        </div>
      </div>
      <div className={styles.chart2}>
        <div className={styles.blockContent}>
          <h4 className={styles.title}><span className={styles.name}>会话满意度</span><span className={styles.btn} data-trace='{"widgetName":"查看评价详情","traceName":"IM机器人会话趋势"}' onClick={this.handleCheck}>查看评价详情</span></h4>
          {
            empty2 ? <Echart options={this.chartCategory()} style={{ width: '100%', height: '450px' }}></Echart> : <div className={styles.empty}>
              <img src={examEmpty} />
              <p>暂无数据</p>
            </div>
          }
        </div>
      </div>
    </div>
  }

}

export default RobotTrend;
