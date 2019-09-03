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
      zbShow:false,
      cbShow:false,
      cbtimeShow:false,
      fpShow:false,
      xbShow:false,
      // 默认进入的页面编辑/复制/创建
      status: 1,
      data: {
        effectiveDate: '',
        expiryDate: '',
        positionPercent: '0.00',
        replayLecturesTime: '0.00',
        renewalKpi: '0.00',
        adultExamSpecialKpi: '0.00',
        financeNetFlowRatioList: [
          {
            levelLowerLimit: '0.00',
            levelUpperLimit: '0.00',
            upperClose: false,
            lowerClose: false,
            levelValue: '0.00',
            levelType: 2,
          },
        ],
        financeNetFlowRatioList2: [
          {
            levelLowerLimit: '0.00',
            levelUpperLimit: '0.00',
            upperClose: false,
            lowerClose: false,
            levelValue: '0.00',
            levelType: 1,
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
        for (let i = res.financeNetFlowRatioList.length - 1; i >= 0; i--) {
          if (
            res.financeNetFlowRatioList[i].levelType &&
            res.financeNetFlowRatioList[i].levelType === 1
          ) {
            res.financeNetFlowRatioList2.push(res.financeNetFlowRatioList[i]);
            res.financeNetFlowRatioList.splice(i, 1);
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
    if (!this.checkData(data)) {
      return;
    }
    const params = DeepCopy(data);
    params.financeNetFlowRatioList.forEach(item => {
      item.levelType = 2;
    });
    params.financeNetFlowRatioList2.forEach(item => {
      item.levelType = 1;
    });

    params.financeNetFlowRatioList = params.financeNetFlowRatioList.concat(
      params.financeNetFlowRatioList2
    );
    delete params.financeNetFlowRatioList2;
    // if (!this.isEmpty(params)) {
    //   message.error('请完善所有信息');
    //   return;
    // }

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
  checkData = (obj)=>{
    console.log(obj)
    this.setState({
      cbtimeShow:false,
      zbShow:false,
      cbShow:false,
      fpShow:false,
      xbShow:false,
    });
    let pass = true; // 1:  2:
    if (!obj.effectiveDate) {
      pass = false;
      message.error('请选择生效周期');
    }

    if (!String(obj.replayLecturesTime)) {
      pass = false;
      this.setState({
        cbtimeShow:true,
      });
      message.error('请输入重播时长');
    }
    if (!String(obj.positionPercent)) {
      pass = false;
      this.setState({
        fpShow:true,
      });
      message.error('请输入好岗位分配比');
    }
    if (!String(obj.renewalKpi)) {
      pass = false;
      this.setState({
        xbShow:true,
      });
      message.error('续报岗位提点');
    }
    if (!String(obj.adultExamSpecialKpi)) {
      pass = false;
      this.setState({
        xbShow:true,
      });
      message.error('成考专本套专项绩效');
    }
    const list1 = obj.financeNetFlowRatioList;
    for (let i = 0; i < list1.length; i++) {
      if (list1[i].levelLowerLimit >= list1[i].levelUpperLimit) {
        pass = false;
        this.setState({
          cbShow:true,
        });
        message.error('重播听课时长 右区间要大于区间');
      }
      if (i > 0 && Number(list1[i].levelLowerLimit) !== Number(list1[i - 1].levelUpperLimit)) {
        pass = false;
        this.setState({
          cbShow:true,
        });
        message.error('重播听课时长 连续两个范围的左右区间应该连续');
      }

      if (i > 0 && list1[i].lowerClose && list1[i - 1].upperClose) {
        pass = false;
        this.setState({
          cbShow:true,
        });
        message.error('重播听课时长 连续两个范围的左右区间不能同时闭合');
      }
    }
    const list2 = obj.financeNetFlowRatioList2;
    for(let k = 0;k<list2.length;k++){
      if(list2[k].levelLowerLimit>=list2[k].levelUpperLimit){
        pass = false;
        this.setState({
          zbShow:true
        });
        message.error('直播听课时长 右区间要大于区间');
      }
      if(k>0 && Number(list2[k].levelLowerLimit) !== Number(list2[k-1].levelUpperLimit)) {
        pass = false;
        this.setState({
          zbShow:true,
        });
        message.error('直播听课时长 连续两个范围的左右区间应该连续');
      }
      if(k>0 && list2[k].lowerClose && list2[k-1].upperClose) {
        pass = false;
        this.setState({
          zbShow:true,
        });
        message.error('直播听课时长 连续两个范围的左右区间不能同时闭合');
      }
    }

    return pass;
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
    bflag2 =
      this.fieldCheck(item.positionPercent) &&
      this.fieldCheck(item.replayLecturesTime) &&
      this.fieldCheck(item.renewalKpi) &&
      this.fieldCheck(item.adultExamSpecialKpi);
    return item.effectiveDate && item.expiryDate && bflag1 && bflag2;
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

  onChange = (itemList, type) => {
    const { data } = this.state;
    if (type === 2) {
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
    if (!data.financeNetFlowRatioList) {
      data.financeNetFlowRatioList = [];
    }
    if (!data.financeNetFlowRatioList2) {
      data.financeNetFlowRatioList2 = [];
    }
    return (
      <div className={styles.editWrap}>
        <p>
          <Link to="/setting/performance/list" style={{ color: '#9A9DA1' }}>
            创收绩效包/
          </Link>
          <span style={{ color: '#000000' }}>绩效包详情</span>
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
            <div className={this.state.cbShow?styles.border2:styles.border}>
              <p className={styles.meta}>
                <span className={styles.itemLeft}>重播听课时长(单位：分钟)</span>
                <span className={styles.itemMiddle}>好推净流水系数</span>
                <span className={styles.itemRight}>操作</span>
              </p>
              <Tab
                onChange={data => this.onChange(data, 2)}
                itemList={data.financeNetFlowRatioList}
              />
            </div>
          </div>
          <br />
          <div className={styles.goodPerWrap}>
            <p className={styles.smallPerformance}>好推净流水梯度表（直播）</p>
            <div className={this.state.zbShow?styles.border2:styles.border}>
              <p className={styles.meta}>
                <span className={styles.itemLeft}>直播听课时间(单位：分钟)</span>
                <span className={styles.itemMiddle}>好推净流水系数</span>
                <span className={styles.itemRight}>操作</span>
              </p>
              <Tab
                onChange={data => this.onChange(data, 1)}
                itemList={data.financeNetFlowRatioList2}
              />
            </div>
          </div>
          <div className={this.state.cbtimeShow?styles.precentWrap3:styles.precentWrap2}>
            <p style={{ color: '#1A1C1F' }}>获得直播加成条件</p>
            <p className={styles.smallPerformance}>
              <span style={{ color: '#1A1C1F' }}>重播时长</span>
              <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                {this.renderInput(data, 'replayLecturesTime')}
              </span>
              <span>分钟</span>
            </p>
          </div>
          <div className={this.state.fpShow?styles.precentWrap1:styles.precentWrap}>
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
          <div className={this.state.xbShow?styles.precentWrap1:styles.precentWrap}>
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
              <span>元/单</span>
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
