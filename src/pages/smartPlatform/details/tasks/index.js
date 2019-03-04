import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Breadcrumb from 'antd/lib/breadcrumb';
import Link from 'umi/link';

import Button from 'antd/lib/button';

import styles from '../style.less'

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }

  render() {
    const dataSource = [{
      index: '1',
      adjustDate2: '胡彦斌',
      type2: 32,
      creditScore2: '西湖区湖底公园1号'
    }, {
      index: '2',
      adjustDate2: '胡彦祖',
      type2: 42,
      creditScore2: '西湖区湖底公园1号'
    }];

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '创建时间',
        dataIndex: 'adjustDate2',
      },
      {
        title: '创建人',
        dataIndex: 'type2',
      },
      {
        title: '任务名称',
        dataIndex: 'creditScore2',
      },
      {
        title: '查询条件',
        dataIndex: 'groupType2',
      },
      {
        title: '任务状态',
        dataIndex: 'orgName2',
      },
      {
        title: '学院订单数',
        dataIndex: 'familyType2',
      },
    ];
    return (
      <>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>当前位置:</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/smartPlatform/details">明细数据查询</Link></Breadcrumb.Item>
            <Breadcrumb.Item>任务列表</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.tableBox}>
          <div className={styles.tableHead}>
            <span className={styles.tableHeadLeft}>任务列表</span>
          </div>
          <Table dataSource={dataSource} columns={columns} bordered/>
        </div>
      </>
    );
  }
}

export default Tasks;
