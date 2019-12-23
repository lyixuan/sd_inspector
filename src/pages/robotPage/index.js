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
  componentDidMount() {
    this.getOrgList();
  }
  getOrgList = () => {
    const date = ['2019-09-03', '2019-09-08']
    this.props.dispatch({
      type: 'robotPage/getOrgList',
      payload: { params: getDateObj(date) },
    });
  }
  // 选择时间
  onDateChange = (v) => {
    const [startTime, endTime] = initTimeData(v);
    console.log(39, startTime, endTime)
    return;
    this.props.dispatch({
      type: 'examPlant/updateDate',
      payload: { params: { startTime, endTime } }
    }).then(() => {
      this.props.getList();
      this.props.getDetailList()
    })
  }

  // 时间控件可展示的时间范围
  disabledDate = current => {
    const start = '2019.12.13'
    return current > moment().endOf('day').subtract(1, 'days') || current < moment(start);
  };
  getDate = () => {
    const startTime = moment(new Date().getTime()).subtract(10, 'days');
    const endTime = moment(new Date().getTime()).subtract(1, 'days');
    return startTime && endTime ? [startTime, endTime] : [];
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
                title === "机器人会话数据" && <BISelect style={{ width: 136 }} placeholder="选择组织">
                  {orgList && orgList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
                    {item.name}
                  </Option>)}
                </BISelect>
              }
              {
                title !== "机器人会话数据" && <BICascader
                  placeholder="选择组织"
                  changeOnSelect
                  options={orgList}
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
                allowClear={false}
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
