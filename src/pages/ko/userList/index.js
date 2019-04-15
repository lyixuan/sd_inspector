import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import style from './style.less';
import moment from 'moment/moment';

const columns = [
  {
    title: '学员',
    dataIndex: 'qualityNum',
  },
  {
    title: '注册状态',
    dataIndex: 'qualityType',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`QUALITY_TYPE|id:${record.qualityType}`).name}
        </>
      );
    },
  },
  {
    title: '选课状态',
    dataIndex: 'violationName',
  },
  {
    title: '浏览页面数量',
    dataIndex: 'operateName',
  },
  {
    title: '视频播放次数',
    dataIndex: 'violationLevel',
  },
  {
    title: '做题次数',
    dataIndex: 'violationLevel',
  },
  {
    title: 'IM咨询次数',
    dataIndex: 'violationLevel',
  },
  {
    title: '排队次数',
    dataIndex: 'violationLevel',
  },
  {
    title: '留言次数',
    dataIndex: 'violationLevel',
  },
  {
    title: '跟帖次数',
    dataIndex: 'violationLevel',
  },
  {
    title: '微信咨询次数',
    dataIndex: 'violationLevel',
  },
  {
    title: 'KO转化',
    dataIndex: 'status',
    render: (text, record) => {
      function dot() {
        let rt = null;
        if (record.status === 4) {
          rt = <span className={style.dotStl} style={{ background: '#52C9C2' }}></span>
        }
        if (record.status === 3) {
          rt = <span className={style.dotStl} style={{ background: '#D9D9D9' }}></span>
        }
        return rt;
      }
      return (
        <>
          {dot()}
          {BiFilter(`QUALITY_STATE|id:${record.status}`).name}
        </>
      );
    },
  },
];
@connect(({ userListModel,loading }) => ({
  userListModel,
  loading: loading.effects['userListModel/userList'],
}))
class userList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  };
  onPageChange = (currentPage)=>{
    this.queryData({page:currentPage});
  };
  queryData = (page) => {
    let params = { ...this.state };
    if (page) {
      params = { ...params, ...page };
      this.setState({
        page: page.page
      });
    }
    this.props.dispatch({
      type: 'userListModel/userList',
      payload: { params },
    });
  };
  render() {
    const {userList,page={},loading} = this.props.userListModel;
    const dataSource = userList;
    return (
      <div>
        <div className={style.contentWrap}>
          <BITable rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
          <br/>
          <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
        </div>
      </div>
    );
  }
}

export default userList;
