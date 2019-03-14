import React from 'react';
import { connect } from 'dva';
import Page from './component/page';

const columns = [
  {
    title: '省/市',
    dataIndex: 'province',
  },
  {
    title: '学院',
    dataIndex: 'collegeName',
    width: 130,
  },
  {
    title: '家族',
    dataIndex: 'familyName',
    width: 130,
  },
  {
    title: '考试计划人数',
    dataIndex: 'examPlanNum',
    width: 140,
  },
  {
    title: '准考证填写人数',
    dataIndex: 'admissionFillNum',
    width: 140,
  },
  {
    title: '未推送消息人数',
    dataIndex: 'unpushNum',
    width: 140,
  },
  {
    title: '已推送消息人数',
    dataIndex: 'pushNum',
    width: 140,
  },
  {
    title: '消息已读人数',
    dataIndex: 'readNum',
    width: 140,
  },
  {
    title: '消息未读人数',
    dataIndex: 'unreadNum',
    width: 140,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    render: (text, record) => {
      return (
        <div>
          <div>
              <span
                style={{ color: '#52C9C2', cursor: 'pointer', display: 'inline-block' }}
                onClick={() => this.onRecord(record)}
              >
                审核记录
              </span>
          </div>
        </div>
      );
    },
  },
];

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // 获取数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
  };
  render() {
    return (
      <>
        <Page {...this.props} columns={columns}></Page>
      </>
    );
  }
}

export default NewQualitySheetIndex;
