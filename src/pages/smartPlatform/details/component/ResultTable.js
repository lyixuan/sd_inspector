import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import router from 'umi/router';
import { BiFilter, DeepCopy } from '@/utils/utils';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';

import styles from '../style.less'
import Message from 'antd/lib/message/index';
import { connect } from 'dva/index';

@connect(({ dataDetail }) => ({
  dataDetail,
}))

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      taskName: ''
    };
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }
  toTask = () =>{
    router.push({
      pathname: '/smartPlatform/details/tasks',
      // query: this.props.checkedConditionList,
    });
  };

  handleOk = () => {
    console.log(this.props.checkedConditionList);
    const obj = {
      taskName: this.state.taskName,
      queryCondition: this.props.checkedConditionList
    };
    this.props.dispatch({
      type: 'dataDetail/addTask',
      payload: { params: obj },
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  addTask = () => {
    if (!this.props.checkedConditionList.exam) {
      Message.warning('请选择考期');
      return
    }
    this.setState({
      visible: true,
      taskName: ''
    });
  };

  onChangeName = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };

  render() {
    const dataSource = [{
      province: '1',
      collegeName: '胡彦斌',
      familyName: 32,
      examPlanNum: '西湖区湖底公园1号'
    }, {
      province: '2',
      collegeName: '胡彦祖',
      familyName: 42,
      examPlanNum: '西湖区湖底公园1号'
    }];

    const columns = [
      {
        title: '省/市',
        dataIndex: 'province',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 0) {
            obj.props.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 1) {
            obj.props.rowSpan = 0;
          }
          return obj;
        },
      },
      {
        title: '学院',
        dataIndex: 'collegeName',
      },
      {
        title: '家族',
        dataIndex: 'familyName',
      },
      {
        title: '考试计划人数',
        dataIndex: 'examPlanNum',
      },
      {
        title: '准考证填写人数',
        dataIndex: 'admissionFillNum',
      },
      {
        title: '消息已读人数',
        dataIndex: 'readNum',
      },
      {
        title: '消息未读人数',
        dataIndex: 'unreadNum',
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
              <Button type="primary2" onClick={this.addTask}>添加下载任务</Button>
            </span>
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={BiFilter("PAGINATION")} bordered/>
        </div>
        <Modal
          title='添加下载任务'
          visible={this.state.visible}
          footer={[
            <Button size="small" onClick={this.handleCancel}>取消</Button>,
            <Button size="small" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <div className={styles.modalWrap}>
            <Input placeholder="输入名称" maxLength={11} value={this.state.taskName} onChange={this.onChangeName}/>
          </div>
        </Modal>
      </>
    );
  }
}

export default ResultTable;
