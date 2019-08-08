import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';
import Tab from '../component/tab';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import { Checkbox } from 'antd';

const { BIRangePicker } = BIDatePicker;

class detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
          upperClose: null,
          lowerClose: null,
          levelValue: '',
        },
      ],
    };
  }

  goHistory = () => {
    this.setState({ visible: true });
  };
  handleOk = () => {
    const pathname = '/setting/performance/list';
    router.push({ pathname });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  submitMes = () => {
    console.log('提交信息');
  };
  render() {
    const itemList = {
      effectiveDate: '1565232306052',
      expiryDate: '1565232315842',
      positionPercent: '50',
      renewalKpi: '2',
      financeNetFlowRatioList: [
        {
          levelLowerLimit: 10,
          levelUpperLimit: 90,
          upperClose: false,
          lowerClose: true,
          levelValue: 19,
        },
      ],
    };
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
              <Tab itemList={itemList.financeNetFlowRatioList} />
            </div>
          </div>
          <div className={styles.precentWrap}>
            <p className={styles.smallPerformance}>
              <span style={{ color: '#1A1C1F' }}>好推岗位分配比</span>
              <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                <BIInput placeholder="请输入" />
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
                <BIInput placeholder="请输入" />
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
