import React from 'react';
import { connect } from 'dva';
import { Rate,Tooltip } from 'antd';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import moment from 'moment/moment';
import style from './style.less';

const columns = [
  {
    title: '评价时间',
    dataIndex: 'createTime',
    width:120,
    render: (text, record) => {
      return (
        <>
          {moment(text).format('YYYY-MM-DD HH:mm:ss')}
        </>
      );
    },
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    width:80,
  },
  {
    title: '组织',
    dataIndex: 'orgName',
    width:280,
  },
  {
    title: '课程名称',
    dataIndex: 'videoName',
    width:120,
  },
  {
    title: '星级',
    dataIndex: 'starLevel',
    width:130,
    render: (text, record) => {
      return (
        <>
          {<Rate disabled defaultValue={text} style={{fontSize:13}}/>}
        </>
      );
    },
  },
  {
    title: '评价内容',
    dataIndex: 'commentaryContent',
    render: (text, record) => {
      return (
        <>
          {/* Tooltip */}
          <Tooltip placement="top" title={text} overlayStyle={{top:'10px'}}>
            <span className={style.twoline}>{text}</span>
          </Tooltip>
        </>
      );
    },
  },
];

function dealQuarys(pm) {
  const p = DeepCopy(pm);
  return p;
};

@connect(({ evaluate, loading }) => ({
  evaluate,
  loading: loading.effects['evaluate/getList'],
}))

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination:{
        page:1,
        pageSize:30
      },
      params:{}
    };
  }
  componentDidMount() {
    this.queryData();
  }
  queryData = (pm, pg) => {
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state.pagination };
    if (dealledPm) {
      params = { ...params, ...dealledPm };
    } else {
      params = {...params,...this.state.params}
    }
    if (pg) {
      params = { ...params, ...pg };
    }
    this.setState({
      params
    });
    this.props.dispatch({
      type: 'evaluate/getList',
      payload: { params },
    });
  };
  columnsAction = () => {
    return [...columns];
  };
  render() {
    const { dataList = [], page } = this.props.evaluate;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          queryData={(params, page) => this.queryData(params, page)}/>
      </>
    );
  }
}

export default Evaluate;
