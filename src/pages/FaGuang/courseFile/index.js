import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import BIModal from '@/ant_components/BIModal';
import moment from 'moment/moment';

const confirm = BIModal.confirm;
const columns = [
  {
    title: '课程编号',
    dataIndex: 'id',
  },
  {
    title: '课程名称',
    dataIndex: 'videoName',
  },
  {
    title: 'PPT数量',
    dataIndex: 'pptCount',
  },
  {
    title: '更新时间',
    dataIndex: 'createTime',
    render: (text, record) => {
      return (
        <>
          {moment(text).format('YYYY-MM-DD HH:mm:ss')}
        </>
      );
    },
  },
];

function dealQuarys(pm) {
  const p = DeepCopy(pm);
  if (p.videoName==='') {
    delete p.videoName
  }
  return p;
};

@connect(({ faguang, courseFile, loading }) => ({
  faguang,
  courseFile,
  loading: loading.effects['courseFile/getList'],
}))

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination:{
        page:1,
        pageSize:30
      },
      params:{},
    };
  }
  componentDidMount() {
    this.queryData();
  }
  queryData = (pm, pg) => {
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state.pagination };
    if (dealledPm) {
      params = { ...params, ...dealledPm };
    } else {
      params = {...params,...this.state.params}
    }
    if (pg) {
      params = { ...params, ...pg };
    }
    this.setState({
      params
    });
    this.props.dispatch({
      type: 'courseFile/getList',
      payload: { params },
    });
  };
  onDel = (record) => {
    const that = this;
    confirm({
      className: 'BIConfirm',
      okType: 'danger',
      title: '是否删除当前记录?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'courseFile/delelte',
          payload: { params: { id: record.id } },
        }).then(() => {
          that.queryData()
        });
      },
      onCancel() { },
    });
  };
  columnsAction = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <span className={styles.actionBtn} onClick={() => this.showModal(record)}>
              预览
            </span>
            <span className={styles.actionBtn} onClick={() => this.onDel(record)}>
              删除
            </span>
          </>
        );
      },
    }];
    return [...columns, ...actionObj];
  };
  render() {
    const { courseList=[] } = this.props.faguang||{};
    const { dataList = [], page } = this.props.courseFile;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          courseList={courseList}
          queryData={(params, page) => this.queryData(params, page)}/>

        <BIModal
          title="添加课程"
          width={940}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.loading2} onClick={this.handleSubmit}>
              保存
            </BIButton>,
          ]}
        >
        </BIModal>
      </>
    );
  }
}

export default Course;
