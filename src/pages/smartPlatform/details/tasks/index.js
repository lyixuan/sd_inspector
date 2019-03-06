import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import Table from 'antd/lib/table';
import Breadcrumb from 'antd/lib/breadcrumb';
import Link from 'umi/link';
import {STATIC_HOST} from '@/utils/constants'
import { BiFilter } from '@/utils/utils';
import styles from '../style.less'

@connect(({ detail, loading }) => ({
  detail,
  loading: loading.models.detail,
}))
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum:1,
      pageSize:10
    };
  }

  UNSAFE_componentWillMount() {
    // 获取数据

  }
  componentDidMount(){
    this.getData(this.state);
  }
  getData = params =>{
    this.props.dispatch({
      type: 'detail/getTaskPage',
      payload: params,
    });
  };
  deleteFn = data => {
    this.props.dispatch({
      type: 'detail/deleteTask',
      payload: {id:data.id},
    });
  };
  reloadFn = data => {
    this.props.dispatch({
      type: 'detail/reloadTask',
      payload: {id:data.id},
    });
  };
  downloadFn = data => {
    window.location.href = `${STATIC_HOST}${data.zipPath}`;
  };
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
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
        render: (text, record) => {
          return (
            <>
              {
                BiFilter('TASK_STATES').map(item => {
                  if(text === item.id){
                    return (
                      <>
                        <span style={{color:item.color,marginRight:'6px'}}>{item.name}</span>
                        {text===4?<Icon type="reload" onClick={()=>{this.reloadFn(record)}}/>:null}
                      </>
                    )
                  }
                  return null
                })
              }
            </>
          );
        },
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
              <Icon type="download" onClick={()=>{this.downloadFn(record)}} style={{marginRight:'8px'}} />
              <Icon type="delete" onClick={()=>{this.deleteFn(record)}} />
            </>
          );
        },
      },
    ];
    const {tableList} = this.props.detail;
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
          <Table dataSource={tableList} columns={columns} bordered loading={this.props.loading}/>
        </div>
      </>
    );
  }
}

export default Tasks;
