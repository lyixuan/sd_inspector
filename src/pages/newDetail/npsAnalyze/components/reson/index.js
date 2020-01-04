import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import BITabs from './Tab';

const TabPane = BITabs.TabPane;

// @connect(({ resubmitModal }) => ({
//   resubmitModal,
//   paramsQuery: resubmitModal.paramsQuery || {},
//   getCycleListData: resubmitModal.getCycleListData,
// }))
class Reson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '1',
    };
  }
  onTabChange = tab => {
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          原因分类
        </p>
        <div className={styles.resonWrap}>
          <BITabs onChange={this.onTabChange} activeKey={'1'}>
            <TabPane tab={tab} key={1}>
              <div keye={1}>{1111}</div>
            </TabPane>
            <TabPane tab={tab} key={2}>
              <div keye={1}>{22222222}</div>
            </TabPane>
          </BITabs>
        </div>
      </div>
    );
  }
}

export default Reson;
