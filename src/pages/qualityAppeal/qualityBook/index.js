
import React from 'react';
import { connect } from 'dva';
import BITabs from '@/ant_components/BITabs';
import Page from './component/page';
import styles from './style.less'
const TabPane = BITabs.TabPane;
const columns = [
  {
    title: '分维',
    dataIndex: 'dimensionId',
  },
  {
    title: '一级分类',
    dataIndex: 'collegeName',
  },
  {
    title: '二级分类',
    dataIndex: 'familyName',
  },
  {
    title: '三级分类',
    dataIndex: 'examPlanNum',
  },
  {
    title: '违规等级',
    dataIndex: 'admissionFillNum',
  },
  {
    title: '状态',
    dataIndex: 'pushNum',
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
                编辑
              </span>
          </div>
          <div>
              <span
                style={{ color: '#52C9C2', cursor: 'pointer', display: 'inline-block' }}
                onClick={() => this.onRecord(record)}
              >
                置为无效
              </span>
          </div>
        </div>
      );
    },
  },
];

@connect(({ qualityBook }) => ({
  qualityBook,
}))

class QualityBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: '1'
    };
  }
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    // 获取数据
    this.props.dispatch({
      type: 'qualityBook/getExamList',
      payload: { params: {} },
    });
  };
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
  };
  render() {
    const {keye} = this.state;
    return (
      <>
        <div className={styles.topTab}>
          <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
            <TabPane tab="班主任质检" key="1">
              <Page {...this.props} columns={columns} keye='1' queryData={()=>this.queryData()} />
            </TabPane>
            <TabPane tab="客诉质检" key="2">
              <Page {...this.props} columns={columns} keye='2' queryData={()=>this.queryData()} />
            </TabPane>
          </BITabs>
        </div>
      </>
    );
  }
}

export default QualityBook;
