import React from 'react';
import { Spin } from 'antd';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import exportimg from '@/assets/ai/export.png';
import styles from '../style.less'
import { connect } from 'dva/index';

@connect(({workTableModel, loading}) => ({
  workTableModel,
  loading: loading.effects['workTableModel/getTableList'],
}))
class imPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.queryData();
  }
  filterActionParams() {}
  changeFilterAction() {}
  isLoadEnumData() {}
  columnsData = () => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: '内容',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '学员姓名',
        dataIndex: 'userTag',
        key: 'userTag',
      },
      {
        title: '后端归属',
        dataIndex: 'us1erTag',
        key: 'us1erTag',
      },
      {
        title: '操作人',
        dataIndex: 'userCount',
        key: 'userCount',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '咨询类型',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
      },
      {
        title: '原因分类',
        dataIndex: '1taskStatus',
        key: '1taskStatus',
      },
      {
        title: '操作',
        key: 'action',
      },
    ];
    return columns || [];
  }
  queryData = () => {
    this.props.dispatch({
      type: 'workTableModel/getTableList',
      payload: { params: {} },
    });
  }
  render() {
    const { loading, workTableModel} = this.props;
    const { userList } = workTableModel;
    return (
      <div>
        <AiForm {...this.props} originParams={{}} onChange={this.changeFilterAction} loading={true}></AiForm>
        <div className={styles.tableContent}>
          <div className={styles.contentTop}>
            <BIButton className={styles.exportBtn} size="large">
              <img src={exportimg}/> 导出
            </BIButton>
            <span className={styles.listTotal}>总数：{} 条</span>
          </div>
          <Spin spinning={loading}>
            <AiList {...this.props} columnsData={this.columnsData}></AiList>
          </Spin>
        </div>
      </div>
    );
  }
}

export default imPage;
