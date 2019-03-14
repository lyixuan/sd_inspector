import React from 'react';
import { connect } from 'dva';
import Page1 from './component/page1';
import Page2 from './component/page2';
import BITabs from '@/ant_components/BITabs';
import styles from './style.less';
const TabPane = BITabs.TabPane;
const columns1 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '归属人',
    dataIndex: 'collegeName',
  },
  {
    title: '归属组织',
    dataIndex: 'organization',
  },
  {
    title: '申诉状态',
    dataIndex: 'statusName',
  },
  {
    title: '质检通过时间',
    dataIndex: 'verifyDate',
  },
  {
    title: '一审截止时间',
    dataIndex: 'firstAppealEndDate',
  },
  {
    title: '二审截止时间',
    dataIndex: 'secondAppealEndDate',
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
const columns2 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '归属组织',
    dataIndex: 'organization',
  },
  {
    title: '违规等级',
    dataIndex: 'violationLevel',
  },
  {
    title: '申诉状态',
    dataIndex: 'statusName',
  },
  {
    title: '是否警告',
    dataIndex: 'isWarn',
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

@connect(({ qualityCheck }) => ({
  qualityCheck,
}))

class QualityAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      activeKey: val
    })
  };
  render() {
    const {} = this.state;
    return (
      <>
        <div className={styles.topTab}>
          <BITabs onChange={this.onTabChange} animated={false}>
            <TabPane tab="在途质检申诉" key="1">
              <div className={styles.tabBlank}>&nbsp;</div>
              <Page1 {...this.props} columns={columns1} queryData={()=>this.queryData()} />
            </TabPane>
            <TabPane tab="结案质检申诉" key="2">
              <div className={styles.tabBlank}>&nbsp;</div>
              <Page2 {...this.props} columns={columns2} queryData={()=>this.queryData()} />
            </TabPane>
          </BITabs>
        </div>
      </>

    );
  }
}

export default QualityAppeal;

