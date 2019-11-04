import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import style from './style.less';
import moment from 'moment/moment';
import { message, Input, Checkbox } from 'antd/lib/index';
const { BIRangePicker } = BIDatePicker;

const { Option } = BISelect;

@connect(({ report, loading }) => ({
  report,
  loadingTime: loading.effects['createIncome/getTimeRange'],
}))
class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignoreUsers: '',
      title: '',
    };
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'report/getIgnoreUser',
    //   payload: { params: {} },
    // });
  }

  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value,
    });
  };

  onTimeChange = (value, vname) => {
    console.log(value, vname, 'onTimeChange');
    // this.props.dispatch({
    //   type: '/saveTime',
    //   payload: { [vname]: value },
    // });
  };
  onChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  changeTitle = () => {};

  sendFn = () => {
    this.props.dispatch({
      type: 'report/send',
      payload: { params: {} },
    });
  };

  inputChange = (e, key) => {
    const obj = {};
    // const value = e.target.value;
    // if (isNaN(Number(value)) && value !== '-') {
    //   this.props.onError && this.props.onError();
    //   return;
    // }
    obj[key] = e.target.value;
    this.setState({ ...obj });
    e.stopPropagation();
  };

  send = () => {
    const { beginDate, endDate, title, roleList, ignoreUsers } = this.state;
  };

  render() {
    const { ignoreUsers, title } = this.state;
    const options = [
      { label: '院长&副院长', value: '1' },
      { label: '家族长', value: '2' },
      { label: '运营长', value: '3' },
      { label: '班主任', value: '4' },
      { label: '我自己', value: '5' },
    ];
    return (
      <>
        <Spin spinning={false}>
          <div className={style.box}>
            <div className={style.title}>发周报</div>
            <div className={style.line}>
              <span>开始日期：</span>
              <BIRangePicker
                style={{ width: 330 }}
                allowClear={false}
                placeholder={['选择起始时间', '选择截止时间']}
                // value={startDate ? moment(startDate) : undefined}
                onChange={(val, valStr) => this.onTimeChange(val, valStr, 'startDate')}
              />
            </div>
            <div className={style.line}>
              <span>邮件标题：</span>
              <Input
                value={title}
                onInput={e => this.inputChange(e, 'title')}
                style={{ width: 330 }}
              />
            </div>
            <div className={style.line}>
              <span>发送范围：</span>
              <Checkbox.Group
                style={{ width: 440, height: ' 32px', lineHeight: '32px' }}
                options={options}
                defaultValue={['Apple']}
                onChange={() => this.onChange}
              />
            </div>
            <div className={style.line}>
              <span>屏蔽用户：</span>
              <Input
                style={{ width: 440 }}
                value={ignoreUsers}
                onInput={e => this.inputChange(e, 'ignoreUsers')}
              />
            </div>
            <div style={{ width: 440, textAlign: 'center' }}>
              <BIButton type="primary" onClick={this.sendFn}>
                发送
              </BIButton>
            </div>
          </div>
        </Spin>
      </>
    );
  }
}

export default Report;
