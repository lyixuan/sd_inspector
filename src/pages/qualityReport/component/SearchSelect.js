import React from 'react';
import style from './style.less';
import { message } from 'antd';
import BITreeSelect from '@/ant_components/BITreeSelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import moment from 'moment/moment';
import { handleDataTrace } from '@/utils/utils';

const { BIRangePicker } = BIDatePicker;

class SearchSelect extends React.Component {

  onFormChange = (value, vname) => {
    if ('dateRange' === vname) {
      handleDataTrace({ widgetName: `选择时间-${this.props.traceType}`, traceName: `质检管理/${this.props.traceType}质检报告/选择时间` });
      this.props.changeDate && this.props.changeDate({startDate: value[0], endDate: value[1]});
    } else if ('organization' === vname) {
      handleDataTrace({ widgetName: `选择组织-${this.props.traceType}`, traceName: `质检管理/${this.props.traceType}质检报告/选择组织` });
      this.props.changeOrganization && this.props.changeOrganization({organization:value});
    }
  };
  disabledDate = current => {
    const {activeStartDate,activeEndDate} = this.props;
    return current < moment(new Date(activeStartDate),'YYYY-MM-DD') || current > moment(new Date(activeEndDate),'YYYY-MM-DD').add(0, 'days');
  };
  search = () => {
    const { beginDate, endDate,organization} = this.props;
    const params = {organization, beginDate, endDate};
    if(!beginDate || !endDate ||!organization) {
      message.warn('请选择搜索条件');
      return;
    }
    this.props.search && this.props.search(params);
    handleDataTrace({ widgetName: `点击查询-${this.props.traceType}`, traceName: `质检管理/${this.props.traceType}质检报告/查询` });
  };
  reset = () => {
    const { startDateBak, endDateBak,organizationBak} = this.props;
    this.props.reset && this.props.reset({startDate:startDateBak, endDate:endDateBak,organization:organizationBak});
  };

  render() {
    let { title, orgList = [],beginDate, endDate,organization,traceType } = this.props;
    if(traceType==='客诉') {
      orgList.forEach((item)=>{
        delete item.children;
      })
    }



    return (
      <div className={style.topSelect}>
        <div className={style.title}></div>
        <div>
          <span className={style.sel}></span>
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

          <span className={style.sel}></span>
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
