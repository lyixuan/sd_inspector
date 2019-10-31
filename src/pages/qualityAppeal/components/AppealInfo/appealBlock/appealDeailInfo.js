import React from 'react';
import styles from './appealDetailInfo.less';
import Appeal from './appeal';
class Index extends React.Component {
  render() {
    const { dataList, setStateData } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <div className={styles.title}>
          申诉信息(审核)
          <span className={styles.iconCls} onClick={() => this.handleAppeal()}></span>
        </div>
        <div>
          <Appeal {...this.props} dataList={dataList} />
        </div>
      </div>
    );
  }
}

export default Index;
