import React from 'react';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import { BiFilter } from '@/utils/utils';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import { PAGE_KEY_ACTION } from '@/utils/constants';
import styles from './style.less';
import formStyles from '../formCommon.less';
import { handleDateParams, initRecordTimeListData } from '../../utils/utils';
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const { Option } = BISelect;

export default class KoForm extends React.Component {
  constructor(props) {
    super(props);
    const tabFromParams = {
      recordTimeList: undefined,
      page: {},
      pageDetail: {},
      belongApp: undefined,
    }
    this.state = { tabFromParams, pageDatils: [] };
  }
  componentDidMount() {
    const { originParams } = this.props;
    this.handleOriginData(originParams);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.originParams) !== JSON.stringify(this.props.originParams)) {
      this.handleOriginData(nextProps.originParams);
    }
  }
  handleOriginData = (params = {}) => {
    let { tabFromParams } = this.state;
    const newTabFromParams = { ...tabFromParams, ...params };
    this.setState({
      tabFromParams: newTabFromParams
    });
  }
  handlePageDetail = memoizeOne((page, pageDetailInfo = this.props.pageDetailInfo) => {
    const detailObj = pageDetailInfo.find(item => item.page === page) || {};
    return detailObj.children || [];
  })
  changeDate = (recordTimeList) => {
    if (this.props.onChange) {
      const newDateTime = recordTimeList.length > 0 ? handleDateParams(recordTimeList) : undefined;
      this.onChange({ recordTimeList: newDateTime }, { recordTimeList });
    }
    this.onSaveParams({ recordTimeList });
  }
  onChangeApp = (belongApp) => {
    this.onChange({ belongApp }, { belongApp });
    this.onSaveParams({ belongApp });
  }
  onSelectPage = (value, ops) => {
    const page = {
      value,
      actionValue: value,
    };
    const currentActionKeyId = undefined;
    this.onChange({ page, currentActionKeyId }, { page, currentActionKeyId });
    this.onSaveParams({ page });
  }
  changeDetailPage = (currentActionKeyId) => {
    let { page } = this.state.tabFromParams;
    const pageObj = PAGE_KEY_ACTION.find(item => item.value === page.value);
    if (currentActionKeyId && pageObj) {
      page = { ...page, ...pageObj };
    } else {
      page = { ...page, actionValue: page.value };
    }
    this.onChange({ page, currentActionKeyId }, { page, currentActionKeyId });
    this.onSaveParams({ page, currentActionKeyId });
  }
  onSaveParams = (params = {}) => {
    const { tabFromParams } = this.state;
    this.setState({
      tabFromParams: { ...tabFromParams, ...params }
    })

  }
  onChange = (nextParams, originParmas) => {
    if (this.props.onChange) {
      this.props.onChange(nextParams, originParmas);
    }
  }
  formateDateTime = () => {
    const { recordTimeList = [] } = this.state.tabFromParams;
    const returnArr = [];
    recordTimeList.forEach(item => {
      if (item) {
        (typeof item === 'string' || typeof item === 'number') && returnArr.push(moment(item));
        typeof item === 'object' && returnArr.push(item);
      }
    });
    return returnArr;
  }
  disabledDate = (current) => {
    const { KoDateRange } = this.props.pageParams;
    const recordTimeList = initRecordTimeListData(KoDateRange);
    const [beginTime, endTime] = recordTimeList;
    return current.isBefore(moment(beginTime)) || current.isAfter(moment(endTime))
  }

  renderPagaData = () => {
    const { pageDetailInfo = [] } = this.props;
    return pageDetailInfo;
  }
  render() {
    const { tabFromParams } = this.state;
    const pageDetails = this.handlePageDetail(tabFromParams.page.value);

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
                <BISelect style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" disabled value={tabFromParams.belongApp} onChange={(val) => this.onChangeApp(val)}>
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
                <BISelect style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" value={tabFromParams.page.value} onSelect={this.onSelectPage}>
                  {this.renderPagaData().map(item => (
                    <Option key={item.page} id={item.page}>
                      {item.pageName}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              {pageDetails.length === 0 ? null :
                <>
                  <span className={styles.gutterLabel}>详情页面：</span>
                  <span className={styles.gutterForm}>
                    <BISelect style={{ width: '70%', minWidth: '140px' }} allowClear placeholder="请选择" value={tabFromParams.currentActionKeyId} onChange={this.changeDetailPage}>
                      {pageDetails.map(item => (
                        <Option key={item.actionKeyId} id={item.actionKeyId}>
                          {item.actionName}
                        </Option>
                      ))}
                    </BISelect>
                  </span>
                </>
              }

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
