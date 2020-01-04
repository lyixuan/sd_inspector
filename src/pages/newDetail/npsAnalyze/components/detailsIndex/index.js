import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import { Link } from 'dva/router';
import Star from '../star';
import BIButton from '@/ant_components/BIButton';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import float3 from '@/assets/resubmit/float3.png';
import moment from 'moment';
import styles from './style.less';

@connect(({ npsAnalyzeModel, loading }) => ({
  stuDetailData: npsAnalyzeModel.stuDetailData || {},
  loading: loading.effects['npsAnalyzeModel/getNpsAutonomousEvaluation'],
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
        width: '20%',
        ellipsis: true,
        title: '后端归属',
        dataIndex: 'backend',
        key: 'backend',
        render: text => <Tooltip title={text}>{text}</Tooltip>,
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
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => moment(text).format('YY-MM-DD HH:mm:ss')
      },
      {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        render: text => <Star star={text} style={{ display: 'flex', alignItem: 'center' }} />
      },
      {
        title: '原因',
        dataIndex: 'reasonTypeDesc',
        key: 'reasonTypeDesc',
      },
      {
        width: '30%',
        title: '内容',
        dataIndex: 'tagList',
        key: 'tagList',
        render: text => <>{text.map((item, index) => <span>{index > 0 ? ' | ' : ''}{item.name}</span>)}</>
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
    const { data = [], total = 0 } = this.props.stuDetailData;
    const { pageSize = 15, current = 1} = this.state;
    return (
      <BIContainer 
      headStyle={{display: 'none'}}
      >
        <div className={styles.detailsIndex}>
          <span className={styles.download}>
            <BIButton type="primary" radiused={true} size="small">下载</BIButton>
          </span>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={data}
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
