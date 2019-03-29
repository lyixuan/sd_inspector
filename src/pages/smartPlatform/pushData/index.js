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
      familyList: []
    };
    this.collegeList = [];
    this.familyList = [];
  }
  componentDidMount() {

  }
  formValChange = (val, key) => {
    console.log(25, val, key)
    if (val === undefined) {
      if (key === 'collegeId') {
        this.familyList = [];
      }
    }
    // 学院家族联动
    if (key === 'collegeId') {
      this.collegeList.forEach((v) => {
        if (v.id === Number(val.key)) {
          this.familyList = v.sub;
        }
      });
    }
    this.setState({
      familyList: this.familyList
    })
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const day1 = new Date();
    day1.setTime(day1.getTime());
    return current < moment('2018-10-23') || current > moment(day1, dateFormat);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    console.log(57, dateString)
    const dateObj = {
      beginDate: dateString[0],
      endDate: dateString[1],
    }
  };
  render() {
    this.collegeList = this.props.home.orgList;
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
                defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                disabledDate={this.disabledDate}
              />
            </div>
          </div>
          <InitChart />

        </div>
        <div className={styles.tableContainer}>
          <InitTable />
        </div>

      </div>

    );
  }

}
export default PushData;
