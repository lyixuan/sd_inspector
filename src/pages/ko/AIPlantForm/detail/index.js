import React from 'react';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';
import DetailIm from './components/im';
import DataClassfy from './components/im/dataClassfy.js';
import PageHead from '@/components/PageHead/pageHead';
import styles from './style.less';


class AiDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {

  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
  }

  render() {
    const routerData = { name: "IM会话", bread: { name: "AI工作台", path: "/koUserOperation/userOperation" }, path: "/koUserOperation/userGroupAdd" }
    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <div className={styles.aiDetail}>
          <div className={styles.baseInfo}>
            <div className={styles.headBar}>基本信息</div>
            <DetailIm></DetailIm>
          </div>
          <div className={styles.dataClassfy}>
            <div className={styles.headBar}>数据分类</div>
            <DataClassfy></DataClassfy>
          </div>
        </div>
      </div>
    );
  }
}

export default AiDetail;

