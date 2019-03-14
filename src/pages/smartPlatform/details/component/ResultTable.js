import React, { Component } from 'react';
import { BiFilter, DeepCopy } from '@/utils/utils';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import  BIButtonYellow from '@/components/BIButtonYellow';
import  BIButtonBlue from '@/components/BIButtonBlue';
import BIInput from '@/ant_components/BIInput';
import BITable from '@/ant_components/BITable';

import styles from '../style.less'
import {Message} from 'antd';
import config from '../../../../../config/config';
import { connect } from 'dva/index';

// 名称正则校验，汉字数字英文
const reg =/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;

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
    width: 130,
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    width: 130,
  },
  {
    title: '考试计划人数',
    dataIndex: 'examPlanNum',
    width: 140,
  },
  {
    title: '准考证填写人数',
    dataIndex: 'admissionFillNum',
    width: 140,
  },
  {
    title: '未推送消息人数',
    dataIndex: 'unpushNum',
    width: 140,
  },
  {
    title: '已推送消息人数',
    dataIndex: 'pushNum',
    width: 140,
  },
  {
    title: '消息已读人数',
    dataIndex: 'readNum',
    width: 140,
  },
  {
    title: '消息未读人数',
    dataIndex: 'unreadNum',
    width: 140,
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
    const { provinceList } = params || {};
    this.state = {
      visible: false,
      taskName: '',
      provinceName: provinceList || provinces[0].name,  // 默认选中省份
    };
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }
  toTask = () => {
    const origin = window.location.origin;
    const url = `${origin}${config.base}smartPlatform/details/tasks`
    window.open(url)

    // router.push({
    //   pathname: '/smartPlatform/details/tasks',
    //   // query: this.props.checkedConditionList,
    // });
  };

  handleOk = () => {
    const oldParam = this.props.dataDetail.params;
    const newParam = listToString(oldParam);
    if (!this.state.taskName) {
      Message.warning('请填写名称');
      return
    }
    if (!reg.test(this.state.taskName)) {
      Message.warning('名称只能包含汉字、数字和英文');
      return
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
      Message.warning('查询结果为空，添加下载任务失败');
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
      this.props.handlePropSubmit(provinceName)
    }
    this.setState({ provinceName });
  };
  render() {
    const dataSource = this.props.dataDetail.tableList;
    const { provinceName } = this.state;
    return (
      <>
        <div className={styles.tableWrap}>
          <div className={styles.tableTitleWrap}>
            <span className={styles.tableTitle}></span><span className={styles.tableTitle1}>查询结果</span>
          </div>
          <div className={styles.tableHead}>
            {/*<span className={styles.tableHeadLeft}>共搜出 {totalPlan} 条学员订单数据</span>*/}
            <BIButtonBlue type="primary"  className={styles.tableHeadSpan} onClick={this.addTask}>添加下载任务</BIButtonBlue>
            <BIButtonYellow type="primary" onClick={this.toTask}>任务列表</BIButtonYellow>
          </div>
          <BITable dataSource={dataSource} columns={columns} pagination={false} loading={this.props.loading} scroll={{ y: 500 }} bordered />
          <div className={styles.provinceCotainer}>
            {provinces.map(item => <span
              key={item.code}
              className={provinceName === item.name ? styles.selectedProvinceBtn : styles.provinceBtn}
              onClick={(e) => (this.onSelectedProvince(e, item.name))}
            >{item.name}</span>)}

          </div>
        </div>
        <BIModal
          title='添加下载任务'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{marginRight:10}} onClick={this.handleCancel}>取消</BIButton>,
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>
          ]}
        >
          <div className={styles.modalWrap}>
            <BIInput placeholder="输入名称" maxLength={20} value={this.state.taskName} onChange={this.onChangeName} />
          </div>
        </BIModal>
      </>
    );
  }
}

export default ResultTable;
