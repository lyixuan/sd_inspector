import React from 'react';
import { connect } from 'dva';
import Page1 from './component/page1';
import Page2 from './component/page2';
import BITabs from '@/ant_components/BITabs';
import AuthButton from '@/components/AuthButton';
import style from '@/pages/qualityAppeal/style.less';
import styles from './style.less';
import router from 'umi/router';
const TabPane = BITabs.TabPane;
const columns1 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
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
];
const columns2 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
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
];

@connect(({ qualityAppealHome,qualityCheck }) => ({
  qualityAppealHome,
  qualityCheck,
}))

class QualityAppeal extends React.Component {
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
      type: 'qualityCheck/getAppealList',
      payload: { params: {} },
    });
  };
  onTabChange = (val) => {
    this.setState({
      activeKey: val
    })
  };

  onDetail = () => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/detail',
      // query: this.props.checkedConditionList,
    });
  };

  onSubmitAppeal = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/edit',
      query: {id:record.id},
    });
  };

  onAppeal = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/appeal',
      query: {id:record.id},
    });
  };

  onRepeal = (record) => {
  };

  columnsAction1 = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/qualityAppeal/qualityAppeal/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                查看详情
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityAppeal/edit'>
              <span className={style.actionBtn} onClick={() => this.onSubmitAppeal(record)}>
                提交申诉
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityAppeal/appeal'>
              <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                审核
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityAppeal/repeal'>
              <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                撤销
              </span>
            </AuthButton>

          </>
        );
      },
    }];
    if (!AuthButton.checkPathname('/qualityAppeal/qualityAppeal/showQA')) {
      columns1.splice(2,1);
    }
    return [...columns1,...actionObj];
  };

  columnsAction2 = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/qualityAppeal/qualityAppeal/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                查看详情
              </span>
            </AuthButton>
          </>
        );
      },
    }];
    return [...columns2,...actionObj];
  };
  render() {
    const {} = this.state;
    const {orgListTreeData = [], dimensionList1 = [],dimensionList2 = []} = this.props.qualityAppealHome;
    return (
      <>
        <div className={styles.topTab}>
          <BITabs onChange={this.onTabChange} animated={false}>
            <TabPane tab="在途质检申诉" key="1">
              <div className={styles.tabBlank}>&nbsp;</div>
              <Page1
                {...this.props}
                columns={this.columnsAction1()}
                orgList={orgListTreeData}
                queryData={()=>this.queryData()} />
            </TabPane>
            <TabPane tab="结案质检申诉" key="2">
              <div className={styles.tabBlank}>&nbsp;</div>
              <Page2
                {...this.props}
                dimensionList1 = {dimensionList1}
                dimensionList2 = {dimensionList2}
                columns={this.columnsAction2()}
                queryData={()=>this.queryData()} />
            </TabPane>
          </BITabs>
        </div>
      </>

    );
  }
}

export default QualityAppeal;

