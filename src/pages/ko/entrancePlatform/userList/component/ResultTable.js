import React, { Component } from 'react';
import BITable from '@/ant_components/BITable';
import styles from '../style.less';
import { connect } from 'dva/index';
import { Table } from 'antd';

const columns = [
  {
    title: '通知时间',
    dataIndex: 'province',
    width: 100,
    fixed: 'left',
  },
  {
    title: '用户群组名称',
    dataIndex: 'examPlanNum',
    width: 120,
    fixed: 'left',
  },
  {
    title: '用户群组人数',
    dataIndex: 'readNum',
    width: 120,
    fixed: 'left',
  },
  {
    title: '通知类型',
    dataIndex: 'readRatio',
    width: 100,
    fixed: 'left',
  },
  {
    title: '通知人数',
    dataIndex: 'readRatio',
    width: 100,
    fixed: 'left',
  },
  {
    title: '送达人数',
    dataIndex: 'readRatio',
    width: 100,
    fixed: 'left',
  },
  {
    title: '已读人数',
    dataIndex: '111',
    width: 140,
  },
  {
    title: '趋势图',
    dataIndex: '111',
    width: 140,
  },
  {
    title: '打开率',
    dataIndex: 'readRatio',
    width: 140,
  },
  {
    title: '未读人数',
    dataIndex: 'readRatio',
    width: 140,
  },
  {
    title: '微信',
    children: [
      {
        title: '送达人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '已读人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '打开率',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '未读人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
    ]
  },
  {
    title: 'app',
    children: [
      {
        title: '送达人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '已读人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '打开率',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '未读人数',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
    ]
  },
];
@connect(({ dataDetail, loading }) => ({

}))
class ResultTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={styles.tableWrap}>
          <div className={styles.tableTitleWrap}>
            <span className={styles.tableText}>查询结果</span>
          </div>
          <Table
            dataSource={[{id: 1}]}
            columns={columns}
            pagination={false}
            loading={this.props.loading}
            scroll={{ x: '200%'}}
            bordered
            rowSelection={{}}
            rowKey={record => record.id}
          />
        </div>
      </>
    );
  }
}

export default ResultTable;
