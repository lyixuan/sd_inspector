import React from 'react';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';
import { Spin } from 'antd';
import DetailIm from './components/im';
import DetailBbs from './components/bbs';
import DetailNps from './components/nps';
import DataClassfy from './components/dataClassfy';
import PageHead from '@/components/PageHead/pageHead';
import styles from './style.less';

function Detail(props) {
  if (props.pageData) {
    if (props.type == 1) {
      return <DetailIm {...props}></DetailIm>
    } else if (props.type == 2) {
      return <DetailBbs {...props}></DetailBbs>
    } else {
      return <DetailNps {...props}></DetailNps>
    }
  } else {
    return null
  }
}
@connect(({ AiDetail, workTableModel, loading }) => ({
  loading,
  AiDetail,
  idList: AiDetail.idList,
  pageData: AiDetail.pageData,
  isLoading: loading.effects['AiDetail/edit']
}))
class AiDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: JSON.parse(this.props.location.query.params).type.type,
      id: JSON.parse(this.props.location.query.params).id,
      submitParam: {}
    };
  }
  componentDidMount() {
    this.getConsultTree();//获取咨询分类树形结构
    this.getResonTree();//获取原因分类树形结构
    this.getPageData(); //获取页面数据
    this.queryData();
    this.setState({
      maxHeight: document.body.clientHeight < 600 ? 600 : document.body.clientHeight
    })
  }
  queryData = () => {
    this.props.dispatch({
      type: 'AiDetail/getIdList',
      payload: { params: JSON.parse(this.props.location.query.params).type },
    });
  };
  getConsultTree = () => {
    this.props.dispatch({
      type: 'AiDetail/getConsultTypeTree',
      payload: {},
    });
  }
  getResonTree = () => {
    this.props.dispatch({
      type: 'AiDetail/getReasonTypeTree',
      payload: {},
    });
  }
  getPageData = () => {
    let params = {
      id: this.state.id,
      type: this.state.type
    }
    // this.props.dispatch({
    //   type: 'AiDetail/edit',
    //   payload: { params: params }
    // });
    this.props.dispatch({
      type: 'AiDetail/edit',
      payload: { params },
      callback: (submitParam) => {
        this.setState({
          submitParam: submitParam
        })
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id != nextProps.match.params.id) {
      this.setState({
        id: nextProps.match.params.id,
        height: document.querySelector(".aiDetail2").offsetHeight
      })
    }
    return;
  }
  render() {
    let tabType = 1;
    if (this.state.type == 1) {
      tabType = 'IM';
    } else if (this.state.type == 2) {
      tabType = 'BBS';
    } else {
      tabType = 'NPS';
    }
    const { type, id } = this.state
    const routerData = { name: `${tabType}会话`, bread: { name: "AI工作台", path: `/qualityMarking/${tabType.toLowerCase}` }, path: "/koUserOperation/userGroupAdd" }
    const pageData = this.props.pageData;
    const scrollHeight = this.state.maxHeight - 200;
    // console.log(99, document.body.clientHeight, scrollHeight)
    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <Spin spinning={this.props.isLoading}>
          <div className={`${styles.aiDetail} aiDetail2`} style={{ minHeight: `${scrollHeight}px` }}>
            <div className={styles.baseInfo}>
              <div className={styles.headBar}>基本信息</div>
              <div style={{ maxHeight: `${scrollHeight}px`, overflowY: "auto", marginBottom: '-25px' }}>
                <Detail pageData={pageData} type={type} id={id}></Detail>
              </div>
            </div>
            <div className={styles.dataClassfy}>
              <div className={styles.headBar}>数据分类</div>
              <DataClassfy type={type} id={id} params={JSON.parse(this.props.location.query.params).type} idList={this.props.idList} submitParam={this.state.submitParam}></DataClassfy>
            </div>
          </div>
        </Spin>
      </div >
    );
  }
}

export default AiDetail;

