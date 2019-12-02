import React from 'react';
import style from './style.less';
import BITreeSelect from '@/ant_components/BITreeSelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import moment from 'moment/moment';

const { BIRangePicker } = BIDatePicker;

class TopSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
    };
  }

  render() {
    const { collegeIdList, familyIdList, groupIdList } = this.state;
    const { title, orgList = [], beginDate, endDate } = this.props;
    return (
      <div className={style.topSelect}>
        <div className={style.title}>{title}</div>
        <div>
          <span className={style.sel}>选择组织：</span>
          <span className={style.sel}>
            <BITreeSelect
              style={{ width: 200 }}
              placeholder="请选择"
              allowClear
              value={[...collegeIdList, ...familyIdList, ...groupIdList]}
              multiple
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
              allowClear
              value={beginDate && [
                moment(beginDate),
                moment(endDate),
              ]
              }
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
    )
      ;
  }
}

export default TopSelect;
