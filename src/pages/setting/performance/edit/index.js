import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import { handleDateParams, handleDateFormParams } from '@/pages/ko/utils/utils';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';
import Tab from '../component/tab';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import { Checkbox } from 'antd';

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
        financeNetFlowRatioList: [
          {
            levelLowerLimit: null,
            levelUpperLimit: null,
            upperClose: false,
            lowerClose: false,
            levelValue: '',
          },
        ],
      },
      id: this.props.location.query.id,
    };

    this.initModel = {
      effectiveDate: '',
      expiryDate: '',
      positionPercent: '',
      renewalKpi: '',
      financeNetFlowRatioList: [
        {
          levelLowerLimit: null,
          levelUpperLimit: null,
          upperClose: false,
          lowerClose: false,
          levelValue: '',
        },
      ],
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
      console.log(status, 'status');
      this.getList();
    }
    this.setState({ status });
  }

  goHistory = () => {
    this.setState({ visible: true });
  };
  handleOk = () => {
    const pathname = '/setting/performance/list';
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
    const params = data;
    // this.isEmpty(params);
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

  isEmpty = isEmpty => {
    console.log(isEmpty, 'isEmpty');
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

  onChange = itemList => {
    const { data } = this.state;
    data.financeNetFlowRatioList = itemList;
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
    return (
      <div className={styles.editWrap}>
        <p>创收绩效包 / 绩效包详情</p>
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
            <p className={styles.smallPerformance}>好推净流水系数梯度表</p>
            <div className={styles.border}>
              <p className={styles.meta}>
                <span className={styles.itemLeft}>听课时间(分钟)</span>
                <span className={styles.itemMiddle}>好推净流水系数</span>
                <span className={styles.itemRight}>操作</span>
              </p>
              <Tab onChange={data => this.onChange(data)} itemList={data.financeNetFlowRatioList} />
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
