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
  idList: workTableModel.idList,
  pageData: AiDetail.pageData,
  isLoading: loading.effects['AiDetail/edit'],
}))
class AiDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
      id: this.props.match.params.id,
      submitParam: {}
    };
  }
  componentDidMount() {
    this.getConsultTree();//获取咨询分类树形结构
    this.getResonTree();//获取原因分类树形结构
    this.getPageData(); //获取页面数据
  }
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
        console.log(71, submitParam)
        this.setState({
          submitParam: submitParam
        })
      }
    })
  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id != nextProps.match.params.id) {
      this.setState({
        id: nextProps.match.params.id
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
    const pageData = this.props.pageData
    console.log(104, this.state.submitParam)
    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <Spin spinning={this.props.isLoading}>
          <div className={styles.aiDetail}>
            <div className={styles.baseInfo}>
              <div className={styles.headBar}>基本信息</div>
              <Detail pageData={pageData} type={type} id={id}></Detail>
            </div>
            <div className={styles.dataClassfy}>
              <div className={styles.headBar}>数据分类</div>
              <DataClassfy type={type} id={id} submitParam={this.state.submitParam}></DataClassfy>
            </div>
          </div>
        </Spin>
      </div >
    );
  }
}

export default AiDetail;

