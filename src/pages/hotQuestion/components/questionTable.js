import React from 'react';
import BITable from '@/ant_components/BITable';
import styles from './styles.less';

class QuestionTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
        width: 120,
        align: 'center'
      },
      {
        title: '标准问题',
        dataIndex: 'question',
        key: 'question'
      }
    ]
  }

  render() {
    const {sourceData, activity} = this.props;
    const {columns} = this;

    return <div className={styles['question-table']}>
      <BITable
        dataSource={sourceData}
        columns={columns}
        rowKey={(record) => record.sort}
        pagination={false}
        scroll={{y: 250}}/>

      <div className={styles.bottom}>
        <div className={styles.activity}>
          {
            activity
              ? `当前已配置运营活动：【${activity}】该活动展示在底部第一位（优先于默认底部关联问题）`
              : null
          }
        </div>
        <div className={styles.operator}>
          <span className={styles.first}>修改时间：{sourceData[0].updateTime}</span>
          <span>操作人：{sourceData[0].operatorName}</span>
        </div>
      </div>
    </div>
  }
}

export default QuestionTable;
