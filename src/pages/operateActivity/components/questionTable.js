import React from 'react';
import BITable from '@/ant_components/BITable';
import style from './questionTableStyle.less';

class QuestionTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: '标准问题',
        dataIndex: '',
        key: '',
        width: 280
      },
      {
        title: '简称',
        dataIndex: '',
        key: '',
        width: 80
      },
      {
        title: '回复内容',
        dataIndex: '',
        key: ''
      },
      {
        title: '操作',
        key: 'action',
        width: 90,
        render: (data) => {
          return <div>
            <span onClick={this.editContent.bind(this, data)}>编辑</span>
            <span onClick={this.deleteContent.bind(this, data.id)}>删除</span>
          </div>
        }
      }
    ];
  }

  render() {
    const {columns} = this;
    const {data, loading} = this.props;
    return <div className={style.wrap}>
      <BITable
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={record =>  record.id} />
    </div>
  }

  editContent = (data) => {

  };

  deleteContent = (id) => {

  };
}

export default QuestionTable;
