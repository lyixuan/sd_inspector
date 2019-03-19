import React from 'react';
import { connect } from 'dva';
import AuthButton from '@/components/AuthButton';
import Page from './component/page';
import style from '@/pages/qualityAppeal/style.less';


const columns = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
  },
  {
    title: '分维',
    dataIndex: 'dimensionName',
  },
  {
    title: '归属组织',
    dataIndex: 'organzitionName',
  },
  {
    title: '质检扣分日期',
    dataIndex: 'reduceScoreDate',
  },
  {
    title: '质检发起人',
    dataIndex: 'operateName',
  },
  {
    title: '违规等级',
    dataIndex: 'violationLevel',
  },
  {
    title: '质检状态',
    dataIndex: 'statusName',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => {
      return (
        <>
          <AuthButton authority='/qualityAppeal/qualityNewSheet/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                查看
              </span>
          </AuthButton>
          <AuthButton authority='/qualityAppeal/qualityNewSheet/edit'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                编辑
              </span>
          </AuthButton>
          <AuthButton authority='/qualityAppeal/qualityNewSheet/repeal'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                撤销
              </span>
          </AuthButton>
          <AuthButton authority='/qualityAppeal/qualityNewSheet/appealSt'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                审核
              </span>
          </AuthButton>
          {/*<AuthButton authority='/qualityAppeal/qualityNewSheet/delete'>*/}
              {/*<span className={style.actionBtn} onClick={() => this.onDetail(record)}>*/}
                {/*删除*/}
              {/*</span>*/}
          {/*</AuthButton>*/}
        </>
      );
    },
  },
];

@connect(({ qualityAppealHome,qualityNewSheet }) => ({
  qualityAppealHome,
  qualityNewSheet,
}))

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  }
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    // 获取数据
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityList',
      payload: { params: {} },
    });
  };

  render() {
    const {orgList = [], dimensionList1 = [],dimensionList2 = []} = this.props.qualityAppealHome;
    return (
      <>
        <Page
          {...this.props}
          columns={columns}
          orgList={orgList}
          dimensionList1 = {dimensionList1}
          dimensionList2 = {dimensionList2}
          queryData={()=>this.queryData()} />
      </>
    );
  }
}

export default NewQualitySheetIndex;
