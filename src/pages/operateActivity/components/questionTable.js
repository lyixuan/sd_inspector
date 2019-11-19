import React from 'react';
import {Tooltip} from 'antd';
import BITable from '@/ant_components/BITable';
import style from './questionTableStyle.less';

class QuestionTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: '标准问题',
        dataIndex: 'question',
        ellipsis: true,
        key: 'question',
        width: 280
      },
      {
        title: '简称',
        dataIndex: 'simple',
        key: 'simple',
        width: 120
      },
      {
        title: '回复内容',
        dataIndex: 'content',
        key: 'content',
        render: (text) => {
          return <Tooltip title={text}>
            <div className={style.content}>{text}</div>
          </Tooltip>
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (data) => {
          return <div>
            <span
              onClick={this.editContent.bind(this, data)}
              className={style.edit}>编辑</span>
            <span
              onClick={this.deleteContent.bind(this, data.id)}
              className={style.delete}>删除</span>
          </div>
        }
      }
    ];
  }

  render() {
    const {columns} = this;
    const {sourceData, loading} = this.props;
    return <div className={style.wrap}>
      <BITable
        columns={columns}
        dataSource={sourceData}
        loading={loading}
        rowKey={record =>  record.id} />
    </div>
  }

  editContent = (data) => {
    this.props.onEdit(data);
  };

  deleteContent = (id) => {
    this.props.onDelete();
  };
}

export default QuestionTable;
