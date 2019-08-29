import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { handleDateParams, handleDateFormParams } from '@/pages/ko/utils/utils';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';
import Tab from '../component/tab';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import { message } from 'antd';
import { DeepCopy } from '@/utils/utils';

const { BIRangePicker } = BIDatePicker;

const TYPE = {
  create: 1, // 创建
  edit: 2, // 编辑
  copy: 3, // 复制
};

@connect(({ performanceModel }) => ({
  performanceModel,
}))
class detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // 默认进入的页面编辑/复制/创建
      status: 1,
      data: {
        effectiveDate: '',
        expiryDate: '',
        positionPercent: '',
        renewalKpi: '',
        adultExamSpecialKpi:'',
        financeNetFlowRatioList: [
          {
            levelLowerLimit: null,
            levelUpperLimit: null,
            upperClose: false,
            lowerClose: false,
            levelValue: '',
            levelType:2
          },
        ],
        financeNetFlowRatioList2: [
          {
            levelLowerLimit: null,
            levelUpperLimit: null,
            upperClose: false,
            lowerClose: false,
            levelValue: '',
            levelType:1
          },
        ],
      },
      id: this.props.location.query.id,
    };
  }

  // 如果是编辑或者复制需要请求;
  getList = () => {
    const { id } = this.state;
    let params = {
      id,
    };
    this.props
      .dispatch({
        type: 'performanceModel/getKpiPackage',
        payload: { params },
      })
      .then(res => {
        res.financeNetFlowRatioList2 = [];
        for(let i = res.financeNetFlowRatioList.length-1;i>=0;i--){
          if(res.financeNetFlowRatioList[i].levelType&&res.financeNetFlowRatioList[i].levelType===1){
            res.financeNetFlowRatioList2.push(res.financeNetFlowRatioList[i]);
            res.financeNetFlowRatioList.splice(i,1)
          }
        }
        this.setState({ data: res });
      });
  };

  componentDidMount() {
    const name = this.props.location.pathname;
    let { status } = this.state;
    if (name.indexOf('create') !== -1) status = TYPE.create;
    if (name.indexOf('edit') !== -1) status = TYPE.edit;
    if (name.indexOf('copy') !== -1) status = TYPE.copy;
    if (status === TYPE.edit || status === TYPE.copy) {
      this.getList();
    }
    this.setState({ status });
  }

  goHistory = () => {
    this.setState({ visible: true });
  };
  handleOk = () => {
    const query = this.props.location.query;
    router.push({
      pathname: '/setting/performance/list',
      query: { packageType: query.packageType },
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  submitMes = () => {
    const { data, status } = this.state;
    const query = this.props.location.query;
    const params = DeepCopy(data);
    params.financeNetFlowRatioList = params.financeNetFlowRatioList.concat(params.financeNetFlowRatioList2);
    delete params.financeNetFlowRatioList2;
    if (!this.isEmpty(params)) {
      message.error('请完善所有信息');
      return;
    }
    params.packageType = query.packageType;

    if (status === TYPE.edit) {
      params.id = query.id;
      this.props
        .dispatch({
          type: 'performanceModel/updateKpiPackage',
          payload: { params },
        })
        .then(res => {
          console.log(res, 'res');
          if (res) {
            router.push({
              pathname: '/setting/performance/list',
              query: { packageType: params.packageType },
            });
          }
        });
    } else {
      this.props
        .dispatch({
          type: 'performanceModel/createKpiPackage',
          payload: { params },
        })
        .then(res => {
          if (res) {
            router.push({
              pathname: '/setting/performance/list',
              query: { packageType: params.packageType },
            });
          }
        });
    }
  };

  isEmpty = item => {
    let bflag1 = false;
    let bflag2 = false;
    item.financeNetFlowRatioList.forEach(val => {
      bflag1 =
        this.fieldCheck(val.levelLowerLimit) &&
        this.fieldCheck(val.levelUpperLimit) &&
        this.fieldCheck(val.levelValue);
    });
    bflag2 = this.fieldCheck(item.positionPercent) && this.fieldCheck(item.renewalKpi)&& this.fieldCheck(item.adultExamSpecialKpi);
    return item.effectiveDate && item.expiryDate && bflag1&& bflag2;
  };

  fieldCheck = val => {
    return val === null || val === '' ? false : true;
  };

  renderInput = (obj = {}, keyName) => {
    return (
      <BIInput
        placeholder="请输入"
        dataname={keyName}
        value={obj[keyName]}
        onChange={e => this.changeInputValue(keyName, obj, e)}
        defaultValue={obj[keyName]}
      />
    );
  };

  changeInputValue = (key = '', item = {}, e) => {
    const target = e.currentTarget;
    const newObj = { ...item };
    let inputValue = target.value || '';
    inputValue = inputValue.replace(/。|\./g, '.');
    if (!/^(\d{0,9})(\.\d{0,2})?$/g.test(inputValue)) {
      return;
    }
    newObj[key] = inputValue;
    this.setState({ data: newObj });
  };

  onChange = (itemList,type) => {
    const { data } = this.state;
    if(type===2){
      data.financeNetFlowRatioList = itemList;
    } else {
      data.financeNetFlowRatioList2 = itemList;
    }

    this.setState({ data });
  };

  dateChange = (value, flag) => {
    const [beginDate, endDate] = this.checkoutParamsType('choiceTime', value);
    const { data } = this.state;
    const newObj = { ...data };
    newObj.effectiveDate = beginDate;
    newObj.expiryDate = endDate;
    this.setState({ data: newObj });
  };

  // 处理查询数据
  checkoutParamsType = (key, item) => {
    let returnItem = undefined;
    switch (key) {
      case 'choiceTime':
        returnItem = Array.isArray(item) && item.length > 0 ? handleDateParams(item) : [];
        break;
      default:
        returnItem = item;
        break;
    }
    return returnItem;
  };

  render() {
    const { data } = this.state;
    console.log(23,data)
    return (
      <div className={styles.editWrap}>
        <p>
          <Link to="/setting/performance/list" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
            创收绩效包
          </Link>
          / 绩效包详情
        </p>
        <div className={styles.header}>
          <span style={{ marginRight: '10px' }}>生效周期:</span>
          <BIRangePicker
            style={{ width: '230px', textAlign: 'left' }}
            placeholder={['开始日期', '结束日期']}
            onChange={this.dateChange}
            allowClear
            value={data.effectiveDate && [moment(data.effectiveDate), moment(data.expiryDate)]}
            disabledDate={this.disabledDate}
          />
        </div>
        <div className={styles.goodPerformance}>
          <h2 className={styles.title}>好推绩效</h2>
          <div className={styles.goodPerWrap}>
            <p className={styles.smallPerformance}>好推净流水系数梯度表（重播）</p>
            <div className={styles.border}>
              <p className={styles.meta}>
                <span className={styles.itemLeft}>重播听课时长(单位：分钟)</span>
                <span className={styles.itemMiddle}>好推净流水系数</span>
                <span className={styles.itemRight}>操作</span>
              </p>
              <Tab
                onChange={data => this.onChange(data,2)}
                itemList={data.financeNetFlowRatioList.length && data.financeNetFlowRatioList}
              />
            </div>
          </div>
          <br/>
          <div className={styles.goodPerWrap}>
            <p className={styles.smallPerformance}>好推净流水梯度表（直播）</p>
            <div className={styles.border}>
              <p className={styles.meta}>
                <span className={styles.itemLeft}>直播听课时间(单位：分钟)</span>
                <span className={styles.itemMiddle}>好推净流水系数</span>
                <span className={styles.itemRight}>操作</span>
              </p>
              <Tab
                onChange={data => this.onChange(data,1)}
                itemList={data.financeNetFlowRatioList2.length && data.financeNetFlowRatioList2}
              />
            </div>
          </div>
          <div className={styles.precentWrap}>
            <p className={styles.smallPerformance}>
              <span style={{ color: '#1A1C1F' }}>好推岗位分配比</span>
              <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                {this.renderInput(data, 'positionPercent')}
              </span>
              <span>%</span>
            </p>
          </div>
        </div>
        <div className={styles.goodPerformance}>
          <h2 className={styles.title}>续报绩效</h2>
          <div className={styles.precentWrap}>
            <p className={styles.smallPerformance}>
              <span style={{ color: '#1A1C1F' }}>续报岗位提点</span>
              <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                {this.renderInput(data, 'renewalKpi')}
              </span>
              <span>%</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: '#1A1C1F' }}>成考专本套专项绩效</span>
              <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                {this.renderInput(data, 'adultExamSpecialKpi')}
              </span>
              <span>%</span>
            </p>
          </div>
        </div>
        <p style={{ textAlign: 'right', marginTop: '10px' }}>
          <BIButton onClick={this.goHistory}>返回</BIButton>
          <BIButton style={{ marginLeft: '8px' }} type="primary" onClick={this.submitMes}>
            提交
          </BIButton>
        </p>
        <BIModal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title="警告"
          footer={[
            <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton key="submit" type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>
            <p>此操作将不保存已录入的信息，是否确认离开？</p>
          </div>
        </BIModal>
      </div>
    );
  }
}

export default detail;
