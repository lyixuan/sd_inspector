import React from 'react';
import style from './style.less';
import { message } from 'antd';
import BITreeSelect from '@/ant_components/BITreeSelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import moment from 'moment/moment';

const { BIRangePicker } = BIDatePicker;

class SearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeId: null,
      familyId: null,
      groupId: null,
      organization: [],
    };
  }

  onFormChange = (value, vname) => {
    if ('dateRange' === vname) {
      this.props.changeDate && this.props.changeDate({startDate: value[0], endDate: value[1]});
    } else if ('organization' === vname) {
      const arr = value.split('-');
      this.setState({
        organization: value,
        collegeId: arr[0] ? Number(arr[0]) : null,
        familyId: arr[1] ? Number(arr[1]) : null,
        groupId: arr[2] ? Number(arr[2]) : null,
      });
    }
  };
  disabledDate = current => {
    const {activeStartDate,activeEndDate} = this.props;
    return current < moment(new Date(activeStartDate),'YYYY-MM-DD') || current > moment(new Date(activeEndDate),'YYYY-MM-DD').add(1, 'days');
  };
  search = () => {
    const { collegeId, familyId, groupId } = this.state;
    const { beginDate, endDate} = this.props;
    const params = {collegeId, familyId, groupId, beginDate, endDate};
    if(!beginDate || !endDate) {
      message.warn('请选择搜索条件');
      return;
    }
    this.props.search && this.props.search(params);
  };
  reset = () => {
    const { startDateBak, endDateBak} = this.props;
    console.log('reset',moment(startDateBak).format('YYYY-MM-DD'))
    console.log('reset',moment(endDateBak).format('YYYY-MM-DD'))
    this.props.reset && this.props.reset({startDate:startDateBak, endDate:endDateBak});
  };

  render() {
    const { organization } = this.state;
    const { title, orgList = [],beginDate, endDate } = this.props;
    console.log('back',moment(beginDate).format('YYYY-MM-DD'))
    console.log('back',moment(endDate).format('YYYY-MM-DD'))
    return (
      <div className={style.topSelect}>
        <div className={style.title}>{title}</div>
        <div>
          <span className={style.sel}>选择组织：</span>
          <span className={style.sel}>
            <BITreeSelect
              style={{ width: 230 }}
              placeholder="请选择"
              value={organization}
              showArrow
              maxTagCount={1}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={orgList}
              onChange={val => this.onFormChange(val, 'organization')}
            />
          </span>

          <span className={style.sel}>选择时间：</span>
          <span className={style.sel}>
            <BIRangePicker
              style={{ width: 230 }}
              allowClear={false}
              disabledDate={this.disabledDate}
              value={beginDate && [
                moment(beginDate),
                moment(endDate),
              ]}
              onChange={(val, valStr) => this.onFormChange(valStr, 'dateRange')}
            />
          </span>
          <span className={style.sel}>
             <BIButton type="reset" onClick={this.reset}>重置</BIButton>
          </span>
          <span className={style.sel}>
             <BIButton onClick={this.search} type="primary">查询</BIButton>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchSelect;
