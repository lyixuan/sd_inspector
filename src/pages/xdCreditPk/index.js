import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import XdFamilyPk from './family';
import XdClassPk from './class';
import styles from './style.less';
import { initTimeData } from '../ko/utils/utils';
import moment from 'moment';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
const userTypes = {
  'class': 1,
  'group': 1,
  'family': 2,
  'none': 0
}
@connect(({ xdCreditPkModal }) => ({
  globalDateRange: xdCreditPkModal.globalDateRange
}))
class XdCreditPk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
      dataRange: []
    }
  }
  componentDidMount() {
    // 时间接参
    const params = this.props.location.query.params;
    const { startTime, endTime } = params ? JSON.parse(params) : {}; 
    this.props.dispatch({
      type: 'xdCreditPkModal/getKpiDateRange',
      callback: dataRange => {  
        if (startTime && endTime)  {
          this.setState({
            dataRange: [moment(startTime), moment(endTime)]
          })
        } else {
          this.setState({ dataRange })   
        }
      }
    })
    // 小组-绩效列表
    this.props.dispatch({
      type: 'xdCreditPkModal/getKpiLevelList',
    });
    
    const admin_user = localStorage.getItem('admin_user');
    const userType = userTypes[JSON.parse(admin_user) ? JSON.parse(admin_user).userType : 'none'];
    this.setState({ userType });
    if (userType === 2)  {
      // 家族-学院列表
      this.props.dispatch({
        type: 'xdCreditPkModal/getIncomeCollegeList',
      });
    }
  }
  // 选择时间
  onDateChange = dataRange => {
    this.setState({ dataRange })
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current > moment(this.props.globalDateRange.endDate) || current < moment(this.props.globalDateRange.startDate);
  };
  
  render() {
    const { userType, dataRange } = this.state;
    return (
      <div className={styles.xdCreditPk}> 
        { userType && 
          <> <div className={styles.dataRange} style={{ left: userType === 1 ? 24 : 280}}>
            {userType === 1 ? '选择时间：' : ''}
            <BIRangePicker
                value={dataRange}
                placeholder={['选择起始时间', '选择截止时间']}
                format={dateFormat}
                onChange={this.onDateChange}
                allowClear={false}
                disabledDate={this.disabledDate}
                style={{ width: '224px' }}
              />
          </div>
          { userType === 1 ? <XdClassPk dateRangeSelect={initTimeData(dataRange)} /> : (userType === 2 ? <XdFamilyPk dateRangeSelect={initTimeData(dataRange)} /> : '') } </>
        }
      </div>
    );
  }
}
export default XdCreditPk;