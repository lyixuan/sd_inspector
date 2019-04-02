import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import InitChart from './component/InitChart';
import Echart from '@/components/Echart';
import InitTable from './component/InitTable';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import router from 'umi/router';
const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ home, PushDataModel }) => ({
  home,
  PushDataModel,
}))
class PushData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyList: [],
      province: this.props.location.query.province || '北京市',
      nodeSign: this.props.location.query.nodeSign || 3,
      collegeId: '',
      familyId: '',
      beginDate: moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), dateFormat),
      endDate: moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), dateFormat),
      page: 1,
      pageSize: 10,
    };
    this.collegeList = [];
    this.familyList = [];
  }
  componentDidMount() {
    this.refreshList();
  }
  onSizeChange = val => {
    this.state.page = val;
    this.refreshList();
  };
  formValChange = (val, key) => {
    if (key === 'collegeId') {
      this.familyList = [];
      this.collegeList.forEach(v => {
        if (v.id === Number(val.key)) {
          this.familyList = v.sub;
        }
      });
      this.setState({
        familyList: this.familyList,
        familyId: '',
      });
      this.state.familyId = '';
      this.state.collegeId = val.key;
    } else if (key === 'familyIdList') {
      this.setState({
        familyId: val,
      });
      this.state.familyId = val;
    }
    this.refreshList();
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    return current < moment('2018-10-23') || current > moment(day1, dateFormat);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    this.state.beginDate = dateString[0];
    this.state.endDate = dateString[1];
    this.refreshList();
  };
  exportData = () => {
    const { province, collegeId, familyId, nodeSign, beginDate, endDate } = this.state;
    this.props.dispatch({
      type: 'PushDataModel/exportData',
      payload: {
        province: province,
        collegeId: collegeId,
        familyId: familyId,
        nodeSign: nodeSign,
        beginDate: beginDate,
        endDate: endDate,
      },
    });
  };
  // 触发搜索
  refreshList = () => {
    console.log(76, this.state);
    const {
      province,
      collegeId,
      familyId,
      nodeSign,
      beginDate,
      endDate,
      page,
      pageSize,
    } = this.state;
    this.props.dispatch({
      type: 'PushDataModel/getData',
      payload: {
        province: province,
        collegeId: collegeId,
        familyId: familyId,
        nodeSign: nodeSign,
        beginDate: beginDate,
        endDate: endDate,
        page: page,
        pageSize: pageSize,
      },
    });
  };

  render() {
    this.collegeList = this.props.home.orgList;
    const { dataList } = this.props.PushDataModel;
    console.log(this.props.PushDataModel);
    return (
      <div className={styles.pushData}>
        <div className={styles.filterContainer}>
          <div className={styles.filterCondition}>
            <div>
              <span>学院：</span>
              <BISelect
                placeholder="学院"
                style={{ width: 190 }}
                labelInValue
                onChange={val => this.formValChange(val, 'collegeId')}
              >
                {this.collegeList.map(item => (
                  <Option key={item.id}>{item.name}</Option>
                ))}
              </BISelect>
            </div>
            <div>
              <span>家族：</span>
              <BISelect
                placeholder="家族"
                style={{ width: 190 }}
                showArrow
                value={this.state.familyId ? this.state.familyId : undefined}
                onChange={val => this.formValChange(val, 'familyIdList')}
              >
                {this.familyList.map(item => (
                  <Option key={item.id}>{item.name}</Option>
                ))}
              </BISelect>
            </div>
            <div>
              <span>日期：</span>
              <BIRangePicker
                style={{ width: '230px', textAlign: 'left' }}
                placeholder={['开始时间', '结束时间']}
                onChange={this.dateChange}
                allowClear={false}
                defaultValue={[this.state.beginDate, this.state.endDate]}
                disabledDate={this.disabledDate}
              />
            </div>
          </div>
          <InitChart proData={dataList} />
        </div>
        <div className={styles.tableContainer}>
          <InitTable
            proData={dataList}
            exportData={this.exportData}
            onSizeChange={this.onSizeChange}
          />
        </div>
      </div>
    );
  }
}
export default PushData;
