import React from 'react';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';
import DetailIm from './components/im';
import DetailBbs from './components/bbs';
import DetailNps from './components/nps';
import DataClassfy from './components/im/dataClassfy.js';
import DataClassfyBbs from './components/bbs/dataClassfy.js';
import DataClassfyNps from './components/nps/dataClassfy.js';
import PageHead from '@/components/PageHead/pageHead';
import styles from './style.less';

@connect(({ AiDetail }) => ({
  AiDetail
}))
class AiDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "im",
      id: 10
    };
  }
  componentDidMount() {
    this.getPageData(); //获取页面数据
  }
  getPageData = () => {
    let type = 1
    if (this.state.type == 'im') {
      type = 1;
    } else if (this.state.type == 'bbs') {
      type = 2;
    } else {
      type = 3;
    }
    let params = {
      id: this.state.id,
      type: type
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
    const type = this.state.type
    const routerData = { name: `${type}会话`, bread: { name: "AI工作台", path: "/koUserOperation/userOperation" }, path: "/koUserOperation/userGroupAdd" }

    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <div className={styles.aiDetail}>
          <div className={styles.baseInfo}>
            <div className={styles.headBar}>基本信息</div>
            {type == 'im' ? <DetailIm></DetailIm> : null}
            {type == 'bbs' ? <DetailBbs></DetailBbs> : null}
            {type == 'nps' ? <DetailNps></DetailNps> : null}
          </div>
          <div className={styles.dataClassfy}>
            <div className={styles.headBar}>数据分类</div>
            {type == 'im' ? <DataClassfy></DataClassfy> : null}
            {type == 'bbs' ? <DataClassfyBbs></DataClassfyBbs> : null}
            {type == 'nps' ? <DataClassfyNps></DataClassfyNps> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AiDetail;

