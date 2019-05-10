import React from 'react';
import styles from '../../style.less'
import moment from 'moment';
import { connect } from 'dva';
import BIPagination from '@/ant_components/BIPagination';
import BIDatePicker from '@/ant_components/BIDatePicker';;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginDate: this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.beginDate : new Date(new Date().getTime()),
      endDate: this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.endDate : new Date(new Date().getTime()),
      total: 0,
      pageSize: 10,
      page: 1
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
    this.refreshData(params)
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
    this.refreshData(params)
  }
  refreshData = (params) => {
    let type = this.props.type
    let stuId = JSON.parse(localStorage.getItem("pathParams")).record.userId;
    this.props.dispatch({
      type: 'behaviorPath/getDateList',
      payload: { params: { stuId: stuId, type: type, startDate: params.beginDate, endDate: params.endDate, page: params.page, pageSize: params.pageSize } },
    });
  }
  showTotal(total) {
    return `共${total}条`
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current < moment(this.state.beginDate) || current > moment(this.state.endDate);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    this.setState({
      beginDate: dateString[0],
      endDate: dateString[1],
      page: 1
    })

    let params = {
      beginDate: dateString[0],
      endDate: dateString[1],
      page: 1,
      pageSize: this.state.pageSize
    }
    this.refreshData(params)

  };

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div className={styles.pagers}>
        <BIRangePicker
          style={{ width: '230px', textAlign: 'left' }}
          placeholder={['开始日期', '结束日期']}
          onChange={this.dateChange}
          allowClear={false}
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