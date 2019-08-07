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

@connect(({ PerformanceModel, loading }) => ({
  PerformanceModel,
  isLoading: loading.effects['PerformanceModel/getPerformanceList'],
}))
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageType: performanceType.family,
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
    console.log(this.state.packageType, 'this.state.packageType');
    this.props.dispatch({
      type: 'performanceModel/getListData',
      payload: { params },
    });
  };
  onTabChange = val => {
    this.setState({ packageType: val });
    this.getPerformanceList(val);
  };

  copy = () => {
    console.log('copy');
  };

  edit = () => {
    console.log('edit');
  };
  // 跳转新建页面
  toCreat = () => {
    router.push({ pathname: '/setting/performance/edit' });
  };
  render() {
    const { listData = [] } = this.props;
    const { page } = { page: 1 };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '生效周期',
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
        dataIndex: 'createDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.createDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'modifyDate',
        render: (text, record) => {
          return <>{this.momentFormat(record.modifyDate, 'YYYY-MM-DD HH:mm:ss')}</>;
        },
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        render: (text, record) => {
          return <>1111</>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operator',
        render: (text, record) => {
          return (
            <>
              <span className={styles.btn} onClick={this.copy}>
                复制
              </span>
              <span className={styles.btn} onClick={this.edit}>
                编辑
              </span>
            </>
          );
        },
      },
    ];

    const data = [
      {
        id: 1,
        effectiveDate: '1565160861867',
        expiryDate: '1565160917859',
        createDate: '1565160917859',
        modifyDate: '1565160928750',
        operator: 'admin',
      },
      {
        id: 2,
        effectiveDate: '1565160861867',
        expiryDate: '1565160917859',
        createDate: '1565160917859',
        modifyDate: '1565160928750',
        operator: 'admin',
      },
    ];
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
              <TabPane tab="家族长" key="1">
                <div>
                  <p className={styles.createBtn}>
                    <BIButton type="primary" onClick={this.toCreat}>
                      <Icon type="plus" />
                      创建
                    </BIButton>
                  </p>
                  <Page
                    {...this.props}
                    columns={columns}
                    dataSource={data}
                    page={page}
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
        </div>
      </div>
    );
  }
}

export default Performance;
