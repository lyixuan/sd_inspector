import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import router from 'umi/router';

import styles from '../style.less'

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }
  toTask = () =>{
    router.push('/m1/details/tasks');
  };

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
        title: '省/市',
        dataIndex: 'index',
      },
      {
        title: '学院',
        dataIndex: 'adjustDate2',
      },
      {
        title: '家族',
        dataIndex: 'type2',
      },
      {
        title: '考试计划人数',
        dataIndex: 'creditScore2',
      },
      {
        title: '准考证填写人数',
        dataIndex: 'groupType2',
      },
      {
        title: '消息已读人数',
        dataIndex: 'orgName2',
      },
      {
        title: '消息未读人数',
        dataIndex: 'familyType2',
      },
    ];
    return (
      <>
        <div>
          <div className={styles.tableHead}>
            <span className={styles.tableHeadLeft}>共搜出 889 条学员数据</span>
            <span className={styles.tableHeadRight}>
              <Button type="primary" onClick={this.toTask}>任务列表</Button>
            </span>
            <span className={styles.tableHeadRight}>
              <Button type="primary2">添加下载任务</Button>
            </span>
          </div>
          <Table dataSource={dataSource} columns={columns} bordered/>
        </div>
      </>
    );
  }
}

export default ResultTable;
