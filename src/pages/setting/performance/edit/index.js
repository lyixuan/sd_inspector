import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
    this.state = {};

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

  checkChange = () => {
    console.log('1');
  };

  // 添加好推绩效列表
  addItem = () => {};

  // 删除好推绩效列表
  delItem = () => {};

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
          levelValue: '19',
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
              {/* <ul className={styles.listItem}> */}

              {/* <li>
                  <div className={styles.itemLeft}>
                    <p style={{ float: 'left', margin: '0' }}>
                      <span
                        style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}
                      >
                        <BIInput placeholder="请输入" />
                      </span>
                      <span>%</span>
                      <Checkbox style={{ marginLeft: '5px' }} onChange={this.checkChange}>
                        闭区间
                      </Checkbox>
                    </p>
                    <span style={{ float: 'left', margin: '0 20px', lineHeight: '30px' }}>~</span>
                    <p style={{ float: 'left', margin: '0' }}>
                      <span
                        style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}
                      >
                        <BIInput placeholder="请输入" />
                      </span>
                      <span>%</span>
                      <Checkbox style={{ marginLeft: '5px' }} onChange={this.checkChange}>
                        闭区间
                      </Checkbox>
                    </p>
                  </div>
                  <div className={styles.itemMiddle}>
                    <span>系数</span>
                    <span
                      style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}
                    >
                      <BIInput placeholder="请输入" />
                    </span>
                    <span>%</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.btn} onClick={this.delItem}>
                      删除
                    </span>
                  </div>
                </li> */}
              {/* </ul> */}
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
          <BIButton onClick={this.toCreat}>返回</BIButton>
          <BIButton style={{ marginLeft: '8px' }} type="primary" onClick={this.toCreat}>
            提交
          </BIButton>
        </p>
      </div>
    );
  }
}

export default detail;
