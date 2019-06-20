import React from 'react';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';
import DetailIm from './components/im';
import DetailBbs from './components/bbs';
import DetailNps from './components/nps';
import DataClassfy from './components/dataClassfy.js';
import PageHead from '@/components/PageHead/pageHead';
import styles from './style.less';

@connect(({ AiDetail, workTableModel }) => ({
  AiDetail,
  idList: workTableModel.idList
}))
class AiDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.location.query.type,
      id: this.props.location.query.id
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
    this.props.dispatch({
      type: 'AiDetail/edit',
      payload: { params: params }
    });
  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
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
    const routerData = { name: `${tabType}会话`, bread: { name: "AI工作台", path: "/koUserOperation/userOperation" }, path: "/koUserOperation/userGroupAdd" }
    console.log(70, this.props)
    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <div className={styles.aiDetail}>
          <div className={styles.baseInfo}>
            <div className={styles.headBar}>基本信息</div>
            {type == 1 ? <DetailIm type={type} id={id}></DetailIm> : null}
            {type == 2 ? <DetailBbs type={type} id={id}></DetailBbs> : null}
            {type == 3 ? <DetailNps type={type} id={id}></DetailNps> : null}
          </div>
          <div className={styles.dataClassfy}>
            <div className={styles.headBar}>数据分类</div>
            <DataClassfy type={type} id={id}></DataClassfy>
            {/* {type == 'im' ? <DataClassfy type={type} id={id}></DataClassfy> : null}
            {type == 'bbs' ? <DataClassfyBbs type={type} id={id}></DataClassfyBbs> : null}
            {type == 'nps' ? <DataClassfyNps type={type} id={id}></DataClassfyNps> : null} */}
          </div>
        </div>
      </div>
    );
  }
}

export default AiDetail;

