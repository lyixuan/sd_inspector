import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import BITabs from '@/ant_components/BITabs';
import BIButton from '@/ant_components/BIButton';
import { Icon } from 'antd';
import styles from './style.less';
import Page from './component/page';
import moment from 'moment';

const TabPane = BITabs.TabPane;
const performanceType = {
  family: '1',
  operation: '2',
  teacher: '3',
};

@connect(({ performanceModel, loading }) => ({
  performanceModel,
  isLoading: loading.effects['PerformanceModel/getPerformanceList'],
}))
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageType: this.props.location.query.packageType || performanceType.family,
    };
  }

  componentDidMount() {
    this.getPerformanceList();
  }

  momentFormat = (date, way) => {
    return moment(Number(date))
      .format(way)
      .replace(/-/g, '/');
  };
  getPerformanceList = val => {
    let params = {
      packageType: Number(val) || Number(this.state.packageType),
    };
    this.props.dispatch({
      type: 'performanceModel/getListData',
      payload: { params },
    });
  };

  onTabChange = val => {
    this.setState({ packageType: val });
    this.getPerformanceList(val);
  };

  copy = (idx, id) => {
    router.push({
      pathname: '/setting/performance/copy',
      query: { packageType: idx, id },
    });
  };

  edit = (idx, id) => {
    router.push({
      pathname: '/setting/performance/edit',
      query: { packageType: idx, id },
    });
  };
  // 跳转新建页面
  toCreat = idx => {
    router.push({
      pathname: '/setting/performance/create',
      query: { packageType: idx },
    });
  };

  queryDataFn = page => {
    let params = {};
    params.page = page;
    params.packageType = Number(this.state.packageType);
    this.props.dispatch({
      type: 'performanceModel/getListData',
      payload: { params },
    });
  };
  render() {
    const { listData = [] } = this.props.performanceModel;
    console.log(listData, 'listData');
    const tableTitle = ['家族长', '运营长', '班主任'];
    const pageData = {
      pageNum: listData.pageNum,
      total: listData.total,
      size: 15,
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: '1',
      },
      {
        title: '生效周期',
        key: '2',
        dataIndex: 'date',
        render: (text, record) => {
          return (
            <>{`${this.momentFormat(record.effectiveDate, 'YYYY-MM-DD')} - ${this.momentFormat(
              record.expiryDate,
              'YYYY-MM-DD'
            )}`}</>
          );
        },
      },
      {
        title: '创建时间',
        key: '3',
        dataIndex: 'createDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.createDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '更新时间',
        key: '4',
        dataIndex: 'modifyDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.modifyDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '操作人',
        key: '5',
        dataIndex: 'operator',
        render: (text, record) => {
          return <>{record.operator}</>;
        },
      },
      {
        title: '操作',
        key: '6',
        dataIndex: 'operator',
        render: (text, record) => {
          return (
            <>
              <span
                className={styles.btn}
                onClick={() => this.copy(this.state.packageType, record.id)}
              >
                复制
              </span>
              <span
                className={styles.btn}
                onClick={() => this.edit(this.state.packageType, record.id)}
              >
                编辑
              </span>
            </>
          );
        },
      },
    ];
    const tabpane = tableTitle.map((item, idx) => {
      return (
        <TabPane tab={item} key={idx + 1}>
          <div>
            <p className={styles.createBtn}>
              <BIButton type="primary" onClick={() => this.toCreat(idx + 1)}>
                <Icon type="plus" />
                创建
              </BIButton>
            </p>
            <Page
              {...this.props}
              columns={columns}
              dataSource={listData.list}
              page={pageData}
              queryData={page => this.queryDataFn(page)}
            ></Page>
          </div>
        </TabPane>
      );
    });

    return (
      <div>
        <div className={styles.aiWorktable}>
          <p className={styles.title}>
            <span>创收绩效包</span>
          </p>
          <div className={styles.performanceWrap}>
            <BITabs
              className={styles.content}
              onChange={this.onTabChange}
              defaultActiveKey={this.state.packageType}
              animated={false}
            >
              {tabpane}
            </BITabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Performance;
