import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import { Link } from 'dva/router';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import float3 from '@/assets/resubmit/float3.png';
import styles from './style.less';

@connect(({ resubmitModal, loading }) => ({
  stuDetailData: resubmitModal.stuDetailData || {},
  loading: loading.effects['resubmitModal/getQueryStuDetailPage'],
}))
class DetailsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 15,
      current: 1,
    };
  }
  columns = () => {
    const columns = [
      {
        title: '学员ID',
        dataIndex: 'stuId',
        key: 'stuId',
      },
      {
        width: '8%',
        ellipsis: true,
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: (text, record) =>
          text ? (
            <Tooltip title={text}>
              <Link
                to={`/ko/behaviorPath?params=${encodeURIComponent(
                  JSON.stringify({ userId: record.stuId, target: 'draw' })
                )}`}
                target="_black"
                rel="noopener noreferrer"
              >
                {text}
              </Link>
            </Tooltip>
          ) : (
            <img style={{ width: '15px' }} src={float3} alt="" />
          ),
      },
      {
        width: '6%',
        title: '周期',
        dataIndex: 'lifeCycle',
        key: 'lifeCycle',
        render: text =>
          text ? text + '天' : <img style={{ width: '15px' }} src={float3} alt="" />,
      },
      {
        title: '报名时间',
        dataIndex: 'paymentTime',
        key: 'paymentTime',
      },
      {
        width: '8%',
        // ellipsis: true,
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
        // render: text => <Tooltip title={text}>{text}</Tooltip>
      },
      // {
      //   width: '10%',
      //   ellipsis: true,
      //   title: '家族',
      //   dataIndex: 'familyName',
      //   key: 'familyName',
      //   render: text => <Tooltip title={text}>{text}</Tooltip>
      // },
      {
        width: '10%',
        ellipsis: true,
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
        render: text => <Tooltip title={text}>{text}</Tooltip>,
      },
      {
        width: '18%',
        ellipsis: true,
        title: '老产品包',
        dataIndex: 'originPackageName',
        key: 'originPackageName',
        render: text => <Tooltip title={text}>{text}</Tooltip>,
      },
      {
        width: '18%',
        ellipsis: true,
        title: '续报产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        render: text => <Tooltip title={text}>{text}</Tooltip>,
      },
      {
        title: '净流水（元）',
        dataIndex: 'restAmount',
        key: 'restAmount',
        render: text => text.toFixed(1),
      },
    ];
    return columns || [];
  };
  onChangeSize = current => {
    const params = {
      ...this.props.getRequestParams(),
      page: current,
      pageSize: this.state.pageSize,
    };
    this.props.getQueryStuDetailPage(params);
    this.setState({ current });
  };
  render() {
    const { list = [], total = 0 } = this.props.stuDetailData;
    const { pageSize = 15, current = 1 } = this.state;
    return (
      <BIContainer headStyle={{ display: 'none' }}>
        <div className={styles.detailsIndex}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={list}
            loading={this.props.loading}
            rowKey={(record, index) => index}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current,
              total,
              hideOnSinglePage: true,
              showQuickJumper: true,
            }}
          />
        </div>
      </BIContainer>
    );
  }
}

export default DetailsIndex;
