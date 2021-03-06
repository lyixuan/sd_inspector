import React from 'react';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import { BiFilter } from '@/utils/utils';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import { PAGE_KEY_ACTION } from '@/utils/constants';
import styles from './style.less';
import formStyles from '../formCommon.less';
import { handleDateParams, initRecordTimeListData, handleRecordTimeParamsNew } from '../../utils/utils';
import { connect } from 'dva';
import { Skeleton } from 'antd';
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const { Option } = BISelect;

@connect(({ koPlan, loading }) => ({
  loading: loading.effects['koPlan/getEnumData'],
  pageloading: loading.effects['koPlan/getPageList'],
}))
class KoForm extends React.Component {
  constructor(props) {
    super(props);
    const { KoDateRange } = this.props.pageParams;
    const tabFromParams = {
      recordTimeList: handleRecordTimeParamsNew(KoDateRange),
      page: {
        value: 'homepage'
      },
      pageDetail: {},
      belongApp: "1",
    }
    this.state = { tabFromParams, pageDatils: [] };
    this.filterEnumData = memoizeOne(data => this.chooseEnumData(data));
  }
  componentDidMount() {
    const { originParams } = this.props;
    this.handleOriginData(originParams);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.originParams) !== JSON.stringify(this.props.originParams)) {
      this.handleOriginData(nextProps.originParams);
    }
    if (JSON.stringify(nextProps.pageParams) !== JSON.stringify(this.props.pageParams)) {
      const { KoDateRange } = nextProps.pageParams;
      if (KoDateRange) {
        const { tabFromParams } = this.state;
        this.setState({
          tabFromParams: { ...tabFromParams,  recordTimeList: handleRecordTimeParamsNew(KoDateRange),}
        })
      }
    }
  }
  handleOriginData = (params = {}) => {
    let { tabFromParams } = this.state;
    const newTabFromParams = { ...tabFromParams, ...params };
    this.setState({
      tabFromParams: newTabFromParams
    });
  }
  // handlePageDetail = memoizeOne((page, pageDetailInfo = this.props.pageDetailInfo) => {
  //   const detailObj = pageDetailInfo.find(item => item.page === page) || {};
  //   return detailObj.children || [];
  // })
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
    const currentActionName = undefined;
    this.onChange({ page, currentActionKeyId, currentActionName }, { page, currentActionKeyId, currentActionName });
    this.onSaveParams({ page });
  }
  changeDetailPage = (...arg) => {
    const currentAction = arg[1] || { key: undefined, props: { children: {} } };
    const { key: currentActionKeyId, props: { children: currentActionName } } = currentAction;
    let { page } = this.state.tabFromParams;
    const pageObj = PAGE_KEY_ACTION.find(item => item.value === page.value);
    if (currentActionKeyId && pageObj) {
      page = { ...page, ...pageObj };
    } else {
      page = { ...page, actionValue: page.value };
    }
    this.onChange({ page, currentActionKeyId, currentActionName }, { page, currentActionKeyId, currentActionName });
    this.onSaveParams({ page, currentActionKeyId, currentActionName });
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
  handleDefaultPickerValue = () => {
    const { KoDateRange } = this.props.pageParams;
    const recordTimeList = initRecordTimeListData(KoDateRange);
    const [beginTime, endTime] = recordTimeList;
    return [moment(endTime).subtract(1,'months'), moment(endTime)]
  }
  renderPagaData = (type) => {
    const { pageDetailTotal = {} } = this.props;
    return pageDetailTotal[type] || [];
  }
  chooseEnumData = (data) => {
    let returnData = [];
    returnData = Array.isArray(data) ? data : [];
    return returnData;
  }
  render() {
    const { tabFromParams } = this.state;
    // const pageDetails = this.handlePageDetail(tabFromParams.page.value);
    const { loading, enumData, pageloading } = this.props;
    return (
      <Skeleton loading={loading} active>
        <div className={`${formStyles.formStyle}`}>
          {/*第一行*/}
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              {loading ? null :
                <>
                  <span className={styles.gutterLabel}>选择时间：</span>
                  <span className={styles.gutterForm}>

                    <BIRangePicker style={{ width: '70%', minWidth: '140px' }} placeholder={["起始时间", "截止时间"]}
                      format={dateFormat}
                      onChange={this.changeDate}
                      value={this.formateDateTime()}
                      defaultPickerValue={this.handleDefaultPickerValue()}
                      disabledDate={this.disabledDate}
                    />
                  </span></>}
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择应用：</span>
              <span className={styles.gutterForm}>
                <BISelect style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" value={tabFromParams.belongApp} onChange={(val) => this.onChangeApp(val)}>
                  {this.filterEnumData(enumData[2]).map(item => (
                    <Option key={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择页面：</span>
              <span className={styles.gutterForm}>
                <BISelect loading={pageloading} style={{ width: '70%', minWidth: '140px' }} placeholder="请选择" value={tabFromParams.page.value} onSelect={this.onSelectPage}>
                  {this.renderPagaData(tabFromParams.belongApp).map(item => (
                    <Option key={item.page} id={item.page}>
                      {item.pageName}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              {/*{pageDetails.length === 0 ? null :*/}
                {/*<>*/}
                  {/*<span className={styles.gutterLabel}>详情页面：</span>*/}
                  {/*<span className={styles.gutterForm}>*/}
                    {/*<BISelect style={{ width: '70%', minWidth: '140px' }} allowClear placeholder="请选择" value={tabFromParams.currentActionKeyId} onChange={this.changeDetailPage}>*/}
                      {/*{pageDetails.map(item => (*/}
                        {/*<Option key={item.actionId} id={item.actionId}>*/}
                          {/*{item.pageName}*/}
                        {/*</Option>*/}
                      {/*))}*/}
                    {/*</BISelect>*/}
                  {/*</span>*/}
                {/*</>*/}
              {/*}*/}

            </div>
            <div className={styles.itemCls}>
              &nbsp;
            </div>
          </div>
        </div>
      </Skeleton>
    );
  }
}
export default KoForm
