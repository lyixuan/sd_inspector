import React from 'react';
import moment from 'moment';
import { Progress, Tooltip } from 'antd';
import { thousandsFormat } from '@/utils/utils';
import echarts from 'echarts';
import Container from '../../components/container';
import Pannel from './components/pannel'
import styles from './index.less';
import { connect } from 'dva';

@connect(() => ({

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
    this.drawChart()
  }
  drawChart() {
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
          text: 52400,
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
            100,
            200
          ]
        }
      ]
    };
    // if (data.scoreKpiInfo.scoreKpi == 0) {
    //   option.series[0].color[0] = '#ebebeb'
    // }
    // if (data.goodpushKpiInfo.incomeKpi == 0) {
    //   option.series[0].color[1] = '#ebebeb'
    // }
    // if (data.renewalKpiInfo.incomeKpi == 0) {
    //   option.series[0].color[2] = '#ebebeb'
    // }
    // if (data.examZbtKpiInfo.incomeKpi == 0) {
    //   option.series[0].color[3] = '#ebebeb'
    // }
    this.myChart = echarts.init(this.ID);
    this.myChart.setOption(option);

  }

  render() {
    return (
      <Container head="none">
        {
          <div className={styles.performanceDetail}>
            <div ref={this.createRef} className={styles.chart}></div>
            <div className={styles.panelBox}>
              <Pannel></Pannel>
              <Pannel className='performancePanel2'></Pannel>
              <Pannel className='performancePanel3'></Pannel>
            </div>

          </div>
        }
      </Container>
    );
  }
}

export default performanceDetail;
