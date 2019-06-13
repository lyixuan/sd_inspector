import React from 'react';
import { Spin } from 'antd';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import BIButton from '@/ant_components/BIButton';
import exportimg from '@/assets/ai/export.png';
import styles from '../style.less'
import { thousandsFormat } from '@/utils/utils';

class bbsPage extends React.Component {
  constructor(props) {
    super(props);
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
        title: '自主评价',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
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
  render() {
    return (
      <div>
        <AiForm {...this.props} workType={3} originParams={{}} onChange={this.changeFilterAction} loading={true}></AiForm>
        <div className={styles.tableContent}>
          <div className={styles.contentTop}>
            <div>
              <BIButton className={styles.exportBtn}>导出标签</BIButton>
              <BIButton className={styles.exportEvaluate}>导出自主评价</BIButton>
            </div>
            <span className={styles.listTotal}>总数：{} 条</span>
          </div>
          <Spin spinning={false}>
            <AiList {...this.props} columnsData={this.columnsData}></AiList>
          </Spin>
        </div>
      </div>
    );
  }
}

export default bbsPage;
