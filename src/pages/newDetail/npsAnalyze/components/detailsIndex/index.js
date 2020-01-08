import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import Star from '../star';
import BIButton from '@/ant_components/BIButton';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import downloadImg from '@/assets/npsAnalyze/download.png';
import { handleDataTrace } from '@/utils/utils';
import float3 from '@/assets/resubmit/float3.png';
import moment from 'moment';
import styles from './style.less';

@connect(({ newDetailModal, npsAnalyzeModel, loading }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  stuDetailData: npsAnalyzeModel.stuDetailData || {},
  paramsQuery: npsAnalyzeModel.paramsQuery,
  loading: loading.effects['npsAnalyzeModel/getNpsAutonomousEvaluation'],
  downLoding: loading.effects['npsAnalyzeModel/exportExcelData'],
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
        <Tooltip title={text}><a href={`/inspector/ko/behaviorPath?params=${encodeURIComponent(JSON.stringify({ userId: record.stuId, target: 'draw' }))}`} target='_black'>{text}</a></Tooltip>
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
        ellipsis: true,
        title: '内容',
        dataIndex: 'tagList',
        key: 'tagList',
        render: (text, record) => {
          const content = <span>{text.map((item, index) => <span key={index}>{index > 0 ? ' | ' : ''}<span style={{color: item.type === 31 ? '#DA43FF' : '#6665DD'}}>{item.name}</span></span>)} {record.opinion}</span>;
          return <Tooltip placement="topLeft" title={content}>{content}</Tooltip>
        }
      }
    ];
    return columns || [];
  };
  onChangeSize = current => {
    const params = {...this.props.getRequestParams(), pageNum: current, pageSize: this.state.pageSize}
    this.props.getQueryStuDetailPage(params);
    this.setState({ current });
  }
  exportExcelData = () => {
    const params = this.props.getRequestParams();
    const { startTime, endTime, collegeId, familyId, groupId } = params;
    this.props.dispatch({
      type: 'npsAnalyzeModel/exportExcelData',
      payload: {
        params: { 
          bottomStartDate: startTime,
          bottomEndDate: endTime,
          type: 3,
          orgId: groupId || familyId || collegeId,
          orgType: this.getOrgType(groupId, familyId, collegeId),
          userId: this.props.globalUserInfo.id,
          extraParam: params
        },
      },
    });
    handleDataTrace({ widgetName: `NPS_下载`, traceName: `2.3/NPS_下载` })
  }
  getOrgType = (groupId, familyId, collegeId) => {
    if (groupId) {
      return 'group';
    } else if (familyId) {
      return 'family';
    } else if (collegeId) {
      return 'college';
    } else {
      return 'boss'
    }
  }
  isFlagDownLoad = () => {
    const { orgId = [] } = this.props.paramsQuery;
    const [cId, fId, gId] = orgId;
    const {collegeId, familyId, groupId, userType} = this.props.globalUserInfo;
    if (userType === 'boss') {
      return true;
    } else if (collegeId && familyId && groupId) {
      if (cId === collegeId && fId === familyId, gId === groupId) {
        return true;
      } else {
        return false;
      }
    } else if (collegeId && familyId) {
      if (cId === collegeId && fId === familyId) {
        return true;
      } else {
        return false;
      }   
    } else if (collegeId && cId === collegeId) {
      return true;
    }
    return false;
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
            { 
              this.isFlagDownLoad() && <BIButton loading={this.props.downLoding} onClick={this.exportExcelData} type="primary" radiused={true} size="default">
                <img style={{width: '12px'}} src={downloadImg} alt=""/>
                下载
              </BIButton>
            }
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
