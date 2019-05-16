import React from 'react';
import styles from '../../style.less'
import moment from 'moment';
import { connect } from 'dva';
import BIPagination from '@/ant_components/BIPagination';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { message } from 'antd';
const { BIRangePicker } = BIDatePicker;

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Pager extends React.Component {
  constructor(props) {
    super(props);
    const beginDate = this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.beginDate : new Date(new Date().getTime());
    const endDate = this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.endDate : new Date(new Date().getTime())
    this.state = {
      defaultBeginDate: beginDate,
      defaultEndDate: endDate,
      beginDate: beginDate,
      endDate: endDate,
      total: 0,
      pageSize: 10,
      page: 1,
      // stuId: JSON.parse(this.props.location.query.params).userId
    }

  }
  componentDidMount() {
    this.props.dispatch({
      type: 'behaviorPath/getDateRange',
      payload: {},
    });
  }
  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.behaviorPath.dateRange) !==
      JSON.stringify(this.props.behaviorPath.dateRange)
    ) {
      this.setState({
        beginDate: nextProps.behaviorPath.dateRange.beginDate,
        endDate: nextProps.behaviorPath.dateRange.endDate,
        defaultBeginDate: nextProps.behaviorPath.dateRange.beginDate,
        defaultEndDate: nextProps.behaviorPath.dateRange.endDate
      })
    }
  }
  // 每页显示多少条
  onShowSizeChange = (current, size) => {
    this.setState({
      pageSize: size
    })
    let params = {
      beginDate: this.state.beginDate,
      endDate: this.state.endDate,
      page: current,
      pageSize: size
    }
    this.refreshData(params, 'pager')
  }
  // 分页切换
  onSizeChange = (page) => {
    this.setState({
      page: page
    })
    let params = {
      beginDate: this.state.beginDate,
      endDate: this.state.endDate,
      page: page,
      pageSize: this.state.pageSize
    }
    this.refreshData(params, 'pager')
  }
  callback = (total) => {
    if (total < 1) {
      message.info('该学员在您选择的日期中没有数据');

    } else {
      message.info(`该学员在您选择的日期中共有${total}天的数据`);

    }
  }
  refreshData = (params, source) => {
    let type = this.props.type;
    let stuId = this.props.stuId;
    if (source == 'dateChange') {
      this.props.dispatch({
        type: 'behaviorPath/getDateList',
        payload: { fn: this.callback, params: { stuId: stuId, type: type, startDate: params.beginDate, endDate: params.endDate, page: params.page, pageSize: params.pageSize } },
      });
    } else {
      this.props.dispatch({
        type: 'behaviorPath/getDateList',
        payload: { params: { stuId: stuId, type: type, startDate: params.beginDate, endDate: params.endDate, page: params.page, pageSize: params.pageSize } },
      });
    }
    this.props.onClick();

  }
  showTotal(total) {
    return `共${total}条`
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current < moment(this.state.defaultBeginDate) || current > moment(this.state.defaultEndDate);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    let beginDate = dateString[0] ? dateString[0] : this.state.defaultBeginDate;
    let endDate = dateString[1] ? dateString[1] : this.state.defaultEndDate
    this.setState({
      beginDate: beginDate,
      endDate: endDate,
      page: 1
    })
    let params = {
      beginDate: beginDate,
      endDate: endDate,
      page: 1,
      pageSize: this.state.pageSize
    }
    this.refreshData(params, 'dateChange')
  };

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div className={styles.pagers}>
        <BIRangePicker
          style={{ width: '230px', textAlign: 'left' }}
          placeholder={['开始日期', '结束日期']}
          onChange={this.dateChange}
          allowClear
          defaultValue={[moment(this.state.beginDate, dateFormat), moment(this.state.endDate, dateFormat)]}
          value={[moment(this.state.beginDate, dateFormat), moment(this.state.endDate, dateFormat)]}
          disabledDate={this.disabledDate}
        />
        <BIPagination
          showQuickJumper
          showSizeChanger
          showTotal={this.showTotal}
          defaultPageSize={this.state.pageSize}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onSizeChange}
          current={this.state.page}
          total={this.props.total}
        />
      </div>

    );
  }
}

export default Pager;
