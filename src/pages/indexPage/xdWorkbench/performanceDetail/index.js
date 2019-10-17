import React from 'react';
import moment from 'moment';
import { Progress, Tooltip } from 'antd';
import { thousandsFormat } from '@/utils/utils';
import echarts from 'echarts';
import Container from '../../components/container';
import BILoading from '@/components/BILoading'
import styles from './index.less';
import { connect } from 'dva';

@connect(({loading}) => ({
  loading: loading.effects['xdWorkModal/getKpiInfo'],
}))
class performanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kpiInfo: {}
    }
  }
  componentDidMount() {
    this.getApiInfo();
  }
  createRef = id => {
    this.ID = id;
  };
  getApiInfo() {
    this.props.dispatch({
      type: 'xdWorkModal/getKpiInfo',
      callback: (data) => {
        this.setState({
          kpiInfo: data
        })
        this.drawChart(data)
      },
    });
  }
  drawChart(data) {
    let option = {
      calculable: true,
      graphic: [{
        type: 'text',
        left: 'center',
        top: '35%',
        style: {
          text: '本期预估绩效',
          textAlign: 'center',
          fill: '#1A1C1F',
          fontSize: '14',
          fontWeight: 'normal',
          width: 30,
          height: 30
        }
      }, {
        type: 'text',
        left: 'center',
        top: '52%',
        style: {
          text: `￥${thousandsFormat(parseInt(data.currentKpi))}`,
          textAlign: 'center',
          fill: '#00CCC3',
          fontSize: '20',
          fontWeight: 'bold',
          width: 30,
          height: 30
        }
      }],
      series: [
        {
          name: '访问来源',
          cursor: 'default',
          type: 'pie',
          radius: ['80%', '100%'],
          color: ["#00CCC3", "#FFBC00", "#FF626A", "#4EB5EB"],
          hoverOffset: 0,
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [
            data.scoreKpiInfo.scoreKpi,
            data.goodpushKpiInfo.incomeKpi,
            data.renewalKpiInfo.incomeKpi,
            data.examZbtKpiInfo.incomeKpi
          ]
        }
      ]
    };
    if (data.scoreKpiInfo.scoreKpi == 0) {
      option.series[0].color[0] = '#ebebeb'
    }
    if (data.goodpushKpiInfo.incomeKpi == 0) {
      option.series[0].color[1] = '#ebebeb'
    }
    if (data.renewalKpiInfo.incomeKpi == 0) {
      option.series[0].color[2] = '#ebebeb'
    }
    if (data.examZbtKpiInfo.incomeKpi == 0) {
      option.series[0].color[3] = '#ebebeb'
    }
    this.myChart = echarts.init(this.ID);
    this.myChart.setOption(option);

  }
  tooltip(prop, id) {
    if (id == 1) {
      return (
        <div className={styles.tooltipContent}>
          <h4>系数{prop.pkSortValue}的学分最后一名</h4>
          <p>小组学分：{prop.pkGroupScore.toFixed(2)}</p>
          {/* <p>学分收入：￥{thousandsFormat(parseInt(prop.pkScoreKpi))}</p> */}
        </div>
      )
    } else if (id == 2) {
      return (
        <div className={styles.tooltipContent}>
          <h4>好推绩效流水第一名</h4>
          <p>绩效流水：￥{thousandsFormat(parseInt(prop.firstKpiFlow))}</p>
          <p>好推收入：￥{thousandsFormat(parseInt(prop.firstIncomeKpi))}</p>
        </div>
      )
    } else if (id == 3) {
      return (
        <div className={styles.tooltipContent}>
          <h4>续报绩效流水第一名</h4>
          <p>绩效流水：￥{thousandsFormat(parseInt(prop.firstKpiFlow))}</p>
          <p>续报收入：￥{thousandsFormat(parseInt(prop.firstIncomeKpi))}</p>
        </div>
      )
    } else if (id == 4) {
      return (
        <div className={styles.tooltipContent}>
          <h4>成考专本套单量第一名</h4>
          <p>单量：{prop.firstOrderCount}单</p>
          <p>绩效流水：￥{thousandsFormat(parseInt(prop.firstKpiFlow))}</p>
          <p>成考专本套收入：￥{thousandsFormat(parseInt(prop.firstIncomeKpi))}</p>
        </div>
      )
    }

  }

  render() {
    const kpiInfo = this.state.kpiInfo ? this.state.kpiInfo : {
      kpiStartDate: '',
      kpiEndDate: '',
      scoreKpiInfo: '',
      goodpushKpiInfo: '',
      renewalKpiInfo: '',
      examZbtKpiInfo: ''
    }
    const { kpiStartDate, kpiEndDate } = kpiInfo
    const { scoreKpiInfo, goodpushKpiInfo, renewalKpiInfo, examZbtKpiInfo } = kpiInfo
    const date1 = kpiStartDate ? moment(kpiStartDate).format('YYYY.MM.DD') : ''
    const date2 = kpiEndDate ? moment(kpiEndDate).format('YYYY.MM.DD') : ''
    return (
      <Container
        title='绩效详情'
        right={`${date1} ~ ${date2} (最新学分日期)`}
      >
        {
          this.props.loading?<BILoading isLoading={this.props.loading} />:kpiInfo && scoreKpiInfo &&
          <div className={styles.performanceDetail}>
            <div ref={this.createRef} className={styles.chart}></div>
            <div className={styles.panelBox}>
              {/* {this.dataDetail().map(item => this.block(item))} */}
              <div className={styles.performancePanel}>
                {/* <Tooltip placement="bottom" title={this.tooltip(scoreKpiInfo, 1)}> */}
                <div className={styles.details}>
                  <div>
                    <p>学分收入</p>
                    <p className={styles.big}>￥{thousandsFormat(parseInt(scoreKpiInfo.scoreKpi))}</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>小组学分：{scoreKpiInfo.groupScore.toFixed(2)}</p>
                    <p>排名系数：{scoreKpiInfo.soreValue}</p>
                  </div>
                </div>
                <Tooltip placement="bottom" title={this.tooltip(scoreKpiInfo, 1)}>
                  <div className={styles.progressBar}>
                    <div className={styles.title}>
                      <span>系数{scoreKpiInfo.soreValue} ({scoreKpiInfo.groupScore.toFixed(2)}分)</span>
                      <span>系数{scoreKpiInfo.pkSortValue} ({scoreKpiInfo.pkGroupScore.toFixed(2)}分)</span>
                    </div>

                    <Progress strokeColor="#00CCC3" percent={scoreKpiInfo.groupScore / scoreKpiInfo.pkGroupScore * 100} strokeWidth={4} showInfo={false} />
                  </div>
                </Tooltip>
                {/* </Tooltip> */}
              </div>
              <div className={`${styles.performancePanel} ${styles.performancePanel2}`}>

                <div className={styles.details}>
                  <div>
                    <p>好推收入</p>
                    <p className={styles.big}>￥{thousandsFormat(goodpushKpiInfo.incomeKpi)}</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥{thousandsFormat(parseInt(goodpushKpiInfo.kpiFlow))}</p>
                    <p>系数均值：{(goodpushKpiInfo.theValue * 100).toFixed(2)}%</p>
                  </div>
                </div>
                <Tooltip placement="bottom" title={this.tooltip(goodpushKpiInfo, 2)}>
                  <div className={styles.progressBar}>
                    <div className={styles.title}>
                      <span> </span>
                      <span>第一名(￥{thousandsFormat(parseInt(goodpushKpiInfo.firstKpiFlow))})</span>
                    </div>
                    <Progress strokeColor="#FFBC00" percent={goodpushKpiInfo.kpiFlow / goodpushKpiInfo.firstKpiFlow * 100} strokeWidth={4} showInfo={false} />
                  </div>
                </Tooltip>
              </div>
              <div className={`${styles.performancePanel} ${styles.performancePanel3}`}>

                <div className={styles.details}>
                  <div>
                    <p>续报收入</p>
                    <p className={styles.big}>￥{thousandsFormat(parseInt(renewalKpiInfo.incomeKpi))}</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥{thousandsFormat(parseInt(renewalKpiInfo.kpiFlow))}</p>
                    <p>岗位提点：{(renewalKpiInfo.theValue * 100).toFixed(2)}%</p>

                  </div>
                </div>
                <Tooltip placement="bottom" title={this.tooltip(renewalKpiInfo, 3)}>
                  <div className={styles.progressBar}>
                    <div className={styles.title}>
                      <span></span>
                      <span>第一名(￥{thousandsFormat(parseInt(renewalKpiInfo.firstKpiFlow))})</span>
                    </div>
                    <Progress strokeColor="#FF626A" percent={renewalKpiInfo.kpiFlow / renewalKpiInfo.firstKpiFlow * 100} strokeWidth={4} showInfo={false} />
                  </div>
                </Tooltip>
              </div>
              <div className={`${styles.performancePanel} ${styles.performancePanel4}`}>

                <div className={styles.details}>
                  <div>
                    <p>成考专本套收入</p>
                    <p className={styles.big}>￥{thousandsFormat(parseInt(examZbtKpiInfo.incomeKpi))}</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥{thousandsFormat(parseInt(examZbtKpiInfo.kpiFlow))}</p>
                    <p>岗位提点：{(examZbtKpiInfo.theValue * 100).toFixed(2)}%</p>

                  </div>
                </div>
                <Tooltip placement="bottom" title={this.tooltip(examZbtKpiInfo, 4)}>
                  <div className={styles.progressBar}>
                    <div className={styles.title}>
                      <span>单量 ({examZbtKpiInfo.orderCount}单)</span>
                      <span>第一名 ({examZbtKpiInfo.firstOrderCount}单)</span>
                    </div>
                    <Progress strokeColor="#4EB5EB" percent={examZbtKpiInfo.orderCount / examZbtKpiInfo.firstOrderCount * 100} strokeWidth={4} showInfo={false} />
                  </div>
                </Tooltip>
              </div>
            </div>

          </div>
        }
      </Container>
    );
  }
}

export default performanceDetail;
