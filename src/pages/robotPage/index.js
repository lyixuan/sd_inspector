import React, { Component } from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BICascader from '@/ant_components/BICascader';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment';
import { initTimeData } from '@/pages/ko/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY-MM-DD';

const headObj = {
  '/robotPage/data': '机器人会话数据',
  '/robotPage/trend': '机器人会话趋势'
}

@connect(({ robotPage }) => ({
  robotPage,
  globalOrgList: robotPage.globalOrgList || {},
}))
class RobotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeId: undefined,
      startTime: moment(new Date().getTime()).subtract(7, 'days'),
      endTime: moment(new Date().getTime()).subtract(1, 'days'),
      startTime1: moment(new Date().getTime()).subtract(10, 'days'),
      endTime1: moment(new Date().getTime()).subtract(1, 'days'),
      org: []
    }
  }
  componentDidMount() {
    this.getOrgList();
    console.log(39, this.props.location.pathname)
    if (this.props.location.pathname == '/robotPage/data') {
      this.dialoguDataList();
    } else {
      this.getDayData();
      this.getDialogAndEvaluateData();
    }

  }
  getOrgList = () => {
    this.props.dispatch({
      type: 'robotPage/getOrgList'
    });
  }
  dialoguDataList = () => {
    const { startTime, endTime } = this.state;
    const params = {
      collegeId: this.state.collegeId,
      startDate: startTime.format(dateFormat),
      endDate: endTime.format(dateFormat)
    }
    this.props.dispatch({
      type: 'robotPage/dialoguDataList',
      payload: { params },
    });
  }
  getDialogAndEvaluateData = () => {
    const { startTime1, endTime1, org } = this.state;
    const params = {
      collegeId: org[0],
      familyId: org[1],
      startDate: startTime1.format(dateFormat),
      endDate: endTime1.format(dateFormat)
    }
    this.props.dispatch({
      type: 'robotPage/getDialogAndEvaluateData',
      payload: { params },
    });
  }
  getDayData = () => {
    const { startTime1, endTime1, org } = this.state;
    const params = {
      collegeId: org[0],
      familyId: org[1],
      startDate: startTime1.format(dateFormat),
      endDate: endTime1.format(dateFormat)
    }
    this.props.dispatch({
      type: 'robotPage/getDayData',
      payload: { params },
    });
  }
  // 选择时间
  onDateChange = (v) => {
    if (this.props.location.pathname == '/robotPage/data') {
      this.setState({
        startTime: v[0],
        endTime: v[1],
      }, () => {
        this.dialoguDataList();
      })
    } else {
      this.setState({
        startTime1: v[0],
        endTime1: v[1],
      }, () => {
        this.getDayData();
        this.getDialogAndEvaluateData();
      })
    }

  }

  // 时间控件可展示的时间范围
  disabledDate = current => {
    const start = '2019.12.13'
    return current > moment().endOf('day').subtract(1, 'days') || current < moment(start);
  };
  getDate = () => {
    if (this.props.location.pathname === '/robotPage/data') {
      const { startTime, endTime } = this.state
      return startTime && endTime ? [startTime, endTime] : [];
    } else {
      const { startTime1, endTime1 } = this.state
      return startTime1 && endTime1 ? [startTime1, endTime1] : [];
    }

  }
  onChange1 = (val) => {
    this.setState({
      collegeId: val,
    }, () => {
      this.dialoguDataList();
    })
  }
  onChange2 = (val) => {
    this.setState({
      org: val,
    }, () => {
      this.getDayData();
      this.getDialogAndEvaluateData();
    })
  }
  render() {
    const { location = {} } = this.props;
    const title = headObj[location.pathname];
    const orgList = title === '机器人会话数据' ? this.props.globalOrgList[0] || [] : this.props.globalOrgList[1] || []
    return (
      <>
        {
          <div className={styles.title}>
            <span>{title}</span>
            <div className={styles.titleRight}>
              {
                title === "机器人会话数据" && <BISelect style={{ width: 136 }} allowClear placeholder="请选择" onChange={this.onChange1} value={this.state.collegeId}>
                  {orgList && orgList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"机器人会话数据","traceName":"机器人会话数据/选择组织"}'>
                    {item.name}
                  </Option>)}
                </BISelect>
              }
              {
                title !== "机器人会话数据" && <BICascader
                  placeholder="请选择"
                  changeOnSelect
                  value={this.state.org}
                  options={orgList}
                  onChange={this.onChange2}
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  allowClear
                  style={{ width: 136 }}
                />
              }
              <BIRangePicker
                value={this.getDate()}
                placeholder={['选择起始时间', '选择截止时间']}
                format={dateFormat}
                onChange={this.onDateChange}
                allowClear
                disabledDate={this.disabledDate}
                style={{ width: 224, marginLeft: 12 }}
              />
            </div>
          </div>
        }
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default RobotPage;
