import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import InitChart from './component/InitChart';
import Echart from '@/components/Echart';
import InitTable from './component/InitTable';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ home, PushDataModel }) => ({
  home,
  PushDataModel
}))

class PushData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyList: [],
      province: '北京市',
      nodeSign: 3,
      collegeId: '',
      familyId: '',
      beginDate: moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), dateFormat),
      endDate: moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), dateFormat)
    };
    this.collegeList = [];
    this.familyList = [];
  }
  componentDidMount() {
    this.refreshList();
  }
  formValChange = (val, key) => {
    if (key === 'collegeId') {
      this.familyList = [];
      this.collegeList.forEach((v) => {
        if (v.id === Number(val.key)) {
          this.familyList = v.sub;
        }
      });
      this.setState({
        familyList: this.familyList
      })
      this.state.collegeId = val.key

    } else if (key === 'familyIdList') {
      this.state.familyId = val.key
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
    this.state.beginDate = dateString[0]
    this.state.endDate = dateString[1]
    this.refreshList();
  };
  // 触发搜索
  refreshList = () => {
    console.log(76, this.state);
    const { province, collegeId, familyId, nodeSign, beginDate, endDate } = this.state;
    this.props.dispatch({
      type: 'PushDataModel/getData',
      payload: { province: province, collegeId: collegeId, familyId: familyId, nodeSign: nodeSign, beginDate: beginDate, endDate: endDate },
    });
  }

  render() {
    this.collegeList = this.props.home.orgList;
    const { dataList } = this.props.PushDataModel
    return (
      <div className={styles.pushData}>
        <div className={styles.filterContainer}>
          <div className={styles.filterCondition}>
            <div>
              <span>学院：</span>
              <BISelect allowClear placeholder="学院" style={{ width: 190 }} labelInValue onChange={(val) => this.formValChange(val, 'collegeId')}>
                {this.collegeList.map(item => (
                  <Option key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </BISelect>
            </div>
            <div>
              <span>家族：</span>
              <BISelect placeholder="家族" allowClear style={{ width: 190 }} showArrow maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val, 'familyIdList')}>
                {this.familyList.map(item => (
                  <Option key={item.id}>
                    {item.name}
                  </Option>
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
          <InitTable proData={dataList} />
        </div>

      </div>

    );
  }

}
export default PushData;
