import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';
import Tab from '../component/tab';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';

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
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '生效周期',
        dataIndex: 'date',
        render: (text, record) => {
          return (
            <>{`${this.momentFormat(record.effectiveDate, 'YYYY-MM-DD')} - ${this.momentFormat(
              record.expiryDate,
              'YYYY-MM-DD'
            )}`}</>
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.createDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'modifyDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.modifyDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        render: (text, record) => {
          return <>1111</>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operator',
        render: (text, record) => {
          return (
            <>
              <span className={styles.btn} onClick={this.copy}>
                复制
              </span>
              <span className={styles.btn} onClick={this.edit}>
                编辑
              </span>
            </>
          );
        },
      },
    ];

    const dateFormat = 'YYYY-MM-DD';
    const data = [];
    return (
      <div className={styles.editWrap}>
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
            <Tab {...this.props} columns={columns} dataSource={data}></Tab>
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
