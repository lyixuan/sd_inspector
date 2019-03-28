/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import { Table } from 'antd';
import { Pagination } from 'antd';
import styles from '../style.less'

const renderContent1 = (value, row, index) => {
  return <span className={styles.green}>{value}</span>
};
const renderContent2 = (value, row, index) => {
  return <span className={styles.red}>{value}</span>
};

const columns = [{
  title: '推送时间',
  dataIndex: 'time'
}, {
  title: '考试计算人数',
  dataIndex: 'testPeople'
}, {
  title: '触达人数',
  dataIndex: 'people'
}, {
  title: 'app',
  colSpan: 2,
  dataIndex: 'app',
  render: renderContent1
}, {
  title: 'app2',
  colSpan: 0,
  dataIndex: 'app2',
  render: renderContent2
}, {
  title: '微信',
  colSpan: 2,
  dataIndex: 'weChart',
  render: renderContent1
}, {
  title: '微信2',
  colSpan: 0,
  dataIndex: 'weChart2',
  render: renderContent2
}, {
  title: 'TTS',
  colSpan: 2,
  dataIndex: 'tts',
  render: renderContent1
}, {
  title: 'TTS2',
  colSpan: 0,
  dataIndex: 'tts2',
  render: renderContent2
}, {
  title: 'PC',
  colSpan: 2,
  dataIndex: 'pc',
  render: renderContent1
}, {
  title: 'PC2',
  colSpan: 0,
  dataIndex: 'pc2',
  render: renderContent2
}, {
  title: 'IM点对点',
  colSpan: 2,
  dataIndex: 'im',
  render: renderContent1
}, {
  title: 'IM点对点2',
  colSpan: 0,
  dataIndex: 'im2',
  render: renderContent2
}, {
  title: '400',
  colSpan: 2,
  dataIndex: 'm400',
  render: renderContent1
}, {
  title: '400',
  colSpan: 0,
  dataIndex: 'm4002',
  render: renderContent2
}];

const data = [{
  key: '1',
  time: '2019-09-09',
  testPeople: 32,
  people: 900,
  app: 100,
  app2: 900,
  weChart: 100,
  weChart2: 1001,
  tts: 100,
  tts2: 100,
  pc: 100,
  pc2: 100,
  im: 100,
  im2: "abc",
  m400: 100,
  m4002: 100
}, {
  key: '2',
  time: '2019-09-09',
  testPeople: 32,
  people: 900,
  app: 100,
  app2: 900,
  weChart: 100,
  weChart2: 1001,
  tts: 100,
  tts2: 100,
  pc: 100,
  pc2: 100,
  im: 100,
  im2: "abc",
  m400: 100,
  m4002: 100
}];

class InitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  pagerOnChange = (num) => {
    console.log(131, num)
  }

  render() {
    return (
      <>
        <div className={styles.dataDetail}>
          <div className={styles.title}>
            <h4 className={styles.headerCls}>数据概览</h4>
            <BIButton type="primary" >导出</BIButton>
          </div>
          <div className={styles.tableBox}>
            <Table columns={columns} pagination={false} dataSource={data} bordered />
            <div className={styles.notice}>
              <span>已读</span>
              <span>未读</span>
            </div>
            <Pagination showQuickJumper defaultCurrent={1} total={50} onChange={this.pagerOnChange} />
          </div>
        </div>
      </>
    );
  }
}

export default InitTable;