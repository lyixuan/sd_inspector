import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from '../style.less';
import ColorBlock from '../components/colorBlock';
import BIWrapperTable from '@/components/BIWrapperTable';
import Star from '../components/star';
import BILoading from '@/components/BILoading';
import { Tooltip } from 'antd';
import moment from 'moment';
import Container from '@/components/BIContainer';

@connect(({ xdOperation, loading }) => ({
  xdOperation,
  loading: loading.effects['xdOperation/getNpsAutonomousEvaluation'],
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  clickStudentName = record => {
    let params = {
      userId: record.stuId, //record,
      target: 'userName',
    };
    const { BI = {} } = window;
    BI.traceV &&
      BI.traceV({
        widgetName: '管理层首页nps进学员档案',
        traceName: '管理层工作台/nps/列表/学员档案',
      });
    window.open(`/inspector/ko/behaviorPath?params=${JSON.stringify(params)}`);
  };
  columnsRight = () => {
    const columns = [
      {
        title: '后端归属',
        dataIndex: 'backend',
        key: 'backend',
        width: '20%',
      },
      {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        width: '100px',
        render: (stuName, record) => {
          return (
            <div className={styles.studentColor} onClick={() => this.clickStudentName(record)}>
              {stuName}
            </div>
          );
        },
      },
      {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '180px',
        render: createTime => {
          const dateTimes = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
          return <div>{dateTimes}</div>;
        },
      },
      {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width: '120px',
        render: star => {
          return <Star star={star} style={{ display: 'flex', alignItem: 'center' }} />;
        },
      },
      {
        title: '原因',
        ellipsis: true,
        dataIndex: 'reasonTypeDesc',
        key: 'reasonTypeDesc',
        width: '120px',
        render: opinion => {
          return <Tooltip title={opinion}>{opinion}</Tooltip>;
        },
      },
      {
        title: '内容',
        ellipsis: true,
        dataIndex: 'opinion',
        key: 'opinion',
        // width:100,
        render: opinion => {
          return (
            <Tooltip title={opinion}>
              <span className={styles.contentMain}>
                {opinion}
                <div />
              </span>
            </Tooltip>
          );
        },
      },
    ];
    return columns || [];
  };

  more = pageNum => {
    this.props.getCommentList(pageNum, false);
  };

  render() {
    // const { dataSource} = this.state;
    const { NPSleftParams, npsList = [], loading } = this.props;
    let isLastPage = false;
    const { nowPage: pageNum, pages } = NPSleftParams.npsStarOpinionDtoListMap || {};
    if (pages <= pageNum) {
      isLastPage = true;
    }
    const dataSource = npsList || [];
    return (
      <Container
        title="创收学院对比"
        style={{ width: 'calc(100%)' }}
        headStyle={{display: 'none'}}
        propStyle={{ padding: 0 }}
      >
        <Spin spinning={loading} style={{ width: '100%' }}>
          <div style={{ width: '100%', height: '32px', overflow: 'hidden' }}>
            {NPSleftParams &&
              NPSleftParams.reasonTypeDtoList &&
              NPSleftParams.reasonTypeDtoList.map((item, index) => (
                <ColorBlock data={{ ...item }} key={index} className={`colorStyle${index}`} />
              ))}
          </div>
          <BIWrapperTable
            columns={this.columnsRight()}
            dataSource={dataSource}
            pagination={false}
            rowKey={(record, idx) => idx}
            style={{ marginTop: '10px' }}
            // scroll={{ y: 288 }}
            className={styles.NPALeftMain}
            name="NPALeftMain"
          />
          {npsList.length > 0 && (
            <div className={styles.loadmore}>
              {isLastPage ? (
                <span>没有更多了</span>
              ) : (
                <span onClick={() => this.more(pageNum)}>查看更多</span>
              )}
            </div>
          )}
        </Spin>
      </Container>
    );
  }
}

export default NPSLeft;
