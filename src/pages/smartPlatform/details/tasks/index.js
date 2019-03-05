import React, { Component } from 'react';
import { connect } from 'dva';
import Table from 'antd/lib/table';
import Breadcrumb from 'antd/lib/breadcrumb';
import Link from 'umi/link';
import styles from '../style.less'

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.models.detail,
}))
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    // 获取数据

  }
  componentDidMount(){
    this.getData();
  }
  getData = params =>{
    this.props.dispatch({
      type: 'detail/getTaskPage',
      payload: params,
    });
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
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
      },
      {
        title: '查询条件',
        dataIndex: 'queryCondition',
      },
      {
        title: '任务状态',
        dataIndex: 'taskStatus',
      },
      {
        title: '学院订单数',
        dataIndex: 'orderCount',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <>
              <span onClick={()=>{console.log(record)}} style={{ marginRight: '8px' }}>下载</span>
              <span onClick={()=>{console.log(record)}} style={{ marginRight: '8px' }}>删除</span>
            </>
          );
        },
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
