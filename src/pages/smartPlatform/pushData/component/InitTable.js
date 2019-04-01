/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BITable from '@/ant_components/BITable';
import { Pagination } from 'antd';
import styles from '../style.less';

const renderContent1 = (value, row, index) => {
  return <span className={styles.green}>{value}</span>;
};
const renderContent2 = (value, row, index) => {
  return <span className={styles.red}>{value}</span>;
};

const columns = [
  {
    title: '推送时间',
    dataIndex: 'countDate',
  },
  {
    title: '考试计算人数',
    dataIndex: 'examPlanNum',
  },
  {
    title: '触达人数',
    dataIndex: 'readNum',
  },
  {
    title: 'app',
    colSpan: 2,
    dataIndex: 'appRead',
    render: renderContent1,
  },
  {
    title: 'app2',
    colSpan: 0,
    dataIndex: 'appUnread',
    render: renderContent2,
  },
  {
    title: '微信',
    colSpan: 2,
    dataIndex: 'wechatRead',
    render: renderContent1,
  },
  {
    title: '微信2',
    colSpan: 0,
    dataIndex: 'wechatUnRead',
    render: renderContent2,
  },
  {
    title: 'TTS',
    colSpan: 2,
    dataIndex: 'ttsRead',
    render: renderContent1,
  },
  {
    title: 'TTS2',
    colSpan: 0,
    dataIndex: 'ttsUnread',
    render: renderContent2,
  },
  {
    title: 'PC',
    colSpan: 2,
    dataIndex: 'pcRead',
    render: renderContent1,
  },
  {
    title: 'PC2',
    colSpan: 0,
    dataIndex: 'pcUnread',
    render: renderContent2,
  },
  {
    title: 'IM点对点',
    colSpan: 2,
    dataIndex: 'im1v1Read',
    render: renderContent1,
  },
  {
    title: 'IM点对点2',
    colSpan: 0,
    dataIndex: 'im1v1Unread',
    render: renderContent2,
  },
  {
    title: '400',
    colSpan: 2,
    dataIndex: 'callRead',
    render: renderContent1,
  },
  {
    title: '400',
    colSpan: 0,
    dataIndex: 'callUnread',
    render: renderContent2,
  },
];

const data = [
  {
    key: '1',
    countDate: '2019-09-09',
    examPlanNum: 32,
    readNum: 900,
    appRead: 100,
    appUnread: 900,
    wechatRead: 100,
    wechatUnRead: 1001,
    ttsRead: 100,
    ttsUnread: 100,
    pcRead: 100,
    pcUnread: 100,
    im1v1Read: 100,
    im1v1Unread: 'abc',
    callRead: 100,
    callUnread: 100,
  },
];

class InitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  exportExcel = () => {
    this.props.exportData();
  };
  render() {
    const { pageInfo = {} } = this.props.proData;
    console.log(pageInfo);
    const { loading } = this.props;
    const { onSizeChange } = this.props;
    return (
      <>
        <div className={styles.dataDetail}>
          <div className={styles.title}>
            <h4 className={styles.headerCls}>数据概览</h4>
            <BIButton onClick={this.exportExcel} type="primary">
              导出
            </BIButton>
          </div>
          <div className={styles.tableBox}>
            <BITable
              rowKey={record => record.id}
              dataSource={pageInfo.list || []}
              columns={columns}
              pagination={false}
              loading={loading}
              bordered
            />
            <br />
            <div className={styles.notice}>
              <span>已读</span>
              <span>未读</span>
            </div>
            <Pagination
              showQuickJumper
              defaultCurrent={pageInfo.pageNum}
              total={pageInfo.total}
              onChange={onSizeChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default InitTable;
