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
import SearchForm from './SearchForm';

function listToString(obj) {
  const result = DeepCopy(obj);
  for (let key in result) {
    if (key === 'familyIdList') {
      result[key] = result[key].join(',');
    }
    if (key === 'familyNameList') {
      result[key] = result[key].join(',');
    }
    if (key === 'collegeName') {
      result[key] = result[key].join(',');
    }
    if (key === 'msgStatusList') {
      result[key] = result[key].join(',');
    }
  }
  return result;
}
const provinces = BiFilter('provinceJson');
const columns = [
  {
    title: '省/市',
    dataIndex: 'province',
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
    title: '未推送消息人数',
    dataIndex: 'unpushNum',
  },
  {
    title: '已推送消息人数',
    dataIndex: 'pushNum',
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
@connect(({ dataDetail, loading }) => ({
  dataDetail,
  loading: loading.effects['dataDetail/getDetailData']
}))

class ResultTable extends Component {
  constructor(props) {
    super(props);
    const { dataDetail: { params } } = this.props;
    const { province } = params || {};
    this.state = {
      visible: false,
      taskName: '',
      provinceName: province || provinces[0].name,  // 默认选中省份
    };
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }
  toTask = () => {
    router.push({
      pathname: '/smartPlatform/details/tasks',
      // query: this.props.checkedConditionList,
    });
  };

  handleOk = () => {
    const oldParam = this.props.dataDetail.params;
    const newParam = listToString(oldParam);
    if (!this.state.taskName) {
      Message.warning('请填写名称');
    }
    const obj = {
      taskName: this.state.taskName,
      queryCondition: newParam
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
    const { params, total } = this.props.dataDetail;
    if (JSON.stringify(params) == "{}") {
      Message.warning('请查询后再添加下载任务');
      return
    }
    if (total === 0) {
      Message.warning('查询数据结果为空');
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
  onCurrentSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'dataDetail/getDetailData',
      payload: { params: { pageNum: current, pageSize: pageSize } },
    });
  };
  onShowSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'dataDetail/getDetailData',
      payload: { params: { pageNum: 1, pageSize: pageSize } },
    });
  };
  onSelectedProvince = (e, provinceName) => {
    const { province } = this.state;
    if (province === provinceName) {
      return;
    }
    if (this.props.handlePropSubmit) {
      this.props.handlePropSubmit({ province: provinceName })
    }
    this.setState({ provinceName });
  }
  render() {
    const dataSource = this.props.dataDetail.tableList;
    const { totalPlan } = this.props.dataDetail;
    const { provinceName } = this.state;
    return (
      <>
        <div>
          <div className={styles.tableHead}>
            <span className={styles.tableHeadLeft}>共搜出 {totalPlan} 条学员订单数据</span>
            <span className={styles.tableHeadRight}>
              <Button type="primary" onClick={this.toTask}>任务列表</Button>
            </span>
            <span className={styles.tableHeadRight}>
              <Button type="primary2" onClick={this.addTask}>添加下载任务</Button>
            </span>
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={false} loading={this.props.loading} bordered />
          <br />
          <div className={styles.provinceCotainer}>
            {provinces.map(item => <span
              key={item.code}
              className={provinceName === item.name ? styles.selectedProvinceBtn : styles.provinceBtn}
              onClick={(e) => (this.onSelectedProvince(e, item.name))}
            >{item.name}</span>)}

          </div>
        </div>
        <Modal
          title='添加下载任务'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button size="small" onClick={this.handleCancel}>取消</Button>,
            <Button size="small" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <div className={styles.modalWrap}>
            <Input placeholder="输入名称" maxLength={11} value={this.state.taskName} onChange={this.onChangeName} />
          </div>
        </Modal>
      </>
    );
  }
}

export default ResultTable;
