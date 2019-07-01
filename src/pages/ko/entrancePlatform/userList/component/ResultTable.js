import React, { Component } from 'react';
import BITable from '@/ant_components/BITable';
import styles from '../style.less';
import { connect } from 'dva/index';

const columns = [
  {
    title: '省/市',
    dataIndex: 'province',
    width: 140,
  },
  {
    title: '考试计划人数',
    dataIndex: 'examPlanNum',
    width: 140,
  },
  {
    title: '触达人数',
    dataIndex: 'readNum',
    width: 140,
  },
  {
    title: '触达率',
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
    ]
  },
  {
    title: '微信',
    dataIndex: 'admissionFillNum',
    width: 140,
  },
  {
    title: '填写率',
    dataIndex: 'admissionFillRatio',
    width: 140,
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
          <BITable
            dataSource={[]}
            columns={columns}
            pagination={false}
            loading={this.props.loading}
            scroll={{ y: 500 }}
            bordered
            rowSelection={{}}
          />
        </div>
      </>
    );
  }
}

export default ResultTable;
