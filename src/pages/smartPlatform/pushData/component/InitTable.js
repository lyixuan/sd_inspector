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

class InitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  exportExcel = () => {
    this.props.exportData();
  };
  render() {
    const { list, pageNum, total } = this.props.proData.pageInfo ? this.props.proData.pageInfo : {};
    const { loading } = this.props;
    const { onSizeChange } = this.props;
    return (
      <>
        <div className={styles.dataDetail}>
          <div className={styles.title}>
            <h4 className={styles.headerCls}>推送数据明细</h4>
            <BIButton onClick={this.exportExcel} type="primary">
              导出
            </BIButton>
          </div>
          <div className={styles.tableBox}>
            <BITable
              rowKey={record => record.id}
              dataSource={list || []}
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
              defaultCurrent={pageNum}
              total={total || 1}
              pageSize={10}
              onChange={onSizeChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default InitTable;
