import React from 'react';
import BITable from '@/ant_components/BITable';

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
    const {sourceData} = this.props;
    const {columns} = this;

    return <div>
      <BITable
        dataSource={sourceData}
        columns={columns}
        rowKey={(record) => record.sort}
        pagination={false} />
    </div>
  }
}

export default QuestionTable;
