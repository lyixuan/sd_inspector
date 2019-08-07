import React from 'react';
import { connect } from 'dva';
// import { Tabs } from 'antd';
import BITabs from '@/ant_components/BITabs';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import Page from './component/page';

const TabPane = BITabs.TabPane;
const performanceType = {
  family: 1,
  operation: 2,
  teacher: 3,
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '生效周期',
    dataIndex: 'date',
    render: (text, record) => {
      return <>{'effectiveDate' - 'expiryDate'}</>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyDate',
    render: (text, record) => {
      return <>11</>;
    },
  },
  {
    title: '操作',
    dataIndex: 'operator',
    render: (text, record) => {
      return <>1111</>;
    },
  },
  {
    title: '状态',
    dataIndex: 'operateName',
  },
  {
    title: '质检状态',
    dataIndex: 'status',
    render: (text, record) => {
      return <>11</>;
    },
  },
];

class qualityAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: '1',
    };
  }

  callback = key => {
    console.log(key);
  };
  onTabChange = val => {
    console.log(val, 'val');
  };

  columnsAction = () => {
    const actionObj = [
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <>查看详情 编辑</>;
        },
      },
    ];
    return [...columns, ...actionObj];
  };

  // 跳转新页面
  toCreat = () => {};
  render() {
    console.log(this.state.tabType, 'defaultActiveKey');
    const { qualityList = [], page } = { qualityList: [], page: 1 };
    const { orgListTreeData = [], dimensionList1 = [], dimensionList2 = [] } = {
      orgListTreeData: [],
      dimensionList1: [],
      dimensionList2: [],
    };
    return (
      <div>
        <>
          <div className={styles.performanceWrap}>
            <BITabs
              onChange={this.onTabChange}
              defaultActiveKey={this.state.tabType}
              animated={false}
            >
              <TabPane tab="家族长" key="1">
                <div className={styles.content}>
                  <p>
                    <BIButton type="primary" onClick={this.toCreat}>
                      创建
                    </BIButton>
                  </p>
                  <Page
                    {...this.props}
                    columns={this.columnsAction()}
                    dataSource={qualityList}
                    page={page}
                    orgList={orgListTreeData}
                    dimensionList1={dimensionList1}
                    dimensionList2={dimensionList2}
                    queryData={(params, page, isExport) => this.queryData(params, page, isExport)}
                    onJumpPage={(query, pathname) => this.onJumpPage(query, pathname)}
                  ></Page>
                </div>
              </TabPane>
              <TabPane tab="运营长" key="2">
                <div className={styles.content}>22222</div>
              </TabPane>
              <TabPane tab="班主任" key="3">
                <div className={styles.content}>11111</div>
              </TabPane>
            </BITabs>
          </div>
        </>
      </div>
    );
  }
}

export default qualityAppeal;
