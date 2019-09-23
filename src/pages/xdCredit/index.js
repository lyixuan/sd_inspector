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

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(( { xdCreditModal, loading } ) => ({
  dimensionList: xdCreditModal.dimensionList,
  dimensionDetails: xdCreditModal.dimensionDetails,
  kpiDateRange: xdCreditModal.kpiDateRange,
  infoLoading: loading.effects['xdCreditModal/getUserInfo'],
}))
// Current credits
class XdCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrgConfig: [],
      extendFlag: false, // 权限
      groupId: [],
      dementionId: '' ,
      // startTime: '',
      // endTime: '',
      pageSize: '',
      pageIndex: '',
    }
  }
  componentDidMount(){
    this.getUserInfo();
  }
  // 权限
  getUserInfo = () =>{
    this.props.dispatch({
      type: 'xdCreditModal/getUserInfo',
      callback: extendFlag => {
        this.setState({ extendFlag });
        if (extendFlag) this.getUserOrgList();
      }
    });
  }
  // 组织
  getUserOrgList = (groupId) =>{
    this.props.dispatch({
      type: 'xdCreditModal/getUserOrgList',
      payload: { params: {pkGroup:groupId} },
      callback: res => {
        if (res && res.length > 0) {
          const item = res[0];
          this.setState({
            userOrgConfig: res,
            groupId: [{ name: item.name, value: item.id }]
          }, () => this.getDimensionList())
        } else  {
          this.getDimensionList();
        }
      }
    });
    this.props.dispatch({
      type: 'xdCreditModal/getKpiDateRange',
    })
  }
  // 列表
  getDimensionList = () => {
    const { groupId, startTime, endTime } = this.state;
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionList',
      payload: { params: { groupId: this.getGroupId(groupId), startTime, endTime } },
    });
  }
  // 详情
  getDimensionDetail = () => {
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionDetail',
      payload: { params: { } },
    });
  }
  // date
  getDate = () => {
    const {startTime, endTime} = this.state;
    return startTime && endTime ? [startTime, endTime] : [];
  }
  // 多级渲染
  renderCascader = (label) => {
    if (Array.isArray(label) && label.length === 0) return;
    let labelStr = label.join('/');
    labelStr = labelStr.length >= 10 ? `${labelStr.substr(0, 10)}...` : labelStr;
    return <span>{labelStr}</span>;
  };
  // groupId数组
  getGroupId = groupId => {
    return groupId[groupId.length - 1].value;
  }
  // 左侧维度id
  onChangeParams = (v, type)=> {
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
    this.setState({
      startTime: v[0],
      endTime: v[1]
    })
  }
  handleClick = () => {
    this.getDimensionList();
  }
  handleReset = () => {
    this.setState({
      startTime: undefined,
      endTime: undefined,
      groupId: []
    }, () => this.getDimensionList())
  }
  render() {
    const { groupId, extendFlag, userOrgConfig } = this.state;
    const { infoLoading, kpiDateRange } = this.props;
    return (
      <div className={`${styles.credit} ${extendFlag ? '' : styles.extent}`}>
        <Skeleton loading={infoLoading} >
        {extendFlag ? <>
          <div className={styles.form} data-trace='{"widgetName":"本期创收-选择对比小组","traceName":"小德工作台/本期创收/选择对比小组"}'>
            <span className={styles.date}>{kpiDateRange.startDate}～{kpiDateRange.endDate}</span>
            {
              userOrgConfig.length > 0 && <span className={styles.change}>
                选择对比小组：
                <BICascader 
                  placeholder="选择组织"
                  popupClassName={styles.popupClassName}
                  changeOnSelect 
                  options={userOrgConfig}
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  displayRender={this.renderCascader}
                  value={groupId}
                  onChange={this.onChangeSelect}
                  /> 
              </span>
            }
            <span className={styles.change}>
              选择时间：
              <BIRangePicker
                value={this.getDate()}
                placeholder={['选择起始时间', '选择截止时间']}
                format={dateFormat}
                onChange={this.onDateChange}
              />
            </span>
            <BIButton type='reset' onClick={this.handleReset} style={{ marginRight: '8px' }}>重置</BIButton>
            <BIButton type='primary' onClick={this.handleClick} htmlType="submit">查询</BIButton>
          </div>
          <div className={styles.dataShow}>
            <Dimension 
              dementionId={this.state.dementionId} 
              onChangeParams={this.onChangeParams}
              dimensionList={this.props.dimensionList}
            />
            <CreditDetials 
              detailsData={this.props.dimensionDetails}
            />
          </div> </> : <>
            <img src={extentImg} alt='权限'/>
            <span>你没有权限查看该页面，请联系系统管理员</span>
          </> }
        </Skeleton>
      </div>
    );
  }
}

export default XdCredit;
