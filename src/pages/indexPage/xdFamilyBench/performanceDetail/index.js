import React from 'react';
import moment from 'moment';
import { Progress, Tooltip } from 'antd';
import { thousandsFormat } from '@/utils/utils';
import echarts from 'echarts';
import Container from '../../components/container';
import Pannel from './components/pannel'
import styles from './index.less';
import { connect } from 'dva';

@connect(({ xdWorkModal }) => ({
  xdWorkModal,
}))
class performanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chargeCount: {},
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
    const admin_user = localStorage.getItem('admin_user');
    const userId = JSON.parse(admin_user) ? JSON.parse(admin_user).userId : null;
    this.props.dispatch({
      type: 'xdWorkModal/qualityChargeCount',
      payload: { params: { id: userId } },
      callback: (chargeCount) => {
        this.setState({ chargeCount })
        this.props.dispatch({
          type: 'xdWorkModal/familyAchievement',
          callback: (kpiInfo) => {
            this.setState({ kpiInfo })
            this.drawChart(kpiInfo, chargeCount)
          },
        });
      },
    });

  }
  drawChart(data1, data2) {
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
          text: `￥${thousandsFormat(parseInt(data1.achievement + data1.incomeKpi - data2.amount))}`,
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
          color: ["#00CCC3", "#FFBC00"],
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
            data1.achievement,
            data1.incomeKpi
          ]
        }
      ]
    };
    if (data1.achievement == 0) {
      option.series[0].color[0] = '#ebebeb'
    }
    if (data1.incomeKpi == 0) {
      option.series[0].color[1] = '#ebebeb'
    }
    this.myChart = echarts.init(this.ID);
    this.myChart.setOption(option);

  }

  render() {
    const { chargeCount } = this.state;
    const { kpiInfo } = this.state
    const { kpiStartDate = '', kpiEndDate = '' } = this.state.kpiInfo;
    const date1 = kpiStartDate ? moment(kpiStartDate).format('YYYY.MM.DD') : '';
    const date2 = kpiEndDate ? moment(kpiEndDate).format('YYYY.MM.DD') : '';
    const charge = chargeCount.emptyFlag ? thousandsFormat(parseInt(kpiInfo.achievement)) : chargeCount.amount ? `-${thousandsFormat(parseInt(chargeCount.amount))}` : 0

    return (
      <Container
        title='绩效详情'
        right={`${date1} ~ ${date2} (最新学分日期)`}
      >
        {
          kpiInfo.kpiStartDate && chargeCount &&
          <div className={styles.performanceDetail}>
            <div ref={this.createRef} className={styles.chart}></div>
            <div className={styles.panelBox}>
              <Pannel name='学分收入' label='排名系数' level={kpiInfo.creditRankingCoefficient} income={thousandsFormat(parseInt(kpiInfo.achievement))}></Pannel>
              <Pannel name='创收收入' label='创收排名' level={kpiInfo.incomeRanking} income={thousandsFormat(parseInt(kpiInfo.incomeKpi))} className='performancePanel2'></Pannel>
              <Pannel name='质检扣款' label='均值' level={chargeCount.avgAmount} income={charge} className='performancePanel3'></Pannel>
            </div>

          </div>
        }
      </Container>
    );
  }
}

export default performanceDetail;
