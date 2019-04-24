import React from 'react';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import { BiFilter } from '@/utils/utils';
import moment from 'moment';
import styles from './style.less';
import formStyles from '../formCommon.less';
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const { Option } = BISelect;

export default class KoForm extends React.Component {
  constructor(props) {
    super(props);
    const tabFromParams = {
      beginTime: undefined,
      endTime: undefined,
      page: {},
      pageDetail: {},
      fromApp: undefined,
    }

    this.init = {
      appVer: '1',
      beginDate: undefined,
      endDate: undefined,
    };
    this.state = { tabFromParams, pageDatils: [] };
  }
  componentDidMount() {
    const { originParams } = this.props;
    this.handleOriginData(originParams);
    this.handlePageDetail();
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.originParams) !== JSON.stringify(this.props.originParams)) {
      this.handleOriginData(nextProps.originParams);
    }
  }
  handlePageDetail = (page) => {


  }
  handleOriginData = (params = {}) => {
    let { tabFromParams } = this.state;
    this.setState({
      tabFromParams: { ...tabFromParams, ...params }
    })

  }
  changeDate = (data) => {
    const [startTime, endTime] = data;
    if (this.props.onChange) {
      this.props.onChange({ startTime, endTime });
    }
  }
  onSelectPage = () => {

  }
  formateDateTime = () => {
    const { beginTime, endTime } = this.state.tabFromParams;
    const returnArr = [];
    [beginTime, endTime].forEach(item => {
      if (item) {
        returnArr.push(moment(item));
      }
    });
    return returnArr;
  }
  disabledDate = (current) => {
    const { beginTime, endTime } = this.state.tabFromParams;
    return current.isBefore(moment(beginTime)) || current.isAfter(moment(endTime))
  }
  onFormChange = (value, vname) => {
    // todo
    // 1、选择页面为商城列表或KO计划页面时，详情页面展示，否则隐藏，清除选中值
    // 2、所有的change都触发请求
    // 选择页面默认值：首页，详情页面默认值:无
    if ('dateRange' === vname) {
      this.setState({
        beginDate: value[0],
        endDate: value[1],
      });
    } else {
      this.setState({
        [vname]: value
      });
    }
  };
  render() {
    const { appVer, tabFromParams } = this.state;
    const { appPage, pageParams } = this.props;
    const { appPageList = [] } = pageParams;

    return (
      <div>
        <div className={`${styles.searchBlock} ${formStyles.formStyle}`}>
          {/*第一行*/}
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择时间：</span>
              <span className={styles.gutterForm}>
                <BIRangePicker style={{ width: '70%', minWidth: '140px' }} placeholder={["起始时间", "截止时间"]}
                  format={dateFormat}
                  onChange={this.changeDate}
                  value={this.formateDateTime()}
                  disabledDate={this.disabledDate} />
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择应用：</span>
              <span className={styles.gutterForm}>
                <BISelect style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" value={appVer} onChange={(val) => this.onFormChange(val, 'appVer')}>
                  {BiFilter('APP_LIST').map(item => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择页面：</span>
              <span className={styles.gutterForm}>
                <BISelect style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" value={appPage} onChange={(val) => this.onFormChange(val, 'appPage')}>
                  {appPageList.map(item => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>详情页面：</span>
              <span className={styles.gutterForm}>
                <BISelect style={{ width: '70%', minWidth: '140px' }} allowClear placeholder="请选择" />
              </span>
            </div>
            <div className={styles.itemCls}>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}
