import React from 'react';
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
@connect(({ AiDetail, loading }) => ({
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
    this.pageResize();
    window.addEventListener('resize', this.pageResize);
  }
  pageResize = () => {
    const maxHeight = document.body.clientHeight < 600 ? 600 : document.body.clientHeight;
    this.setState({
      scrollHeight: maxHeight - 190
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
  computedId = (fn, action) => { // action 1-上一条  2-下一条 3-跳过
    let idList = this.props.idList;
    let id = this.state.id;
    const currentId = idList.indexOf(Number(id));
    if (idList) {
      this.setState({
        id: action === 1 ? idList[currentId - 1] : idList[currentId + 1]
      }, () => fn(action))
    }
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
    const { type, id, scrollHeight } = this.state
    const routerData = { name: `${tabType}会话`, bread: { name: "质检标注", path: `/qualityMarking/${tabType.toLowerCase}` }, path: "/koUserOperation/userGroupAdd" }
    const pageData = this.props.pageData;

    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <Spin spinning={false}>
          <div className={`${styles.aiDetail} aiDetail2`} style={{ minHeight: `${scrollHeight}px` }}>
            <div className={styles.baseInfo}>
              <div className={styles.headBar}>基本信息</div>
              <div style={{ maxHeight: `${scrollHeight}px`, overflowY: "auto", marginBottom: '-25px' }}>
                <Detail pageData={pageData} type={type} id={id}></Detail>
              </div>
            </div>
            <div className={styles.dataClassfy}>
              <div className={styles.headBar}>数据分类</div>
              <DataClassfy type={type} computedIdNew={this.computedId} id={this.state.id} params={JSON.parse(this.props.location.query.params).type} idList={this.props.idList} submitParam={this.state.submitParam}></DataClassfy>
            </div>
          </div>
        </Spin>
      </div >
    );
  }
}

export default AiDetail;

