import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import extentImg from '@/assets/xdcredit/extent.png'
import Dimension from './dimension';
import CreditDetials from './details'
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(( { xdCreditModal } ) => ({
  userOrgConfig: xdCreditModal.userOrgConfig,
  dimensionList: xdCreditModal.dimensionList,
  dimensionDetails: xdCreditModal.dimensionDetails
}))
// Current credits
class XdCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extendFlag: false,
      dementionId: '' ,
      startTime: '',
      endTime: '',
      pageSize: '',
      pageIndex: '',
    }
  }
  componentDidMount(){
    this.getUserOrgList();
  }
  // 组织
  getUserOrgList = (groupId) =>{
    this.props.dispatch({
      type: 'xdCreditModal/getUserOrgList',
      payload: { params: {pkGroup:groupId} },
      callback: res =>{
        this.getDimensionList();
      }
    });
  }
  // 列表
  getDimensionList = () => {
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionList',
      payload: { params: { } },
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
    labelStr = labelStr.length >= 6 ? `${labelStr.substr(0, 6)}...` : labelStr;
    return <span>{labelStr}</span>;
  };
  onChangeParams = (v, type)=> {
    this.setState({ [type]: v }, () => {
      if (type === 'dementionId') this.getDimensionDetail();
    })
  }
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
      startTime: '',
      endTime: '',
      groupId: undefined
    }, () => this.getDimensionList())
  }
  render() {
    const { extendFlag } = this.state;
    const { userOrgConfig } = this.props;
    return (
      <div className={`${styles.credit} ${extendFlag ? '' : styles.extent}`}>
        {extendFlag ? <>
          <div className={styles.form} data-trace='{"widgetName":"本期创收-选择对比小组","traceName":"小德工作台/本期创收/选择对比小组"}'>
            <span className={styles.date}>2019.08.29～2019.09.18</span>
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
                  displayRender={this.renderCascader}/> 
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
      </div>
    );
  }
}

export default XdCredit;
