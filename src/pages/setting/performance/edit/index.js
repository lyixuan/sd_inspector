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
    this.state = {
      defaultBeginDate: String(new Date().getTime()),
      defaultEndDate: new Date().getTime(),
      beginDate: new Date().getTime(),
      endDate: new Date().getTime(),
    };
  }
  onFormChange = (value, vname) => {
    console.log(value, vname, 'vname');
  };

  momentFormat = (date, way) => {
    return moment(Number(date))
      .format(way)
      .replace(/-/g, '/');
  };

  checkChange = () => {
    console.log('1');
  };

  render() {
    console.log(this.props.location, 'pathname');
    const columns = [
      {
        title: '听课时间(分钟)',
        dataIndex: 'date',
        width: 500,
        render: (text, record) => {
          return (
            <>
              <p style={{ float: 'left', margin: '0' }}>
                <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                  <BIInput placeholder="请输入" />
                </span>
                <span>%</span>
                <Checkbox style={{ marginLeft: '5px' }} onChange={this.checkChange}>
                  闭区间
                </Checkbox>
              </p>
              <span style={{ float: 'left', margin: '0 20px', lineHeight: '30px' }}>~</span>
              <p style={{ float: 'left', margin: '0' }}>
                <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                  <BIInput placeholder="请输入" />
                </span>
                <span>%</span>
                <Checkbox style={{ marginLeft: '5px' }} onChange={this.checkChange}>
                  闭区间
                </Checkbox>
              </p>
            </>
          );
        },
      },
      {
        title: '好推净流水系数',
        dataIndex: 'createDate',
        render: (text, record) => {
          return (
            <>
              <p style={{ margin: '0', textAlign: 'center' }}>
                <span>系数</span>
                <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                  <BIInput placeholder="请输入" />
                </span>
                <span>%</span>
              </p>
            </>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operator',
        render: (text, record) => {
          return (
            <>
              <p style={{ margin: '0', textAlign: 'center' }}>
                <span className={styles.btn} onClick={this.edit}>
                  删除
                </span>
              </p>
            </>
          );
        },
      },
    ];

    const dateFormat = 'YYYY-MM-DD';
    const data = [
      {
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
      },
    ];
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
            <Tab
              style={{ paddingBottom: '40px' }}
              {...this.props}
              columns={columns}
              dataSource={data}
            ></Tab>
            <p className={styles.addTable}>添加区间</p>
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
