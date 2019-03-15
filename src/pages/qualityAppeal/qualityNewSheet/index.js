import React from 'react';
import { connect } from 'dva';
import Page from './component/page';

const columns = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
  },
  {
    title: '分维',
    dataIndex: 'dimensionName',
  },
  {
    title: '归属组织',
    dataIndex: 'organzitionName',
  },
  {
    title: '质检扣分日期',
    dataIndex: 'reduceScoreDate',
  },
  {
    title: '质检发起人',
    dataIndex: 'operateName',
  },
  {
    title: '违规等级',
    dataIndex: 'violationLevel',
  },
  {
    title: '质检状态',
    dataIndex: 'statusName',
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

@connect(({ qualityAppealHome,qualityNewSheet }) => ({
  qualityAppealHome,
  qualityNewSheet,
}))

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  }
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    // 获取数据
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityList',
      payload: { params: {} },
    });
  };

  render() {
    const {orgList = [], dimensionList1 = [],dimensionList2 = []} = this.props.qualityAppealHome;
    return (
      <>
        <Page
          {...this.props}
          columns={columns}
          orgList={orgList}
          dimensionList1 = {dimensionList1}
          dimensionList2 = {dimensionList2}
          queryData={()=>this.queryData()} />
      </>
    );
  }
}

export default NewQualitySheetIndex;
