import React from 'react';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import styles from './styles.less';
import { Tooltip } from 'antd';

class QuestionTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
        width: 71
      },
      {
        title: '标准问题',
        dataIndex: 'question',
        key: 'question',
        ellipsis: true,
        render: (text) => {
          return <Tooltip title={text} placement='topLeft'>
            <span title="">{text}</span>
          </Tooltip>
        }
      }
    ]
  }

  render() {
    const {
      sourceData,
      activity,
      operator,
      updateTime,
      hasBackground,
      text} = this.props;
    const {columns} = this;

    return <div className={styles['question-table']}>
      <BIScrollbarTable
        rowClassName={hasBackground ? styles['row'] : ''}
        dataSource={sourceData}
        columns={columns}
        rowKey={(record) => record.sort}
        pagination={false}
        scroll={{y: 200}}/>

      <div className={styles.bottom}>
        <div className={styles.activity}>
          {
            activity
              ? <div>
                  当前已配置运营活动：【{activity}】&nbsp;&nbsp;该活动展示在底部第一位（优先于{text}）
                </div>
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
