import React from 'react';
import { Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Echart from '@/components/Echart';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import storage from '@/utils/storage';
import { thousandsFormat } from '@/utils/utils';
import pop from '@/assets/examPlan/pop.png';
import close from '@/assets/examPlan/close.png';
import examEmpty from '@/assets/examEmpty.png';
import router from 'umi/router';
import styles from './style.less';

@connect(({ examPlant, admissionTicket, loading }) => ({
  examPlant,
  admissionTicket,
  zkzWriteDetail: admissionTicket.zkzWriteDetail
}))
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      visible2: true
    }
  }
  drawChart(data) {
    let value = [];
    let valueName = [];
    if (data && data.length > 0) {
      data.map(item => {
        value.push({
          value: item.total,
          name: item.reasonStatusDesc
        })
        valueName.push(item.reasonStatusDesc)
      })
    }

    let option = {
      // calculable: true,
      tooltip: {
        trigger: 'item',
        formatter: "{b}<br/> {c}"
      },
      legend: {
        bottom: 0,
        left: 'center',
        data: valueName,
        formatter: function (name) {
          // 获取legend显示内容
          let data = option.series[0].data;
          let total = 0;
          let tarValue = 0;
          for (let i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          let p = (tarValue / total * 100).toFixed(2);
          return name + ' ' + ' ' + p + '%';
        },
        width: '420px',
        itemWidth: 4,
        itemHeight: 4,
        itemGap: 15,
        textStyle: {
          width: '100%'
        }
      },
      series: [
        {
          name: '运营准考证准确率分析',
          cursor: 'default',
          type: 'pie',
          radius: ['45%', '66%'],
          center: ['50%', '40%'],
          color: ["#4A90E2", "#FFCC01", "#FF626A", "#4EB5EB"],
          // hoverOffset: 0,
          // avoidLabelOverlap: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
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
          data: value
        }
      ]
    };
    return option

  }
  closePop = (data) => {
    // if (data === 'pop') {
    //   this.setState({
    //     visible: ''
    //   })
    // } else {
    //   this.setState({
    //     visible: data
    //   })
    // }
    this.props.dispatch({
      type: 'examPlant/checkDialog',
      payload: { params: { visible: '' } }
    })


  }
  handleCheck = (record, index) => {
    const props = this.props.zkzWriteDetail
    const params = {
      orgId: props.orgId,
      orgType: props.orgType,
      startDate: moment(this.props.examPlant.startTime).format('YYYY-MM-DD'),
      endDate: moment(this.props.examPlant.endTime).format('YYYY-MM-DD'),
      provinceName: record.provinceName,
    }

    this.props.dispatch({
      type: 'admissionTicket/errorData',
      payload: { params: params }
    })
    // .then(() => {
    //   this.setState({
    //     visible: record.provinceName
    //   })
    // })
    this.props.dispatch({
      type: 'examPlant/checkDialog',
      payload: { params: { visible: record.provinceName } }
    })

  }
  export = (record) => {
    const props = this.props.zkzWriteDetail
    const params = {
      orgId: props.orgId,
      orgType: props.orgType,
      startDate: moment(this.props.examPlant.startTime).format('YYYY-MM-DD'),
      endDate: moment(this.props.examPlant.endTime).format('YYYY-MM-DD'),
      provinceName: record.provinceName,
    }
    const fileName = record.provinceName + '准考证填写错误明细' + moment(new Date().getTime()).format('YYYY-MM-DD')

    this.props.dispatch({
      type: 'admissionTicket/exportErrorDetail',
      payload: { params: params, fileName: fileName }
    })
  }
  renderPopContent = record => {
    const { errorData } = this.props.admissionTicket
    if (errorData.length < 1) {
      return <div className={styles.tooltipContent}>
        <div className={styles.title}>
          <span>运营准考证准确率分析</span>
          <Icon type='close' onClick={() => this.closePop('pop')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#8B8B8B' }}></Icon>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: '#7B7C80', paddingTop: '40px' }}>
          <img src={examEmpty} style={{ width: '220px' }} />
          <p>暂无数据</p>
        </div>
      </div>
    } else {
      return (
        <div className={styles.tooltipContent}>
          <div className={styles.title}>
            <span>运营准考证准确率分析</span>
            <Icon type='close' onClick={() => this.closePop('pop')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#8B8B8B' }}></Icon>
          </div>
          <div className={styles.chart}>
            <Echart options={this.drawChart(errorData)} style={{ width: '420px', height: '320px' }}></Echart>
          </div>
          {/* <ul className={styles.intro}>
            <li><span className={styles.circle}></span>首次参考：50.00%</li>
            <li><span className={styles.circle}></span>无学员信息/无成绩：10.00%</li>
            <li><span className={styles.circle}></span>接口问题：20.00%</li>
            <li><span className={styles.circle}></span>未知：9.00%</li>
            <li><span className={styles.circle}></span>信息错误：5.00%</li>
            <li><span className={styles.circle}></span>网站关闭：6.00%</li>
          </ul> */}
        </div>
      )
    }
  }
  columns() {
    const columns = [
      {
        title: '省份',
        dataIndex: 'provinceName',
        key: 'provinceName',
      },
      {
        title: '在服学员人数',
        dataIndex: 'stuNumber',
        key: 'stuNumber',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.stuNumber))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写人数',
        dataIndex: 'sunlandsWritePersonNum',
        key: 'sunlandsWritePersonNum',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.sunlandsWritePersonNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写率',
        dataIndex: 'sunlandsWritePercent',
        key: 'sunlandsWritePercent',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.sunlandsWritePercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? `${(text * 100).toFixed(2)}%` : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '填写数量',
        dataIndex: 'sunlandsWriteNum',
        key: 'sunlandsWriteNum',
        className: styles.sunlandBg,
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.sunlandsWriteNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '验证准确数量',
        dataIndex: 'sunlandsCorrectNum',
        key: 'sunlandsCorrectNum',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.sunlandsCorrectNum))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? thousandsFormat(text) : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: '准确率',
        dataIndex: 'sunlandsWriteCorrectPercent',
        key: 'sunlandsWriteCorrectPercent',
        render: (text, record) => {
          const maxNum = Math.max.apply(Math, this.props.zkzWriteDetail.list.map(item => item.sunlandsWriteCorrectPercent))
          const percent = `${(text || 0) / maxNum * 100}%`
          return <div style={{ display: 'flex' }}>
            <BIWrapperProgress isColor='blue' text={text ? `${(text * 100).toFixed(2)}%` : 0} percent={percent} propsStyle={{ flex: 'inherit', width: '60px', textAlign: "left" }} />
          </div>
        },
      },
      {
        title: <div>操作 <Tooltip title={'由于查成绩时间会影响填写准考证的准确率，所以会多次提交验证，准确率会发生变化，请多关注该数据'}>
          <Icon type="question-circle" />
        </Tooltip></div>,
        dataIndex: 'familyName',
        key: 'familyName',
        render: (text, record, index) => {
          const content = this.renderPopContent(record, index);
          const { visible } = this.props.examPlant
          const { orgId } = this.props.zkzWriteDetail;
          return <div className={styles.options}>
            <Tooltip trigger='click' visible={visible === record.provinceName} overlayClassName={styles.listMarkingTooltip} placement="leftTop" title={content}>
              <span onClick={() => this.handleCheck(record, index)} data-trace={`{"widgetName":"尚小德渠道填写明细-查看","traceName":"报考大盘/尚小德渠道填写明细"}`}>查看</span>
            </Tooltip>
            {orgId ? <span onClick={(e) => this.export(record)} data-trace={`{"widgetName":"尚小德渠道填写明细-导出错误明细","traceName":"报考大盘/尚小德渠道填写明细"}`}>导出错误明细</span> : null}
          </div>
        }
      },
    ];
    return columns || []
  }
  onClose = () => {
    this.props.dispatch({
      type: 'examPlant/checkDialog',
      payload: { params: { visible: false } }
    })
  }
  onClose2 = () => {
    this.setState({
      visible2: false
    })
  }
  goRoute = () => {
    router.push({
      pathname: '/cubePlan/list/detail',
      query: {
        id: 1,
      }
    });
  }
  componentDidMount = () => {
    // window.onresize = this.drawChart(this.props.admissionTicket.errorData)
  }
  render() {
    const { zkzWriteDetail } = this.props
    const { visible2 } = this.state;
    return (
      <div className={styles.details}>
        <h4 className={styles.h4}>{zkzWriteDetail.orgName}</h4>
        <div className={styles.tableWrap}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={zkzWriteDetail.list}
            pagination={false}
            scroll={{ x: 0, y: 600 }}
            rowKey={(record, index) => index}
            rowClassName={this.getRowClassName}
            smalled
          />
        </div>
        {
          visible2 ? <div className={styles.floatPop}>
            <img src={pop} className={styles.img1} onClick={this.goRoute} data-trace={`{"widgetName":"跳转准考证填写组件","traceName":"报考大盘/尚小德渠道填写明细"}`}></img>
            <img src={close} className={styles.img2} onClick={this.onClose2}></img>
          </div> : null
        }

      </div>
    );
  }
}

export default Details;
