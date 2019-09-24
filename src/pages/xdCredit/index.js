import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import extentImg from '@/assets/xdcredit/extent.png'
import Dimension from './dimension';
import CreditDetials from './details'
import styles from './style.less';
import moment from 'moment';
import { initTimeData } from '../ko/utils/utils'

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({ xdCreditModal, loading }) => ({
  dimensionData: xdCreditModal.dimensionData,
  dimensionDetails: xdCreditModal.dimensionDetails,
  kpiDateRange: xdCreditModal.kpiDateRange,
  infoLoading: loading.effects['xdCreditModal/getUserInfo'],
}))
class XdCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrgConfig: [],
      extendFlag: false, // 权限
      groupId: [],
      dementionId: '',
      // startTime: '',
      // endTime: '',
      pageSize: 10,
      pageIndex: 0,
    }
  }
  componentDidMount() {
    // 权限
    this.props.dispatch({
      type: 'xdCreditModal/getUserInfo',
      callback: extendFlag => {
        this.setState({ extendFlag });
        if (extendFlag) {
          const { params } = this.props.location.query;
          if (params) {
            const { dementionId, startTime, endTime } = params ? JSON.parse(params) : {};
            this.setState({
              dementionId,
              startTime,
              endTime,
            }, () => this.getUserOrgList())
          } else {
            this.getUserOrgList()
          }
        };
      }
    });
  }
  // 组织 - 时间
  getUserOrgList = (groupId) => {
    this.props.dispatch({
      type: 'xdCreditModal/getUserOrgList',
      payload: { params: { pkGroup: groupId } },
      callback: res => {
        if (res && res.length > 0) {
          this.setState({
            userOrgConfig: res,
            groupId: this.getResetGroupId(res),
          }, () => this.getDimensionList())
        } else {
          this.getDimensionList();
        }
        if (this.state.dementionId) this.getDimensionDetail();
      }
    });
    this.props.dispatch({
      type: 'xdCreditModal/getKpiDateRange',
      callback: res => {
        if (!this.state.startTime || !this.state.endTime) {
          this.setState({
            startTime: res.endDate,
            endTime: res.endDate,
          });
        }
      }
    })
  }
  // 列表
  getDimensionList = () => {
    const { startTime, endTime } = this.state;
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionList',
      payload: { params: { groupId: this.getGroupId(), startTime, endTime } },
    });
  }
  // 详情
  getDimensionDetail = () => {
    const param = {
      groupId: this.getGroupId(),
      dementionId: this.state.dementionId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex
    }
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionDetail',
      payload: { params: param },
    });
  }
  // 参数groupId
  getGroupId = () => {
    const { groupId } = this.state;
    if (groupId && groupId.length > 0) {
      return groupId[groupId.length - 1].value;
    } else {
      return undefined;
    }
  }
  // reset groupId数组
  getResetGroupId = (arr = this.state.userOrgConfig) => {
    if (arr && arr.length > 0) {
      const item = arr[0];
      return [{ name: item.name, value: item.id }]
    } else {
      return [];
    }
  }
  // date
  getDate = () => {
    const { startTime, endTime } = this.state;
    return startTime && endTime ? [moment(startTime), moment(endTime)] : [];
  }
  // 多级渲染
  renderCascader = (label) => {
    if (Array.isArray(label) && label.length === 0) return;
    let labelStr = label.join('/');
    labelStr = labelStr.length >= 10 ? `${labelStr.substr(0, 10)}...` : labelStr;
    return <span>{labelStr}</span>;
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current > moment(this.props.kpiDateRange.endDate);
  };
  // 左侧维度id
  onChangeParams = (v, type) => {
    this.setState({ [type]: v }, () => {
      if (type === 'dementionId') this.getDimensionDetail();
    })
  }
  // 对比小组
  onChangeSelect = groupId => {
    this.setState({ groupId })
  }
  // 选择时间
  onDateChange = (v) => {
    const [startTime, endTime] = initTimeData(v);
    this.setState({ startTime, endTime, });
  }
  handleClick = () => {
    this.getDimensionList();
  }
  handleReset = () => {
    this.setState({
      startTime: this.props.kpiDateRange.endDate,
      endTime: this.props.kpiDateRange.endDate,
      groupId: this.getResetGroupId()
    }, () => {
      this.getDimensionList();
      this.onChangeParams('', 'dementionId')
    })
  }
  onPageChange = (currentPage) => {
    this.setState({
      pageIndex: currentPage,
    }, () => this.getDimensionDetail());
  };
  render() {
    const { dementionId, groupId, extendFlag, userOrgConfig, startTime, endTime } = this.state;
    const { infoLoading } = this.props;
    return (
      <div className={`${styles.credit} ${extendFlag ? '' : styles.extent}`}>
        <Skeleton loading={infoLoading} >
          {extendFlag ? <>
            <div className={styles.form}>
              <span className={styles.date}>{startTime}～{endTime}</span>
              {
                userOrgConfig.length > 0 && <span className={styles.change}>
                  选择对比小组：
                <BICascader
                    data-trace='{"widgetName":"数据服务-学分明细","traceName":"数据服务/学分明细/选择对比小组"}'
                    placeholder="选择组织"
                    popupClassName={styles.popupClassName}
                    changeOnSelect
                    options={userOrgConfig}
                    fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    displayRender={this.renderCascader}
                    value={groupId}
                    onChange={this.onChangeSelect}
                    allowClear={false}
                  />
                </span>
              }
              <span className={styles.change}>
                选择时间：
              <BIRangePicker
                  data-trace='{"widgetName":"数据服务-学分明细","traceName":"数据服务/学分明细/选择时间"}'
                  value={this.getDate()}
                  placeholder={['选择起始时间', '选择截止时间']}
                  format={dateFormat}
                  onChange={this.onDateChange}
                  allowClear={false}
                  disabledDate={this.disabledDate}
                />
              </span>
              <BIButton type='reset' onClick={this.handleReset} style={{ marginRight: '8px' }}>重置</BIButton>
              <BIButton type='primary' onClick={this.handleClick} htmlType="submit">查询</BIButton>
            </div>
            {
              this.props.dimensionData.dimensionList.length > 0 && < div className={styles.dataShow}>
                <Dimension
                  dementionId={dementionId}
                  onChangeParams={this.onChangeParams}
                  dimensionData={this.props.dimensionData}
                  groupId={groupId}
                />
                <CreditDetials
                  onPageChange={this.onPageChange}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.pageIndex}
                  detailsData={this.props.dimensionDetails}
                  dementionId={dementionId}
                />
              </div>
            } </> : <>
              <img src={extentImg} alt='权限' />
              <span>你没有权限查看该页面，请联系系统管理员</span>
            </>}
        </Skeleton>
      </div >
    );
  }
}

export default XdCredit;
