import React, { Component } from 'react';
import Table from 'antd/lib/table';

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    // 获取数据
  }

  render() {
    const dataSource = [{
      index: '1',
      adjustDate2: '胡彦斌',
      type2: 32,
      creditScore2: '西湖区湖底公园1号'
    }, {
      index: '2',
      adjustDate2: '胡彦祖',
      type2: 42,
      creditScore2: '西湖区湖底公园1号'
    }];

    const columns = [
      {
        title: '省/市',
        dataIndex: 'index',
      },
      {
        title: '学院',
        dataIndex: 'adjustDate2',
      },
      {
        title: '家族',
        dataIndex: 'type2',
      },
      {
        title: '考试计划人数',
        dataIndex: 'creditScore2',
      },
      {
        title: '准考证填写人数',
        dataIndex: 'groupType2',
      },
      {
        title: '消息已读人数',
        dataIndex: 'orgName2',
      },
      {
        title: '消息未读人数',
        dataIndex: 'familyType2',
      },
    ];
    return (
      <>
        <div>
          <Table dataSource={dataSource} columns={columns} bordered/>
        </div>
      </>
    );
  }
}

export default ResultTable;
