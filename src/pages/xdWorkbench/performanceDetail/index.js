import React from 'react';
import { Progress, Tooltip } from 'antd';
import echarts from 'echarts';
import Container from '../components/container';
import styles from './index.less';
import { connect } from 'dva';

@connect(() => ({

}))
class performanceDetail extends React.Component {
  componentDidMount() {
    this.drawChart()
  }
  createRef = id => {
    this.ID = id;
  };
  drawChart() {
    let option = {
      calculable: true,
      color: ["#00CCC3", "#FFBC00", "#FF626A", "#4EB5EB"],
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
          text: '￥9,500',
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
          type: 'pie',
          radius: ['80%', '100%'],
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
          data: [335, 310, 234, 135]
        }
      ]
    };
    this.myChart = echarts.init(this.ID);
    this.myChart.setOption(option);

  }

  render() {
    const text = <div className={styles.tooltipContent}>
      <h4>好推绩效流水第一名</h4>
      <p>绩效流水：￥80,000</p>
      <p>好推收入：￥6,200</p>
    </div>
    return (
      <Container
        title='绩效详情'
        right="2019.07.29 - 2019.08.10 (最新学分日期)"
      >
        <div className={styles.performanceDetail}>
          <div ref={this.createRef} className={styles.chart}></div>
          <div className={styles.panelBox}>
            <div className={styles.performancePanel}>
              <Tooltip placement="bottom" title={text}>
                <div className={styles.details}>
                  <div>
                    <p>学分收入</p>
                    <p className={styles.big}>￥4,700</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>小组学分：40</p>
                    <p>排名系数：2</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.title}>
                    <span>系数2 (20分)</span>
                    <span>系数3 (60分)</span>
                  </div>
                  <Progress strokeColor="#00CCC3" percent={40} strokeWidth={4} showInfo={false} />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.performancePanel} ${styles.performancePanel2}`}>
              <Tooltip placement="bottom" title={text}>
                <div className={styles.details}>
                  <div>
                    <p>好推收入</p>
                    <p className={styles.big}>￥4,700</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥50,000</p>
                    <p>系数均值：3%</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.title}>
                    <span> </span>
                    <span>第一名(￥80,000)</span>
                  </div>
                  <Progress strokeColor="#FFBC00" percent={40} strokeWidth={4} showInfo={false} />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.performancePanel} ${styles.performancePanel3}`}>
              <Tooltip placement="bottom" title={text}>
                <div className={styles.details}>
                  <div>
                    <p>续报收入</p>
                    <p className={styles.big}>￥4,700</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥50,000</p>
                    <p>岗位提点：3%</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.title}>
                    <span></span>
                    <span>第一名(￥80,000)</span>
                  </div>
                  <Progress strokeColor="#FF626A" percent={40} strokeWidth={4} showInfo={false} />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.performancePanel} ${styles.performancePanel4}`}>
              <Tooltip placement="bottom" title={text}>
                <div className={styles.details}>
                  <div>
                    <p>成考专本套收入</p>
                    <p className={styles.big}>￥4,700</p>
                  </div>
                  <div className={styles.txtRight}>
                    <p>绩效流水：￥50,000</p>
                    <p>岗位提点：3%</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.title}>
                    <span>单量 (10单)</span>
                    <span>第一名 (15单)</span>
                  </div>
                  <Progress strokeColor="#4EB5EB" percent={40} strokeWidth={4} showInfo={false} />
                </div>
              </Tooltip>
            </div>
          </div>

        </div>
      </Container>
    );
  }
}

export default performanceDetail;
