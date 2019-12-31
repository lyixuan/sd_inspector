import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import styles from './style.less';

@connect(({ resubmitModal }) => ({
  stuDetailData: resubmitModal.stuDetailData || {},
}))
class DetailsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 15,
      current: 1,
    }
  }
  columns = () => {
    const columns = [
      {
        title: '学员id',
        dataIndex: 'stuId',
        key: 'stuId',
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
      },
      {
        title: '周期',
        dataIndex: 'lifeCycle',
        key: 'lifeCycle',
      },
      {
        title: '报名时间',
        dataIndex: 'paymentTime',
        key: 'paymentTime',
      },
      {
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },{
        title: '家族',
        dataIndex: 'familyName',
        key: 'familyName',
      },{
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
      },{
        width: '20%',
        ellipsis: true,
        title: '老产品包',
        dataIndex: 'originPackageName',
        key: 'originPackageName',
        render: (text, record) => {
          return (
            <Tooltip title={text}>{text}</Tooltip>
          );
        },
      },{
        title: '续费产品包',
        dataIndex: 'packageName',
        key: 'packageName',
      },{
        title: '净流水',
        dataIndex: 'restAmount',
        key: 'restAmount',
      },
    ];
    return columns || [];
  };
  onChangeSize = current => {
    const params = {...this.props.getRequestParams(), page: current, pageSize: this.state.pageSize}
    this.props.getQueryStuDetailPage(params);
    this.setState({ current });
  }
  render() {
    const { dataSource = [], total = 0 } = this.props.stuDetailData;
    const { pageSize = 15, current = 1} = this.state;
    return (
      <BIContainer 
      headStyle={{display: 'none'}}
      >
        <div className={styles.detailsIndex}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={dataSource}
            loading={this.props.loading}
            rowKey={record => record.stuId}
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
