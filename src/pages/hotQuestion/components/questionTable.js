import React from 'react';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
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
        width: 120
      },
      {
        title: '标准问题',
        dataIndex: 'question',
        key: 'question'
      }
    ]
  }

  render() {
    const {
      sourceData,
      activity,
      operator,
      updateTime,
      hasBackground} = this.props;
    const {columns} = this;

    return <div className={styles['question-table']}>
      <BIScrollbarTable
        rowClassName={hasBackground ? styles['row'] : ''}
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
          <span className={styles.first}>
            {
              updateTime ? `修改时间：${updateTime}`: ''
            }
          </span>
          <span>
            {
              operator ? `操作人：${operator}` : ''
            }
          </span>
        </div>
      </div>
    </div>
  }
}

export default QuestionTable;
