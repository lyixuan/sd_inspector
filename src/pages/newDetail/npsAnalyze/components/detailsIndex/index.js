import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import { Link } from 'dva/router';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import float3 from '@/assets/resubmit/float3.png';
import styles from './style.less';

@connect(({ npsAnalyzeModel }) => ({
  stuDetailData: npsAnalyzeModel.stuDetailData || {},
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
        title: '后端归属',
        dataIndex: 'stuId',
        key: 'stuId',
      },
      {
        width: '8%',
        ellipsis: true,
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        render: (text, record) => text ? 
        <Tooltip title={text}><Link to={`/ko/behaviorPath?params=${encodeURIComponent(JSON.stringify({ userId: record.stuId, target: 'draw' }))}`} target='_black'>{text}</Link></Tooltip>
        : <img style={{width: '15px'}} src={float3} alt=""/>
      },
      {
        title: '报名时间',
        dataIndex: 'paymentTime',
        key: 'paymentTime',
      },
      {
        title: '星级',
        dataIndex: 'satrt',
        key: 'satrt',
      },
      {
        title: '原因',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '内容',
        dataIndex: 'groupName',
        key: 'groupName',
        render: text => <Tooltip title={text}>{text}</Tooltip>
      }
    ];
    return columns || [];
  };
  onChangeSize = current => {
    const params = {...this.props.getRequestParams(), page: current, pageSize: this.state.pageSize}
    this.props.getQueryStuDetailPage(params);
    this.setState({ current });
  }
  render() {
    const { list = [], total = 0 } = this.props.stuDetailData;
    const { pageSize = 15, current = 1} = this.state;
    return (
      <BIContainer 
      headStyle={{display: 'none'}}
      >
        <div className={styles.detailsIndex}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={list}
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
