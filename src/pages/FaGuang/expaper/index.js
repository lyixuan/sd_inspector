import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import styles from './style.less';


function dealQuarys(pm) {
  const p = DeepCopy(pm);
  return p;
};

@connect(({ expaper, loading }) => ({
  expaper,
  loading: loading.effects['expaper/getList'],
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
      type: 'expaper/getList',
      payload: { params },
    });
  };
  columnsAction = (rowGroup) => {
    const columns = [
      {
        title: '考试类型',
        dataIndex: 'examTypeName',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {rowSpan: 0},
          };
          const arr = [0];
          rowGroup.forEach((v,i)=>{
            arr.push(arr[i]+v);
          });
          arr.forEach((v,i)=>{
            if (index === v) {
              obj.props.rowSpan = arr[i+1]-arr[i];
            }
          });
          return obj;
        },
      },
      {
        title: '考卷名称',
        dataIndex: 'examName',
      },
      {
        title: '考卷地址',
        dataIndex: 'examUrl',
      },
      {
        title: '考试对象',
        dataIndex: 'examSubjects',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (value, record, index) => {
          const obj = {
            children: <>
              <span className={styles.actionBtn} onClick={() => this.showModal(record)}>
              编辑
            </span>
            </>,
            props: {rowSpan: 0},
          };
          const arr = [0];
          rowGroup.forEach((v,i)=>{
            arr.push(arr[i]+v);
          });
          arr.forEach((v,i)=>{
            if (index === v) {
              obj.props.rowSpan = arr[i+1]-arr[i];
            }
          });
          return obj;
        },
      }
    ];
    return columns;
  };
  render() {
    const { dataList = [],rowGroup=[] } = this.props.expaper;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction(rowGroup)}
          dataSource={dataList}
          queryData={(params, page) => this.queryData(params, page)}/>
      </>
    );
  }
}

export default Evaluate;
