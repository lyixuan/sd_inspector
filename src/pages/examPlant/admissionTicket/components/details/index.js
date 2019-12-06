import React from 'react';
import { Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import styles from './style.less';

const dataSource = [
  {
    sort: 1,
    collegeName: '学院名称',
    familyName: '家族',
    zaifu: '10000',
    tianxie: '3000',
    column4: '填写率',
    column5: '2000',
    column6: '填写占比',
    column7: '填写占比',
    column8: '验证准确数量',
    column9: '准确率',
  }
];
@connect(({ admissionTicket, loading }) => ({
  admissionTicket
}))
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  handleRankChange = (e) => {
    this.setState({
      rankType: e.target.value
    }, () => {
      // this.achievementList();
    });
  }
  drawChart(data) {
    let option = {
      calculable: true,
      tooltip: {
        trigger: 'item',
        formatter: "{b}<br/> {c}"
      },
      series: [
        {
          name: '运营准考证准确率分析',
          cursor: 'default',
          type: 'pie',
          radius: ['60%', '90%'],
          color: ["#4A90E2", "#FFCC01", "#FF626A", "#4EB5EB"],
          // hoverOffset: 0,
          // avoidLabelOverlap: false,
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
            { value: 335, name: 'abc' },
            { value: 335, name: 'dd' },
            { value: 335, name: '44' },
          ]
        }
      ]
    };
    return option

  }
  closePop = (data) => {
    console.log(71, data)
    if (data === 'pop') {
      this.setState({
        visible: false
      })
    } else {
      this.setState({
        visible: data
      })
    }


  }
  renderPopContent = () => {
    const data = [100, 200, 300, 400, 500, 600]
    return (
      <div className={styles.tooltipContent}>
        <div className={styles.title}>
          <span>运营准考证准确率分析</span>
          <Icon type='close' onClick={() => this.closePop('pop')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#8B8B8B' }}></Icon>
        </div>
        <div className={styles.chart}>
          <Echart options={this.drawChart(data)} style={{ width: '220px', height: '220px' }}></Echart>
        </div>
        <ul className={styles.intro}>
          <li><span className={styles.circle}></span>首次参考：50.00%</li>
          <li><span className={styles.circle}></span>无学员信息/无成绩：10.00%</li>
          <li><span className={styles.circle}></span>接口问题：20.00%</li>
          <li><span className={styles.circle}></span>未知：9.00%</li>
          <li><span className={styles.circle}></span>信息错误：5.00%</li>
          <li><span className={styles.circle}></span>网站关闭：6.00%</li>
        </ul>
      </div>
    )
  }
  columns() {
    const columns = [
      {
        title: '省份',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '在服学员人数',
        dataIndex: 'zaifu',
        key: 'zaifu',
        render: (text, record) => {
          const percent = '70%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写人数',
        dataIndex: 'tianxie',
        key: 'tianxie',
        render: (text, record) => {
          const percent = '40%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写率',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '填写数量',
        dataIndex: 'column5',
        key: 'column5',
        className: styles.sunlandBg,
        render: (text, record) => {
          const percent = '40%'
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text} isColor='blue' percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '验证准确数量',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '准确率',
        dataIndex: 'familyName',
        key: 'familyName',
      },
      {
        title: '操作',
        dataIndex: 'familyName',
        key: 'familyName',
        render: (text, record) => {
          return <div className={styles.options}>
            <Tooltip trigger='click' visible={this.state.visible} onVisibleChange={this.closePop} overlayClassName={styles.listMarkingTooltip} placement="leftTop" title={this.renderPopContent()}>
              <span>查看</span>
            </Tooltip>
            <span>导出错误明细</span>
          </div>
        }
      },
    ];
    return columns || []
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div className={styles.details}>
        <h4 className={styles.h4}>芝士学院</h4>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 0, y: 700 }}
            rowKey={(record, index) => index}
            rowClassName={this.getRowClassName}
            smalled
          />
        </div>

      </div>
    );
  }
}

export default Details;
