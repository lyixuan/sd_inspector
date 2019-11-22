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
        key: 'question',
        ellipsis: true,
        render: (text) => {
          return <Tooltip title={text} placement='topLeft'>
            <span title="">{text}</span>
          </Tooltip>
        }
      },
      {
        title: '简称',
        dataIndex: 'questionShortName',
        key: 'questionShortName'
      },
      {
        title: '回复内容',
        dataIndex: 'answerText',
        key: 'answerText',
        ellipsis: true,
        render: (text) => {
          return <Tooltip title={text} placement='topLeft'>
            <span title="">{text}</span>
          </Tooltip>
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => {
          return <div>
            <span
              onClick={this.editContent.bind(this, data)}
              className={style.edit}>编辑</span>
            <span
              onClick={this.deleteContent.bind(this, data.sort)}
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
        rowKey={record =>  record.sort}
        pagination={false} />
    </div>
  }

  editContent = (data) => {
    this.props.onEdit(data);
  };

  deleteContent = (question) => {
    this.props.onDelete(question);
  };
}

export default QuestionTable;
